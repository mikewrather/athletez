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

	public function addGame($args = array()){
		extract($args);

		if (isset($id) && $id != ""){
			$this->id = $id;
		}

		if (isset($locations_id))
			$this->locations_id = $locations_id;

		try {
			$external_validate = Validation::factory(array('game_datetime' => $game_datetime));
			$external_validate->rule("game_datetime", 'not_empty');
			$external_validate->rule("game_datetime", 'correct_date_format');
			if ($this->check($external_validate)){
				$arr = explode(' ', $game_datetime);
				$gameDay = $arr[0];
				$gameTime = $arr[1];
				$this->gameDay = $gameDay;
				//$args['gameDay'] = $gameDay;
				$this->gameTime = $gameTime;
			}

			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getPrimaryImage()
	{
		if($primary = Model_Media_Base::find_most_voted_tag($this,'image',1))
		{
			return $primary->original_url;
		}
		return null;
	}

	public function getBasics()
	{
		return array(
			"locations_id" => $this->locations_id,
			"location" => $this->location->getBasics(),
			"gameDay" => $this->gameDay,
			"gameTime" => $this->gameTime,
			"teams" => $this->teams,

			/* Required are required from Ma's test file*/
			//TODO, add by Jeffrey, Clean up the unnecessary data.
			"id" => $this->id,
			"game_name" => $this->name(),
			"game_day" => Util::format_date($this->gameDay), //"Sept 14, 2002",
			"game_time" => Util::format_time($this->gameTime), //"09:00 AM",
			"game_picture" => $this->getPrimaryImage(),
			"teams" => $this->getTeams()->result,
			"game_location" => $this->location->address
		);
	}

	public function getTeams(){
		$teams_arr = null;
		$teams = $this->teams->find_all();
		foreach($teams as $team){
			$new_obj = new stdClass();
			$teamBasicInfo = $team->getBasics();
			$new_obj->team_name = $teamBasicInfo['team_name'];
			$new_obj->team_location = $teamBasicInfo['team_location'];
			$new_obj->points_scored = $team->getTeamPointsScore($this->id);
			$teams_arr[] = $new_obj;
		}

		$result_obj = new stdClass();
		$result_obj->result = $teams_arr;
		return $result_obj;
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

	public function getSearch($args = array()){
		extract($args);
		$this->join('games_teams_link')->on('games_teams_link.games_id', '=', 'sportorg_games_base.id');
		$this->join('teams')->on('games_teams_link.teams_id', '=', 'teams.id');


		if (isset($sports_id)){
			$this->join('org_sport_link')->on('org_sport_link.id', '=', 'teams.org_sport_link_id');
			$this->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if (isset($complevels_id)){
			$this->where('teams.complevels_id', '=', $complevels_id);
		}

		if (!isset($orderby)){
			$this->order_by('gameDay', 'asc');
		}else{
			$this->order_by($orderby, 'asc');
		}

		if (isset($searchtext)){
			$this->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');
			$this->where('orgs.name', 'like', "%".$searchtext."%");
		}

		if (isset($loc_search)){
			$this->and_where_open();
			$this->join('locations')->on('locations.id', '=', 'orgs.locations_id');
			$this->join('cities')->on('locations.cities_id', '=', 'cities.id');
			$this->or_where('cities.name', 'like', "%".$loc_search."%");
			$this->join('counties')->on('cities.county_id', '=', 'counties.id');
			$this->or_where('counties.name', 'like', "%".$loc_search."%");
			$this->join('states')->on('states.id', '=', 'counties.states_id');
			$this->or_where('states.name', 'like', "%".$loc_search."%");
			$this->and_where_close();
		}

		return $this;
	}

}