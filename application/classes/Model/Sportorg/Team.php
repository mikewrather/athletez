<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:49 PM
 */

class Model_Sportorg_Team extends ORM
{

	protected $_table_name = 'teams';
	//protected $_table_columns = array('id','org_sport_link_id', 'complevels_id','seasons_id','year','mascot','unique_ident','orgs_id','sports_id');
	public $error_message_path = 'models/sportorg/seasons';

	protected $_belongs_to = array(
		'org_sport_link' => array(
			'model' => 'Sportorg_Orgsportlink',
			'foreign_key' => 'org_sport_link_id'
		),
		'complevel' => array(
			'model' => 'Sportorg_Complevel_Base',
			'foreign_key' => 'complevels_id'
		),
		'season' => array(
			'model' => 'Sportorg_Seasons_Base',
			'foreign_key' => 'seasons_id'
		)
	);

	protected $_has_many = array(
		// To get the games without any of the data in the linking table use this
		'games' => array(
			'model' => 'Sportorg_Games_Base',
			'through' => 'games_teams_link',
			'foreign_key' => 'teams_id',
			'far_key' => 'games_id'
		),
		// This is the link object where the score is kept
		'teamgames' => array(
			'model' => 'Sportorg_Games_Teamslink',
			'foreign_key' => 'teams_id',
		),
		'athletes' => array(
			'model' => 'User_Base',
			'foreign_key' => 'teams_id',
			'far_key' => 'users_id',
			'through' => 'users_teams_link'
		),
		
		// StatVals
		'statvals' => array(
			'model' => 'Stats_Vals',
			'foreign_key' => 'teams_id',
		),
	);

	public function rules()
	{
		return array(
			'seasons_id' => array(
				array('seasons_id_exist')
			),
			'complevels_id' => array(
				array('complevels_id_exist')
			),
			'year' => array(
				array('not_empty'),
				array('digit'),
				array('exact_length', array(':value', 4)),
			),
			'mascot' => array(
			//	array('alpha')
			),
			'unique_ident' => array(
				array('alpha')
			),
		);
	}

	public function getOrg()
	{		
		return $this->org_sport_link->org;
	}
	
	public function getSeason()
	{
		return $this->season;
	}

	public function getSport()
	{

		return ($this->org_sport_link->sport);

	}

	public function addTeam($post_values = array()){
		extract($post_values);
		if (isset($org_sport_link_id))
			$this->org_sport_link_id = $org_sport_link_id;

		if (isset($complevels_id))
			$this->complevels_id = $complevels_id;

		if (isset($seasons_id))
			$this->seasons_id = $seasons_id;

		if (isset($year))
			$this->year = $year;

		if (isset($mascot))
			$this->mascot = $mascot;

		if (isset($unique_ident))
			$this->unique_ident = $unique_ident;

		if (!isset($orgs_id))
			$post_values['orgs_id'] = 0;

		if (!isset($sports_id))
			$post_values['sports_id'] = 0;
		try {
			if ($org_sport_link_id == ""){
				$external_validate = Validation::factory($post_values)
					->rule('orgs_id', 'orgs_id_exist')
					->rule('sports_id', 'sports_id_exist');
				//if check pass,add org_id,sports_id to db,generate org_sport_id for use
				if ($external_validate->check()){
					//check org_sport in db.
					$org_sport_link_model = ORM::factory("Sportorg_Orgsportlink");
					$result = $org_sport_link_model->getOrgSportId($orgs_id, $sports_id);
					if(!$result->loaded())
					{
						unset($org_sport_link_model);
						$org_sport_link_model = ORM::factory("Sportorg_Orgsportlink");
						//Insert new row to org_sport_link
						$org_sport_link_model->orgs_id = $orgs_id;//already extracted
						$org_sport_link_model->sports_id = $sports_id;//already extracted
						$org_sport_link_model->save();
						$org_sport_pk = $org_sport_link_model->pk();
						$this->org_sport_link_id = $org_sport_pk;
					}else{
						$this->org_sport_link_id = $result->id;
					}
				}
			}else{
				$external_validate = Validation::factory($this->as_array())
					->rule('org_sport_link_id', 'check_org_sport_id_exist');
			}

			$this->save($external_validate);
			return $this;
		} catch(ORM_Validation_Exception $e){
				return $e;
		}
	}

