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
			"model" => "Sportorg_Season_Profile",
			"foreign_key" => "season_profiles_id"
		)
	);

	protected $_has_many = array(
		'orgsports' => array(
			'model' => 'Sportorg_Orgsportlink',
			'foreign_key' => 'orgs_id'
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

	public function getTeams()
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
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"divisions" => $this->divisions->getBasics(),			 
			"leagues" => $this->leagues->getBasics(),
			"name" => $this->name,
			"single_sport" => $this->single_sport,
			"location" => $this->location->getBasics(),
			"season_profile" => $this->season_profile->getBascis(),
			"complevel_profile" => $this->complevel_profile->getBascis(),
		);
	}
}