<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/4/13
 * Time: 1:30 PM
 */

class Model_Sportorg_Org extends ORM
{

	protected $_table_name = "orgs";
	public $error_message_path = 'models/sportorg';

	protected $_belongs_to = array(
		"complevel_profile" => array(
			"model" => "Sportorg_Complevel_Profile",
			"foreign_key" => "complevel_profiles_id"
		),
		"season_profile" => array(
			"model" => "Sportorg_Seasons_Profile",
			"foreign_key" => "season_profiles_id"
		),
		"location" => array(
			"model" => "Location_Base",
			"foreign_key" => "locations_id"
		),
		"state" => array(
			"model" => "Location_State",
			"foreign_key" => "states_id"
		),
		'divisions' => array(
			'model' => 'Sportorg_Division',
			'foreign_key' => 'divisions_id',
		),
		'city' => array(
			'model' => 'Location_City',
			'foreign_key' => 'cities_id'
		)
	);

	protected $_has_many = array(
		'orgsports' => array(
			'model' => 'Sportorg_Orgsportlink',
			'foreign_key' => 'orgs_id'
		),
		'sports' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'orgs_id',
			'through' => 'org_sport_link',
			'far_key' => 'sports_id'
		),
		'leagues' => array(
			'model' => 'Sportorg_League',
			'foreign_key' => 'orgs_id',
			'through' => 'org_league_link',
			'far_key' => 'leagues_id'
		),

	);

	public function getLocationName(){
		return $this->location->full_address;
	}

	public function getStateName(){
		return $this->state->name;
	}

	public function getTeamsAsArray()
	{
		$sports = $this->orgsports->find_all();
		$teams = array();
		foreach($sports as $orgsport)
		{
			$ts = $orgsport->teams->find_all();
			foreach($ts as $t)
			{
				$teams[$t->id] = $t;
			}

		}
		return $teams;
	}

	public function rules(){

		return array
		(
			// name (longtext)
			'name'=>array(
				array('not_empty'),
			),

			// sports_club (smallint)
			'sports_club'=>array(
			),

			// leagues_id (int)
			'leagues_id'=>array(
				array('leagues_id_exist')
			),

			// divisions_id (int)
			'divisions_id'=>array(
				array('divisions_id_exist')
			),

			// season_profiles_id (int)
			'season_profiles_id'=>array(
				array('not_empty'),
				array('season_profiles_id_exist')
			),

			// complevel_profiles_id (int)
			'complevel_profiles_id'=>array(
				array('not_empty'),
				array('complevel_profiles_id_exist')
			),

			'locations_id'=>array(
				array('locations_id_exist')
			),

			'states_id'=>array(
				array('states_id_exist')
			),

		);
	}


	public function getTeams($args = array())
	{
		extract($args);

		$teams_model = ORM::factory("Sportorg_Team");
		$teams_model->join("org_sport_link", "RIGHT")
			->on("org_sport_link.id", '=', "sportorg_team.org_sport_link_id");
		$teams_model->join("orgs", "RIGHT")
			->on("orgs.id", '=', "org_sport_link.orgs_id");

		$teams_model->where('orgs.id', '=', $id);
		$classes_arr = array(
			'Sportorg_Orgsportlink' => 'org_sport_link',
			'Sportorg_Org' => 'orgs',
			'Sportorg_Team' => 'sportorg_team'
		);
		if ( isset($sports_id))
		{
			$teams_model->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if ( isset($complevels_id) )
		{
			$teams_model->where('sportorg_team.complevels_id', '=', $complevels_id);
		}

		$teams_model = ORM::_sql_exclude_deleted($classes_arr, $teams_model);
		return $teams_model;
	}
	
	public function getLeague()
	{
		$leagues = $this->leagues;
		$classes_arr = array(
			'Sportorg_League' =>  'sportorg_league'
		);
		$leagues = ORM::_sql_exclude_deleted($classes_arr, $leagues);
		return $leagues;
	}
	
	public function getDivision($id)
	{
		$division = ORM::factory('Sportorg_Division');

		$division->join('orgs', 'left')->on('orgs.divisions_id', '=', 'sportorg_division.id' );
		$division->where('orgs.id', '=', $id);

		//exclude itself
		$classes_arr = array(
			'Sportorg_Division' => 'sportorg_division'
		);
		$division = ORM::_sql_exclude_deleted($classes_arr, $division);
		return $division;
	} 
	
	public function getSports()
	{
		$sports = $this->sports->distinct(true);
		$classes_arr = array(
			'Sportorg_Sport' => 'sportorg_sport'
		);

		$sports = ORM::_sql_exclude_deleted($classes_arr, $sports);
		return $sports;
	}
	
	public function getComplevels($args = array())
	{
		extract($args);

		$complevels_model = ORM::factory("Sportorg_Complevel_Base");
		$complevels_model->join('teams')->on('teams.complevels_id', '=', 'sportorg_complevel_base.id');
		$complevels_model->join('org_sport_link')->on('org_sport_link.id', '=', 'teams.org_sport_link_id');
		$complevels_model->join('orgs')->on('orgs.complevel_profiles_id', '=', 'sportorg_complevel_base.complevel_profiles_id');
		$complevels_model->where('orgs.id', '=', $id)
			->and_where('org_sport_link.orgs_id','=',$id);

		// This is an array of all of the classes we are checking for deleted
		// We also provide the table name that it will be referenced by
		$classes_arr = array(
			'Sportorg_Complevel_Base' => 'sportorg_complevel_base',
			'Sportorg_Org' => 'orgs',
			'Sportorg_Orgsportlink' => 'org_sport_link',
			'Sportorg_Team' => 'teams'
		);

		$complevels_model = ORM::_sql_exclude_deleted($classes_arr,$complevels_model);

		if (isset($sports_id))
		{
			$complevels_model->where('org_sport_link.sports_id', '=', $sports_id);
		}

		$complevels_model->group_by('sportorg_complevel_base.id');
		return $complevels_model;
	}
	
	public function getSection($args = array())
	{
		extract($args);
		$sections = $this->sports->sections;
		$sections_model = ORM::factory("Sportorg_Section");
		$sections_model->join('leagues')
			->on('leagues.sections_id', '=', 'sportorg_section.id');

		$sections_model->join('orgs')
			->on('orgs.leagues_id', '=', 'leagues.id');
		$sections_model->where('orgs.id', '=', $id);
		$classes_arr = array(
			'Sportorg_League' => 'leagues',
			'Sportorg_Org' => 'orgs',
			'Sportorg_Section' => 'sportorg_section'
		);
		$sections_model = ORM::_sql_exclude_deleted($classes_arr, $sections_model);

		return $sections_model;
	}
	
	public function getSeasons($args)
	{
		extract($args);
		$seasons_model = DB::select(array('seasons.id','season_id'),array('teams.id','team_id'))->from('seasons');
		$seasons_model->join('orgs')->on('orgs.season_profiles_id', '=', 'seasons.season_profiles_id');
		$seasons_model->join('teams')->on('teams.seasons_id', '=', 'seasons.id');
		$seasons_model->where('orgs.id', '=', $id);
		$seasons_model->join('org_sport_link')->on('org_sport_link.id', '=', 'teams.org_sport_link_id');
		$seasons_model->where('org_sport_link.orgs_id', '=', $id);

		$classes_arr = array(
			'Sportorg_Org' => 'orgs',
			'Sportorg_Team' => 'teams',
			'Sportorg_Seasons_Base' => 'seasons'
		);
		if (isset($sports_id))
		{
			$seasons_model->where('org_sport_link.sports_id', '=', $sports_id);
			$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';
		}
		if (isset($complevels_id))
			$seasons_model->where('teams.complevels_id', '=', $complevels_id);
		$seasons_model = ORM::_sql_exclude_deleted($classes_arr, $seasons_model);

		return $seasons_model;
	}

	public function getSeasonTeams($args)
	{
		$seasons_model = $this->getSeasons($args);
	//	$seasons_model->group_by('sportorg_seasons_base.id','teams.unique_ident');
		return $seasons_model;
	}

	public function get_search($args = array()){
		extract($args);

		$org_qry = ORM::factory('Sportorg_Org');

		$classes_arr['Sportorg_Org'] = 'sportorg_org';

		if (isset($sports_id))
		{
			$org_qry->join('org_sport_link','LEFT')
				->on('org_sport_link.orgs_id', '=', 'sportorg_org.id')
				->where('org_sport_link.sports_id','=',$sports_id);

			$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';

		}

		if (isset($cities_id)){
			$org_qry->join('locations')
				->on('locations.id', '=', 'sportorg_org.locations_id')
				->where('locations.cities_id', '=', $cities_id);
		}

		if (isset($sports_club))
		{
			$org_qry->where('sportorg_org.sports_club', '=', $sports_club);
		}

		if (isset($name))
		{
			$org_qry->where('sportorg_org.name', 'LIKE',$name."%");
		}

		if(isset($states_id)){
			$org_qry->where('sportorg_org.states_id', '=', $states_id);
		}

		$enttype_id = Ent::getMyEntTypeID($this);
		if (!isset($orderby) || $orderby == 'votes')
		{

			$num_votes = DB::select(array(DB::expr('COUNT(*)'),'num_votes'))
				->from('votes')
				//	->join('users','LEFT')->on('users.id','=','votes.subject_id')
				->where('subject_enttypes_id','=',$enttype_id)
				->where('votes.subject_id','=',DB::expr('`sportorg_org`.`id`'));

			$vote_class['Site_Vote'] = '`votes`.`id`';
			$num_votes = ORM::_sql_exclude_deleted_abstract($vote_class, $num_votes);

			$org_qry->select(array($num_votes,'num_votes'));
			$org_qry->order_by('num_votes', 'desc');

		}
		// NUM FOLLOWERS
		else if ($orderby == 'followers')
		{
			$followers = DB::select(array(DB::expr('COUNT(*)'),'num_followers'))
				->from('followers')
				->where('subject_enttypes_id','=',$enttype_id)
				->where('subject_id','=',DB::expr('`orgs`.`id`'));

			$follower_class_arr['User_Follower'] = '`followers`.`id`';
			$followers = ORM::_sql_exclude_deleted_abstract($follower_class_arr, $followers);

			$org_qry->select(array($followers,'num_followers'));
			$org_qry->order_by('num_followers', 'desc');
		}
		else if ($orderby == 'newest')
		{
			$org_qry->order_by('sportorg_org.id', 'desc');
		}
		elseif($orderby=='random')
		{
			$org_qry->order_by(DB::expr('RAND()'));
		}

		$org_qry->distinct(TRUE);

		if (isset($limit))
		{
			$org_qry->limit($limit);
		}
		else $org_qry->limit(12);

		if(isset($offset))
		{
			$org_qry->offset($offset);
		}

		$qry = ORM::_sql_exclude_deleted($classes_arr,$org_qry);
	//	print_r($qry->execute());

		return $qry;
	}

	public function getGames()
	{
		if(!$this->id) return false; // return false if this object doesn't have an id
		$games = ORM::factory('Sportorg_Games_Base')
			->join('games_teams_link','left')
			->on('games.id','=','games_teams_link.games_id')

			->join('teams','left')
			->on('teams.id','=','games_teams_link.teams_id')

			->join('org_sport_link')
			->on('org_sport_link.id','=','team.org_sport_link_id')

			->where('org_sport_link.orgs_id','=',$this->id);

		// This is an array of all of the classes we are checking for deleted
		// We also provide the table name that it will be referenced by
		$classes_arr = array(
			'Sportorg_Games_Base' => 'sportorg_games_base',
			'Sportorg_Orgsportlink' => 'org_sport_link',
			'Sportorg_Team' => 'teams'
		);

		$games = ORM::_sql_exclude_deleted($classes_arr,$games);

		return $games;
	}

	public $get_basics_class_standards = array(
		/**/
		'alternate_fk_names' => array(
		),
		'added_function_calls' => array(
			'org_id' => 'org_id',
			'org_name' => 'org_name',
			'org_with_city' => 'org_with_city',
			'city' => 'org_city',
			'season_profile' =>'season_profile',
			'seasons' => 'seasons',
			'complevel_profile' => 'complevel_profile',
			'complevels' => 'complevels',
			'locations' => 'locations',
			'num_followers' => 'get_num_followers',
			'num_votes' =>'get_num_votes'
		),
		'exclude_columns' => array(
		),
	);

	public function get_num_votes()
	{
		return Model_Site_Vote::getNumVotes($this);
	}
	public function get_num_followers()
	{
		return Model_User_Followers::num_followers($this);
	}

	public function org_id(){
		return $this->id;
	}

	public function org_name(){
		return ucwords(strtolower($this->name));
	}

	public function org_with_city()
	{
		return ucwords(strtolower($this->name . " - ".$this->city->name));
	}

	public function org_city()
	{
		return ucwords($this->city->name);
	}

	public function  season_profile(){
		return $this->season_profile->getBasics();
	}

	public function seasons(){
		return $this->season_profile->getSeasons_as_array();
	}

	public function complevel_profile(){
		return $this->complevel_profile->getBasics();
	}

	public function complevels(){
		return $this->complevel_profile->getComplevels_as_array();
	}

	public function locations(){
		return $this->location->getBasics();
	}

	public function getBasics($settings = array('get_sub_objects' => false, 'single_item' => true, 'recursion_count' => 1))
	{
//		return array(
//			"org_id" => $this->id,
//			"divisions_id" => $this->divisions_id,
//			"leagues_id" => $this->leagues_id,
//			"locations_id" => $this->locations_id,
//			"complevel_profiles_id" => $this->complevel_profiles_id,
//			"org_name" => $this->name,
//			"season_profiles_id" => $this->season_profiles_id,
//			"sports_club" => $this->sports_club,
//			"season_profile" => $this->season_profile->getBasics(),
//			"seasons" => $this->season_profile->getSeasons_as_array(),
//			"complevel_profile" => $this->complevel_profile->getBasics(),
//			"complevels" => $this->complevel_profile->getComplevels_as_array(),
//			"locations" => $this->location->getBasics()
//		);
		return parent::getBasics($settings);
	}
	
	public function updateOrg($args = array())
	{
		extract($args);
		// name 
		// Update the name of the organization
		if ( isset($name) )
		{
			$this->name = $name;
		}	 

		// signle_sport 
		// Change whether this is a one-sport organization
		if ( isset($sports_club))
		{
			$this->sports_club = $sports_club;
		}

		if ( isset($single_sport_id))
		{
			$this->single_sport_id = $single_sport_id;
		}

		// leagues_id 
		// Change the league this organization belongs to
		if ( isset($leagues_id))
		{
			$this->leagues_id = $leagues_id;
		}	 

		// divisions_id 
		// Change the division this organization belong to
		if ( isset($divisions_id))
		{
			$this->divisions_id = $divisions_id;
		}	 

		// season_profiles_id 
		// Change the Season Profile this organization uses
		if ( isset($season_profiles_id))
		{
			$this->season_profiles_id = $season_profiles_id;
		}

		// complevel_profiles_id 
		// Change the Competition Level Profile
		if ( isset($complevel_profiles_id))
		{
			$this->complevel_profiles_id = $complevel_profiles_id;
		}

		if (isset($locations_id)){
			$this->locations_id = $locations_id;
		}

		if (isset($states_id)){
			$this->states_id = $states_id;
		}

		try{
			$this->update();
			return $this;
		}catch(ORM_Validation_Exception $e){
			return $e;
		}
	}
	
	public function updateDivision($divisions_id)
	{
		if (isset($divisions_id))
		{
			$this->divisions_id = $divisions_id;
		}
		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}
	
	public function updateComplevelprofile($complevel_profiles_id)
	{
		if (isset($complevel_profiles_id))
		{
			$this->complevel_profiles_id = $complevel_profiles_id;
		}

		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}
	
	public function updateSeasonProfile($season_profiles_id)
	{
		if (isset($season_profiles_id))
		{
			$this->season_profiles_id = $season_profiles_id;
		}
		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	//this method creates a clone of this org and saves it with a new name so all the values transfer over
	public function addOpponentOrg($name){

		if(!$this->loaded()) return false;

		$meAsArray = $this->as_array();
		unset($meAsArray['id']);

		$newOrg = ORM::factory('Sportorg_Org');
		$newOrg->values($meAsArray);
		$newOrg->name = $name;

		try{
			$newOrg->save();
		} catch(ORM_Validation_Exception $e){
			return $e;
		}

		return $newOrg;

	}

	public function addOrg($args = array()){
		extract($args);
		if (isset($name)){
			$this->name = $name;
		}

		if (isset($sports_club)){
			$this->sports_club = $sports_club;
		}

		if(isset($single_sport_id)){
			$this->single_sport_id = $single_sport_id;
		}

		if (isset($season_profiles_id)){
			$this->season_profiles_id = $season_profiles_id;
		}

		if (isset($complevel_profiles_id)){
			$this->complevel_profiles_id = $complevel_profiles_id;
		}

		if (isset($leagues_id)){
			$this->leagues_id = $leagues_id;
		}

		if (isset($divisions_id)){
			$this->divisions_id = $divisions_id;
		}

		if (isset($locations_id)){
			$location = ORM::factory('Location_Base',$locations_id);
			$this->locations_id = $locations_id;
			$this->states_id = $location->states_id;
			$this->cities_id = $location->cities_id;
		}

		if (isset($states_id)){
			$this->states_id = $states_id;
		}

		try{
			$this->save();
			return $this;
		}catch(ORM_Validation_Exception $e){
			return $e;
		}
	}
	
	public function addSport($sports_id)
	{
		$this->add('sports',$sports_id);
	}

	public static function orgs_sports_id_exist($orgs_id, $sports_id){
		$org_sport_link = ORM::factory("Sportorg_Orgsportlink");
		$org_sport_link->where('orgs_id', '=', $orgs_id)
			->and_where('sports_id', '=', $sports_id)->find();

		if ($org_sport_link->orgs_id != ""){
			return true;
		}else{
			return false;
		}
	}

	public function updateOrgSportLink($org_id, $sports_id){
		$oslink = ORM::factory("Sportorg_Orgsportlink");
		$results = $oslink->where('orgs_id', '=', $org_id)
			->find_all();
		try{
			foreach($results as $result){
				$result->sports_id = $sports_id;
				$result->update();
			}
			return $this;
		}catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function deleteSport($org_id, $sports_id){
		$oslink = ORM::factory("Sportorg_Orgsportlink");
		$results = $oslink->where('orgs_id', '=', $org_id)
			->where('sports_id', '=', $sports_id);
		$classes_arr = array(
			'Sportorg_Orgsportlink' => 'sportorg_orgsportlink'
		);
		$results = ORM::_sql_exclude_deleted($classes_arr, $results);
		$results = $results->find_all();
		foreach($results as $result){
			$result->delete();
		}
		return $this;
	}
}