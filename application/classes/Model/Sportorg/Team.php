<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:49 PM
 */

class Model_Sportorg_Team extends ORM
{

	protected $_table_name = 'teams';

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
			'model' => 'Users',
			'through' => 'users_teams_link'
		)
	);

	public function getOrg()
	{
		return $this->orgsportlink->org;
	}

	public function getSport()
	{
		return $this->orgsportlink->sport;
	}
		
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"org_sport_link" => $this->org_sport_link->getBasics(),
			"org_sport_link_id" => $this->org_sport_link_id,
			"complevel" => $this->complevel->getBasics(),
			"complevels_id" => $this->complevels_id,
			"season" => $this->season->getBasics(),
			"seasons_id" => $this->seasons_id,
			"year" => $this->year,
			"mascot" => $this->mascot,
			"unique_ident" => $this->unique_ident,
		);
	}
}