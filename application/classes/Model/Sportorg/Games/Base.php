<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:56 PM
 */

class Model_Sportorg_Games_Base extends ORM
{
	
	protected $_table_name = 'games';
	public $error_message_path = 'models/sportorg/games';
	protected $_belongs_to = array
	(
		'location' => array(
			'model' => 'Location_Base',
			'foreign_key' => 'locations_id'
		),
	);
	
	protected $_has_many = array
	(
		'matches' => array(
			'model' => 'Sportorg_Games_Match',
			'foreign_key' => 'games_id'
		),
		'teams' => array(
			'model' => 'Sportorg_Team',
			'through' => 'games_teams_link',
			'foreign_key' => 'games_id',
			'far_key' => 'teams_id'
		),
		'uslgamelink' => array(
			'model' => 'User_Sportlink_Gamelink',
			'foreign_key' => 'games_id'
		)
	);

	public function rules(){

		return array
		(

			// gameDay (date)
			'gameDay'=>array(
				//array('not_empty'),
			),

			// gameTime (time)
			'gameTime'=>array(
				//array('not_empty'),
			),

			// locations_id (int)
			'locations_id'=>array(
				array('not_empty'),
				array('locations_id_exist')
			),
		);
	}

	public function getTeamRosters(){
		$rosters = array();
		$return_obj = new stdClass();

		$results = null;
		foreach($this->teams->find_all() as $team){
			$std = new stdClass();

			$std->team_id = $team->id;
			$std->team_name = $team->name();
			foreach($team->getRoster()->find_all() as $teamuser)
			    $rosters[] = $teamuser->user->getBasics();
			$std->rosters = $rosters;
			$results[] = $std;
			unset($std);
		}

		$return_obj->result = $results;
		return $return_obj;
	}

