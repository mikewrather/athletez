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
		'orggbslink' => array(
			'model' => 'Sportorg_Orggbslink',
			'foreign_key' => 'org_gbs_link_id'
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
		return $this->orggbslink->org;
	}

	public function getSport()
	{
		return $this->orggbslink->gbslink->sport;
	}
		
	public function getBasics()
	{
		return array(
			"orggbslink" => $this->orggbslink->getBasics(),			 
			"complevel" => $this->complevel->getBasics(),
			"season" => $this->season->getBasics(),
			"year" => $this->year,
			"mascot" => $this->mascot,
			"unique_ident" => $this->unique_ident,
		);
	}
}