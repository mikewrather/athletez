<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/4/13
 * Time: 1:30 PM
 */

class Model_Sportorg_Org extends ORM
{

	protected $_table_name = "orgs";

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
		'divisions' => array(
			'model' => 'Sportorg_Division',
			'foreign_key' => 'divisions_id',
		),
		'leagues' => array(
			'model' => 'Sportorg_League',
			'foreign_key' => 'orgs_id',
			'through' => 'org_league_link',
			'far_key' => 'leagues_id'
		)
	);

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
				array('not_empty'),
				array('in_array', array(':value', array('true', 'false'))),
			),

			// leagues_id (int)
			'leagues_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),

			// divisions_id (int)
			'divisions_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),

			// season_profiles_id (int)
			'season_profiles_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),

			// complevel_profiles_id (int)
			'complevel_profiles_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),

			//comment by jeffrey, no this field in add form
			'locations_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
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
		if ( isset($sports_id))
		{
			$teams_model->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if ( isset($complevels_id) )
		{
			$teams_model->where('sportorg_team.complevels_id', '=', $complevels_id);
		}
		return $teams_model;
	}
	
	public function getLeague()
	{
		return $this->leagues;
	}
	
	public function getDivisions()
	{
		//$divisions = ORM::factory('Sportorg_Org')->join('divisions')->on('divisions.id', '=', 'sportorg_org.divisions_id')->where('sportorg_org.id','=', $this->id);

		return $this->divisions;
	} 
	
	public function getSports()
	{
		$org_sport_link_obj = $this->sports;
		return $org_sport_link_obj;
	}
	
	public function getComplevels($args = array())
	{
		extract($args);
		$complevels_model = ORM::factory("Sportorg_Complevel_Base");
		$complevels_model->join('orgs')->on('orgs.complevel_profiles_id', '=', 'sportorg_complevel_base.complevel_profiles_id');
		$complevels_model->where('orgs.id', '=', $id);
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

		return $sections_model;
	}
	
	public function getSeasons($args)
	{
		extract($args);
		$seasons_model = ORM::factory("Sportorg_Seasons_Base");
		$seasons_model->join('orgs')->on('orgs.season_profiles_id', '=', 'sportorg_seasons_base.season_profiles_id');
		$seasons_model->where('orgs.id', '=', $id);
		return $seasons_model;
	}

	public function get_search($args = array()){
		extract($args);
		$orgs_model = ORM::factory("Sportorg_Org");

		if (isset($sports_id)){
			$orgs_model->join('org_sport_link')
				->on('org_sport_link.orgs_id', '=', 'sportorg_org.id');
			$orgs_model->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if (isset($cities_id)){
			$orgs_model->join('locations')
				->on('locations.id', '=', 'sportorg_org.locations_id');
			$orgs_model->where('locations.cities_id', '=', cities_id);
		}
		if (isset($sports_club)){
			$orgs_model->where('sportorg_org.sports_club', '=', $sports_club);
		}

		$orgs_model->where('sportorg_org.states_id', '=', $states_id);

		return $orgs_model;
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
		return $games;
	}
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"divisions_id" => $this->divisions_id,
			"leagues_id" => $this->leagues_id,
			"locations_id" => $this->locations_id,
			"complevel_profiles_id" => $this->complevel_profiles_id,
			"name" => $this->name,
			"season_profiles_id" => $this->season_profiles_id,
			"sports_club" => $this->sports_club,
			"season_profile" => $this->season_profile->getBasics(),			
			"complevel_profile" => $this->complevel_profile->getBasics(),
			"locations" => $this->location->getBasics()
		);
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
		return $this->save();
	}
	
	public function updateDivision($divisions_id)
	{
		if (isset($divisions_id))
		{
			$this->divisions_id = $divisions_id;
		}
		return $this->save();
	}
	
	public function updateComplevelprofile($complevel_profiles_id)
	{
		if (isset($complevel_profiles_id))
		{
			$this->complevel_profiles_id = $complevel_profiles_id;
		}
		return $this->save();
	}
	
	public function updateSeasonProfile($season_profiles_id)
	{
		if (isset($season_profiles_id))
		{
			$this->season_profiles_id = $season_profiles_id;
		}
		return $this->save();
	}
	
	public function addSport($sports_id)
	{
		$this->add('sports',$sports_id);
	}

}