	public function addOpponent($args){
		extract($args);

		if(!$this->loaded()) return false;
		$org = $this->getOrg();
		//
		//find matching org by name
		$orgs = ORM::factory('Sportorg_Org')
			->where('name','=',$name)
			->find_all();

		$num_results = $orgs->count();

		//if there are multiple matches return the matches to choose from
		if($num_results > 1){
			return $orgs;
		}

		//extract team information to an array
		$team_array = $this->as_array();

		//set sports ID from org sport link before that gets unset
		$team_array['sports_id'] = $team_array['org_sport_link']['sports_id'];

		//strip all information that won't transfer to new team
		unset($team_array['unique_ident']);
		unset($team_array['mascot']);
		unset($team_array['id']);
		unset($team_array['org_sport_link']);
		unset($team_array['org_sport_link_id']);

		//if there are no matches create a new one
		if($num_results == 0){
			$newOrg = $org->addOpponentOrg($name);
			$team_array['orgs_id'] = $newOrg->id;
			$new_team = ORM::factory('Sportorg_Team');
			$new_team = $new_team->addTeam($team_array);
		}
		//if there is one match add the team to that org
		else if($num_results == 1){
			$newOrg = $orgs[0];
			$team_array['orgs_id'] = $newOrg->id;
			$new_team = ORM::factory('Sportorg_Team');
			$new_team = $new_team->addTeam($team_array);
		}

		if($new_team) return $new_team;
	}

	public function getSubject(){ return $this; }

