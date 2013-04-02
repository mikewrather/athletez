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
			'foreign_key' => 'leagues_id',
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

	public function getTeams($args = array())
	{
		extract($args);
		$org_sport_link_obj = $this->orgsports;
		if ( isset($sports_id))
		{
			$org_sport_link_obj->where('sports_id','=',$sports_id);
		}
		
		if ( isset($complevels_id) )
		{
			$org_sport_link_obj->teams->where('complevels_id', '=', $complevels_id);
		}
		  
		return $org_sport_link_obj;
	}
	
	public function getLeague()
	{
		$leagues = ORM::factory('Sportorg_Org')->join('leagues')->on('leagues.id', '=', 'sportorg_org.leagues_id')->where('sportorg_org.id','=', $this->id);
		return (Object)$leagues;
	}
	
	public function getDivisions()
	{
		$divisions = ORM::factory('Sportorg_Org')->join('divisions')->on('divisions.id', '=', 'sportorg_org.divisions_id')->where('sportorg_org.id','=', $this->id);		 
		return (Object)$divisions;		
	} 
	
	public function getSports()
	{
		$org_sport_link_obj = $this->sports;
		return $org_sport_link_obj;
	}
	
	public function getComplevels()
	{
		$complevel_profiles_obj = $this->complevel_profile->complevels;		
		return $complevel_profiles_obj;
	}
	
	public function getSection()
	{
		$sections = $this->sports->sections;
		return $sections;
	}
	
	public function getSessons()
	{
		$sessons = $this->season_profile->seasons;
		return $sessons;
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
			"single_sport" => $this->single_sport,
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
		if ( isset($single_sport))
		{
			$this->single_sport = $single_sport;
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