	public function addGame($args = array()){
		extract($args);

		if (isset($id) && $id != ""){
			$this->id = $id;
			$feed_action = "update";
		}
		else
		{
			$feed_action = "add";
		}

		if (isset($locations_id))
			$this->locations_id = $locations_id;

		if(isset($game_datetime))
		{
			$external_validate = Validation::factory(array('game_datetime' => $game_datetime));
			$external_validate->rule("game_datetime", 'not_empty');
			$external_validate->rule("game_datetime", 'correct_date_format');
			try {

				if ($this->check($external_validate)){
					$game_datetime = date("Y-m-d H:i:s", strtotime($game_datetime));
					$arr = explode(' ', $game_datetime);
					$gameDay = $arr[0];
					$gameTime = $arr[1];
					$this->gameDay = $gameDay;
					//$args['gameDay'] = $gameDay;
					$this->gameTime = $gameTime;
				}
			}
			catch(ORM_Validation_Exception $e){
				return $e;
			}
		}
		elseif($this->loaded())
		{

		}

		try {
			if(isset($event_name)){
				$this->event_name = $event_name;
			}

			$this->save();

			if(isset($event_name)){
				if($sports_id){
					if(!$users_id){
						$user = Auth::instance()->get_user();
						$users_id = $user->id;
					}
					$usl = ORM::factory('User_Sportlink')->where('users_id','=',$users_id)->where('sports_id','=',$sports_id)->find();
					if($usl->loaded()){
						$gamelink = ORM::factory('User_Sportlink_Gamelink');
						$gamelink->user_sport_link_id = $usl->id;
						$gamelink->games_id = $this->id;
						$gamelink->save();
					}
				}
			}
			Model_Site_Feed::addToFeed($this,$feed_action);

			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getPrimaryImage()
	{
		if($primary = Model_Media_Base::find_most_voted_tag($this,'image',1))
		{
			return $primary->getBasics(array('user'));
		}
		return null;
	}



	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'locations_obj' => 'location'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(
			'game_name' => 'get_game_name',
			"game_day" => 'format_game_day', //"Sept 14, 2002",
			"game_time" => 'format_game_time', //"09:00 AM",
			"game_picture" => 'getPrimaryImage',
			"teams" => 'get_game_teams',
			"game_location" => 'get_game_location',
			"shared" => 'get_shared_info',
			'can_follow' => 'can_follow'
		),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function get_game_sports_id()
	{
		$teams = $this->teams->find_all();
		foreach($teams as $team)
		{
			$sport = $team->getSport();
			return $sport->id;
		}
		return 0;
	}

	public function get_shared_info()
	{
		$retArr = array();
		$teams = $this->teams->find_all();
		foreach($teams as $team)
		{
			$sport = $team->getSport();
			$retArr['sports_id'] = $sport->id;
			$retArr['sport'] = $sport->name;
			$retArr['complevel'] = $team->complevel->name;
			$season = $team->season;
			$retArr['season'] = $season->name." ".str_replace('20',"'",$team->year);
			return $retArr;
		}
		return 0;
	}


	public function get_game_teams(){
		return $this->getTeams()->result;
	}

	public function get_game_location(){
		return $this->location->address;
	}

	public function get_game_name(){
		return Util::format_time($this->gameTime);
	}

	public function format_game_day(){
		return date('n.d.y',strtotime($this->gameDay));
	}

	public function format_game_time(){
		return Util::format_time($this->gameTime);
	}

	public function getTeams(){
		$teams_arr = null;
		$team_link = DB::select('*',array('games_teams_link.id','gtl_id'))->from('games_teams_link')
			->join('teams','LEFT')->on('games_teams_link.teams_id','=','teams.id')
			->where('games_id','=',$this->id);

		//the results need to filter the results from deleted table
		$classes_arr = array(
			'Sportorg_Team' => 'teams.id',
			'Sportorg_Games_Teamslink' => 'games_teams_link.id'
		);
		$teams = ORM::_sql_exclude_deleted_abstract($classes_arr, $team_link);
		$teams = $teams->execute();
		foreach($teams as $team_link)
		{
			$team = ORM::factory('Sportorg_Team',$team_link['teams_id']);
			if($team->loaded()) $teams_arr[] = array_merge($team->getBasics(array('exclude_columns'=>array('schedule'))),array(
				'points_scored'=>$team_link['points_scored'],
				'games_teams_link_id'=>$team_link['gtl_id'],
				'isWinner' => $team_link['isWinner'] == 1 ? true : false
			));
		}
		$result_obj = new stdClass();
		$result_obj->result = $teams_arr;
		return $result_obj;
	}

	public function getComments(){
		return Model_Site_Comment::getCommentsOn($this);
	}

	public function name()
	{
		$name = "";
		$teams = $this->teams->find_all();
		foreach($teams as $team)
		{
			$name .= $team->name().", ";
		}
		return rtrim($name,', ');
	}

	public function getLocation(){
		$location = $this->location;
		return $location;
	}

	public function getMatches(){
		$matches = $this->matches;
		return $matches;
	}

	public function updateScore($args)
	{
		extract($args);

		if (isset($games_teams_link_id) && isset($score))
		{
			DB::update('games_teams_link')
				->set(array('score'=>$score,'points_scored'=>$score))
				->where('id','=',$games_teams_link_id)
				->execute();
			return array("score"=>$score);
		}
		else if (isset($teams_id) && isset($score))
		{
			DB::update('games_teams_link')
				->set(array('score'=>$score,'points_scored'=>$score))
				->where('games_id','=',$this->id)
				->and_where('teams_id','=',$teams_id)
				->execute();
			return array("score"=>$score);
		}
		else
		{
			return false;
		}

	}

	public function getSearch($args = array()){
		extract($args);
		$this->distinct(true);
		$this->join('games_teams_link', 'LEFT')->on('games_teams_link.games_id', '=', 'sportorg_games_base.id');
		$this->join('teams', 'LEFT')->on('games_teams_link.teams_id', '=', 'teams.id');

		$enttype_id = Model_Site_Enttype::getMyEntTypeID($this);
		$game_votes = DB::select(array(DB::expr('COUNT(id)'),'num_votes'))
			->from('votes')
			->where('subject_enttypes_id','=',$enttype_id)
			->where('subject_id','=',DB::expr('`sportorg_games_base`.`id`'));

		$followers = DB::select(array(DB::expr('COUNT(id)'),'num_followers'))
			->from('followers')
			->where('subject_enttypes_id','=',$enttype_id)
			->where('subject_id','=',DB::expr('`sportorg_games_base`.`id`'));

		$this->select(array($game_votes,'num_votes'),array($followers,'num_followers'));


		if (isset($teams_id)){
			$this->where('teams.id', '=', $teams_id);
		}

		if (isset($sports_id) || isset($searchtext)){
			$this->join('org_sport_link','LEFT')->on('org_sport_link.id', '=', 'teams.org_sport_link_id');
		}

		if (isset($teams_id)){
			$this->where('teams.id', '=', $teams_id);
		}

		if (isset($sports_id)){
			$this->where('org_sport_link.sports_id', '=', $sports_id);
		}

//		if (isset($complevels_id)){
//			$this->where('teams.complevels_id', '=', $complevels_id);
//		}

		if (!isset($orderby) || $orderby == 'postTime')
		{
			$this->order_by('gameDay', 'desc');
		}
		else if ($orderby == 'votes')
		{
			$this->order_by('num_votes', 'desc');
		}
		else if ($orderby == 'followers')
		{
			$this->order_by('num_followers', 'desc');
		}
		elseif($orderby=='random')
		{
			$this->order_by(DB::expr('RAND()'));
		}

		if (isset($searchtext)){
			$this->join('orgs','LEFT')->on('orgs.id', '=', 'org_sport_link.orgs_id');
			$this->and_where_open();
			$this->where('orgs.name', 'like', $searchtext."%");
			$this->or_where('event_name', 'like', $searchtext."%");
			$this->and_where_close();
		}

//		print_r($this->find_all());

		if (isset($cities_id) || isset($states_id)){
			$this->join('locations')->on('locations.id', '=', 'sportorg_games_base.locations_id');
		}

		if (isset($cities_id)){
			$this->where('locations.cities_id', '=', $cities_id);
		}

		if (isset($states_id)){
			$this->join('cities')->on('locations.cities_id', '=', 'cities.id');
			$this->where('cities.states_id', '=', $states_id);
		}

		if (isset($limit))
		{
			$this->limit($limit);
		}
		else $this->limit(12);

		if(isset($offset))
		{
			$this->offset($offset);
		}

//		if (isset($loc_search)){
//			$this->and_where_open();
//			$this->join('locations')->on('locations.id', '=', 'orgs.locations_id');
//			$this->join('cities')->on('locations.cities_id', '=', 'cities.id');
//			$this->or_where('cities.name', 'like', "%".$loc_search."%");
//			$this->join('counties')->on('cities.county_id', '=', 'counties.id');
//			$this->or_where('counties.name', 'like', "%".$loc_search."%");
//			$this->join('states')->on('states.id', '=', 'counties.states_id');
//			$this->or_where('states.name', 'like', "%".$loc_search."%");
//			$this->and_where_close();
//		}


		return $this;
	}

}