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

	public function getTeams()
	{
		if(!$this->id) return false; // return false if this object doesn't have an id
		$teams = ORM::factory('Sportorg_Team')
			->join('org_sport_link')
				->on('org_sport_link.id','=','sportorg_team.org_sport_link_id')
			->where('org_sport_link.orgs_id','=',$this->id);

		return $teams;
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
			"locations" => $this->locations->getBasics()
		);
	}

	public function addSport($sports_id)
	{
		$this->add('sports',$sports_id);
	}

}