	public function addGame($args = array()){
		extract($args);

	//	print_r($args);

		if (isset($game_datetime)){
			if ($game_datetime == ""){
			}else{
				$arr = explode(" " ,$game_datetime);
				$gameDay = $arr[0];
				$gameTime = $arr[1];
			}
		}
		$games_teams_link = ORM::factory("Sportorg_Games_Teamslink");
		try {
			if ((int)$games_id == 0){

				$games_model = ORM::factory("Sportorg_Games_Base");
				$games_model->gameDay = $gameDay;
				$games_model->gameTime = $gameTime;
				$games_model->locations_id = $locations_id;
				$games_model->save();
				$games_model->setIsWinner();

				$new_games_id = $games_model->pk();
					$games_teams_link->teams_id = $teams_id;
					$games_teams_link->games_id = $new_games_id;
					$games_teams_link->is_home_team = $is_home_team;
					$games_teams_link->points_scored = $points_scored;
					$games_teams_link->save();

					Model_Site_Feed::addToFeed($games_teams_link,"newgame");

			}
			else
			{
				$games_model = ORM::factory("Sportorg_Games_Base",$games_id);
				$games_model->setIsWinner();
				$games_teams_link->teams_id = $this->id;
				$games_teams_link->games_id = $games_id;
				$games_teams_link->points_scored = $points_scored;
				$games_teams_link->save();

				Model_Site_Feed::addToFeed($games_teams_link,"newgame");

/*
				$external_validate = Validation::factory($args);
				$external_validate->rule('teams_id', 'gamesteams_combine_primary_key_exist', array($teams_id, $games_id));

				unset($games_teams_link);
				$games_teams_link = ORM::factory("Sportorg_Games_Teamslink");
				$games_teams_link->teams_id = $teams_id;
				$games_teams_link->games_id = $games_id;
				$games_teams_link->is_home_team = $is_home_team;
				$games_teams_link->points_scored = $points_scored;

				if ($games_teams_link->check($external_validate)){
					$games_teams_link->save();
				}
*/
			}
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public $get_basics_class_standards = array(
		'alternate_fk_names' => array(
//			'city' => 'cities_id',
//			'user_picture' => 'images_id'
		),
		'column_name_changes' => array(
			//'name' => 'team_name',
			'id' => 'team_id',
			'id' => 'id'
			//'location' => 'team_location'
		),
		'added_function_calls' => array(
			'team_name' => 'name',
			'org_name' => 'get_org_name',
			"team_location" => 'getTeamLocation',
			"picture" => 'getImage',
			'picture_obj' => 'getImageObj',
			"num_votes" => 'get_num_votes',
			"num_followers" => 'get_num_followers',
			"season_label" => "get_season_label",
			'schedule' => 'get_schedule'
		),
		'exclude_columns' => array(
			//'username','email','password','dob'
		),
	);

	public function get_schedule()
	{
		$sch = $this->getSchedule();
		$retArr = array();
		if(is_array($sch)){
			foreach($sch as $game)
			{
				$retArr[] = $game->getBasics();
			}
		}
		return $retArr;
	}


	public function get_season_label()
	{
		return $this->season->name." ".str_replace('20',"'",$this->year);
	}

	public function get_num_votes()
	{
		return Model_Site_Vote::getNumVotes($this);
	}

	public function get_num_followers()
	{
		return Model_User_Followers::num_followers($this);
	}

	public function get_org_name()
	{
		$org = $this->getOrg();
		return $org->name;
	}

	public function getBasics($settings = array())
	{
//		$athletesArray = array();
//		foreach($this->athletes->find_all() as $athlete) { $athletesArray[] = $athlete->getBasics(); }
//		$num_followers = Model_User_Followers::num_followers($this);
//		$num_votes = Model_Site_Vote::getNumVotes($this);
//
//		return array(
//
//			"team_id" => $this->id,
//			"team_name" => $this->name(),
//			"org_sport_link" => $this->org_sport_link->getBasics(),
//			"org_sport_link_id" => $this->org_sport_link_id,
//			"complevel" => $this->complevel->getBasics(),
//			"complevels_id" => $this->complevels_id,
//			"season" => $this->season->getBasics(),
//			"seasons_id" => $this->seasons_id,
//			"year" => $this->year,
//			"mascot" => $this->mascot,
//			"athletes" => $athletesArray,
//			"team_location" => $this->getTeamLocation(),
//			/* TODO, Add by Jeffrey, In order to match Ma's test data ,below data is required from him */
//
//			"id" => $this->id,
//			"name" => $this->name(),
//			"location" => $this->getTeamLocation(),
//			"picture" => $this->getImage(),
//			"num_votes" => $num_votes,
//			"num_followers" => $num_followers
//		);
		return parent::getBasics($settings);
	}

	public function name()
	{
		$title = "";
		$title .= ucwords(strtolower($this->getOrg()->name));
		$title .= " ".$this->complevel->name;
		$title .= " ".$this->getSport()->name;
		$title .= " ".$this->season->name;
		$title .= " ".$this->year;
		$title .= $this->unique_ident=='' ? '' : ' '.$this->unique_ident;
		return $title;
	}

	public function getLocation()
	{
		$org = $this->getOrg();
		return $org->location;
	}
	
	/**
	 * @param array $args is an array of parameters to filter the games we are selecting
	 * @return $games DB::select object
	 */
	public function getGames($args = array())
	{
		extract($args);
		$games = $this->games;
		// CHECK FOR PARAMETERS:
		// games_before
		// Filter games associated with a given city to only show those before a given date

		if(isset($games_before))
		{
			// Format as date
			$gameDay = date("Y-m-d",strtotime($games_before));
			$gameTime = date("H:i:s",strtotime($games_before));

			$games
				->and_where_open()
				->where('gameDay','<',$gameDay)
			//	->and_where('gameTime','<',$gameTime)
				->and_where_close();
		}
		
		
		// games_after
		// Filter games associated with a given city to only show those before a given date
		if(isset($games_after))
		{
			// Format as date
			$gameDay = date("Y-m-d",strtotime($games_after));
			$gameTime = date("H:i:s",strtotime($games_after));

			$games
				->and_where_open()
				->where('gameDay','>',$gameDay)
			//	->and_where('gameTime','>',$gameTime)
				->and_where_close();
		}
		
		// isWinner
		if(isset($isWinner))
		{
			$games->where('games_teams_link.isWinner', '=', $isWinner);
		}
		$classes_arr = array(
			'Sportorg_Games_Base' => 'sportorg_games_base',
			'Sportorg_Games_Teamslink' => 'games_teams_link'
		);

		$games->order_by('gameDay','ASC');

		$games = ORM::_sql_exclude_deleted($classes_arr, $games);
		return $games;
	}

	public function getSearch($args = array()){
		extract($args);

		//$this->join('users_teams_link')->on('users_teams_link.users_id', '=', 'users.id');
		//$this->join('teams')->on('users_teams_link.teams_id', '=', 'teams.id');
		$team = ORM::factory('Sportorg_Team');
		$team->join('org_sport_link')->on('org_sport_link.id', '=', 'sportorg_team.org_sport_link_id');
		$team->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');
	//	$this->join('locations')->on('locations.id', '=', 'orgs.locations_id');

		$enttype_id = Model_Site_Enttype::getMyEntTypeID($this);
		$team_votes = DB::select(array(DB::expr('COUNT(id)'),'num_votes'))
			->from('votes')
			->where('subject_enttypes_id','=',$enttype_id)
			->where('subject_id','=',DB::expr('`sportorg_team`.`id`'));

		$followers = DB::select(array(DB::expr('COUNT(id)'),'num_followers'))
			->from('followers')
			->where('subject_enttypes_id','=',$enttype_id)
			->where('subject_id','=',DB::expr('`sportorg_team`.`id`'));
		$team->select(array($team_votes,'num_votes'),array($followers,'num_followers'));

		$classes_arr = array(
			'Sportorg_Team' => 'sportorg_team',
			'Sportorg_Orgsportlink' => 'org_sport_link',
			'Sportorg_Org' => 'orgs',
		);

		if (isset($searchtext))
		{
			$team->join('complevels')->on('complevels.id', '=', 'sportorg_team.complevels_id');
			$team->join('sports')->on('sports.id', '=', 'org_sport_link.sports_id');
			$team->join('seasons')->on('seasons.id', '=', 'sportorg_team.seasons_id');

			$words = explode(' ',$searchtext);
			$team->or_where_open();
			$team->and_where_open();
			foreach($words as $word)
			{
			//	echo $word;
				$team->and_where_open();
				$team->where('orgs.name', 'like', "%".$word."%");
				$team->or_where('complevels.name', '=', $word);
				$team->or_where('sportorg_team.year', 'like', $word.'%');
				$team->or_where('sportorg_team.unique_ident', 'like',$word."%");
				$team->or_where('sports.name', 'like', $word.'%');
				$team->or_where('seasons.name', 'like', $word.'%');
	//
				$team->and_where_close();
			}
			$team->and_where_close();
			$team->or_where(
				DB::expr("CONCAT(`orgs`.`name`,' ',`complevels`.`name`,' ',`sports`.`name`,' ',`seasons`.`name`,' ',`sportorg_team`.`year`)"),
			'like',$searchtext.'%');
			$team->or_where_close();
		}

		if($cast_wide_net) {
			$wide_net = clone $team;
		//	print_r($wide_net->find_all());
		}

		if (isset($sports_id)){
			$team->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if (isset($orgs_id)){
			$team->where('org_sport_link.orgs_id', '=', $orgs_id);
		}

		if (isset($complevels_id)){
			$team->where('sportorg_team.complevels_id', '=', $complevels_id);
		}

		if (isset($year)){
			$team->where('sportorg_team.year', '=', $year);
		}

		if (!isset($orderby)){
			$team->order_by('orgs.name','ASC');
		}else{
			if (!isset($orderby) || $orderby == 'postTime')
			{
				$team->order_by('id', 'desc');
			}
			else if ($orderby == 'votes')
			{
				$team->order_by('num_votes', 'desc');
			}
			else if ($orderby == 'followers')
			{
				$team->order_by('num_followers', 'desc');
			}
			elseif($orderby=='random')
			{
				$team->order_by(DB::expr('RAND()'));
			}
		}



		if (isset($cities_id) && $cities_id > 0){
			$team->where('orgs.cities_id', '=', $cities_id);
		}
		if (isset($states_id) && $states_id > 0){
			$team->where('orgs.states_id', '=', $states_id);
		}

		if (isset($limit))
		{
			$team->limit($limit);
		}
		else $team->limit(5);

		if(isset($offset))
		{
			$team->offset($offset);
		}

		$search = ORM::_sql_exclude_deleted($classes_arr, $team);

		$result = $search->find_all();

		if($cast_wide_net && $result->count() == 0)
		{
			$result = $wide_net
				->limit(5)
				->find_all();

	//
		}
	//	print_r($result);
	//	print_r($search->find_all());
	//	die;

	//	return false;
		return $result;
	}
	
	public function getRoster($args = array())
	{
		extract($args);		
		// positions_id
		// Filter the roster of a given team to only show those players for a certain position
		if ( isset($positions_id) )
		{
			// get user_teams_link
			$user_teams_link_obj = ORM::factory('User_Teamslink')
				->join('teams')->on('teams.id', '=', 'user_teamslink.teams_id' )
				->join('utl_position_link')->on('utl_position_link.users_teams_link_id','=', 'user_teamslink.id')
					->where('teams.id', '=', $this->id )
					->and_where('utl_position_link.positions_id','=', $positions_id );
			$classes_arr = array(
				'User_Teamslink' => 'user_teamslink',
				'Sportorg_Team' => 'teams',
				'User_Teamslink_Positionlink' => 'utl_position_link'
			);
		} else {
			$user_teams_link_obj = ORM::factory('User_Teamslink')
				->join('teams')->on('teams.id', '=', 'user_teamslink.teams_id' )				
					->where('teams.id', '=', $this->id );
			$classes_arr = array(
				'User_Teamslink' => 'user_teamslink',
				'Sportorg_Team' => 'teams'
			);
		}

		$user_teams_link_obj = ORM::_sql_exclude_deleted($classes_arr, $user_teams_link_obj);
		return $user_teams_link_obj;
	}
	
	public function getSchedule($count = NULL, $past_games = true )
	{
//		print_r($this);

		 if(!$this->loaded()) return false;
		 
		 // get game list		 
	 	 $game_list_obj = ORM::factory('Sportorg_Games_Base')
		 	->select('*', 'games_teams_link.*')				
			->join('games_teams_link')
				->on('games_teams_link.games_id','=','sportorg_games_base.id')		
			->where('games_teams_link.teams_id', '=', $this->id );
		
		$game_list_obj->where_open();
		$game_list_obj->where('sportorg_games_base.id','>','0'); //This is added to solve an error of AND () if no params are provided
		// if the user setted the number of games to return,
		if( isset($count))
		{
			$game_list_obj->limit($count);
		}
		// Format as date
		$gameDay = date("Y-m-d");

		// if the user wanted to get the past games,
		if( $past_games )
		{
		//	$game_list_obj
		//		->and_where_open()
		//		->where('gameDay','<',$gameDay)
		//		->and_where_close();
		}else{
			$game_list_obj
				->and_where_open()
				->where('gameDay','>',$gameDay)
				->and_where_close();
		}
		$game_list_obj->where_close();

		$classes_arr = array(
			'Sportorg_Games_Teamslink' => 'games_teams_link',
			'Sportorg_Games_Base' => 'sportorg_games_base'
		);
		$game_list_obj = ORM::_sql_exclude_deleted($classes_arr, $game_list_obj);
		$game_list_obj->order_by('gameDay','ASC');
		$games = $game_list_obj->find_all()->as_array();

		return $games;
	}

	public function deleteGamelink($games_id)
	{

		$result = ORM::factory('Sportorg_Games_Teamslink')
			->where('teams_id','=', $this->id)
			->where('games_id','=', $games_id)->find();
		if (!$result->id){
			return false;
		}else{
			$game_team_link = ORM::factory('Sportorg_Games_Teamslink', $result->id);
			$game_team_link->delete_with_deps($is_phantom_delete = false);
			return true;
		}
	}
	
	public function updateGamelink($args = array() )
	{
		extract($args);
		$new_games_teams_link = ORM::factory('Sportorg_Games_Teamslink');
		try {
		$game_link_obj = ORM::factory('Sportorg_Games_Teamslink')
			->where('teams_id','=', $teams_id)
			->where('games_id','=', $games_id)
			->find()->as_array();

		if(isset($points_scored))
		{
			$game_link_obj['points_scored'] = $points_scored;
		}

		// points_against
		// Change the number of points scored against this team / game
		if(isset($points_against))
		{
			$game_link_obj['points_against'] = $points_against;
		}

		// isWinner
		// Update whether this team won this game
		if(isset($isWinner))
		{
			$game_link_obj['isWinner'] = $isWinner;
		}

		// Update whether this is the home team for this game
		if(isset($is_home_team))
		{
			$game_link_obj['is_home_team'] = $is_home_team;
		}

		$update = DB::update("games_teams_link")
			->set($game_link_obj)
			->where('teams_id','=', $teams_id)
			->where('games_id','=', $games_id);

		$update->execute();

		$new_games_teams_link->where('games_id', '=', $games_id);
		$new_games_teams_link->and_where('teams_id', '=', $teams_id);

		return $new_games_teams_link;

		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}
	
	public function updateTeam($args = array())
	{
		extract($args);
		// complevels_id 
		// Competition Level ID
		if(isset($complevels_id) && $complevels_id == "")
		{
			$this->complevels_id = $complevels_id;
		}
		
		// seasons_id 
		// Update the Season ID
		if(isset($seasons_id) && $seasons_id == "")
		{
			$this->seasons_id = $seasons_id;
		}
			
		// year 
		// Change the year of this team
		if(isset($year)  && $year == "")
		{
			$this->year = $year;
		}
	 	 
		// mascot 
		// Change the mascot of this team
		if(isset($mascot) && $mascot == "")
		{
			$this->mascot = $mascot;
		}
		
		// unique_ident 
		// Change the Unique Identifier for this team
		if(isset($unique_ident) && $unique_ident == "")
		{
			$this->unique_ident = $unique_ident;
		}

		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
		return $this;
	}

	public function getTeamLocation(){
		$org = $this->org_sport_link->org;

		if ($org->getLocationName()){
			return $org->getLocationName();
		}else{
			return $org->getStateName();
		}
	}

	/**
	 * Team image is the max voted images
	 * @return null
	 */
	public function getImage(){
		if($primary = Model_Media_Base::find_most_voted_tag($this,'image',1))
		{
			return $primary->original_url;
		}
		return null;
	}

	/**
	 * Team image is the max voted images
	 * @return null
	 */
	public function getImageObj(){
		if($primary = Model_Media_Base::find_most_voted_tag($this,'image',1))
		{
			return $primary->getBasics();
		}
		return null;
	}

	public function getTeamPointsScore($games_id){
		$teams_id = $this->id;
		$result = $this->teamgames->where('teams_id', '=', $teams_id)
			->where('games_id', '=', $games_id)->find();

		if (!empty($result) && $result->teams_id != ""){
			return intval($result->points_scored);
		}
		return 0;
	}

	public function getComments(){
		return Model_Site_Comment::getCommentsOn($this);
	}
}