<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:59 PM
 */

class Model_Sportorg_Seasons_Base extends ORM
{
	
	protected $_table_name = 'seasons';

	protected $_belongs_to = array(
		'seasonprofile' => array(
			'model' => 'Sportorg_Seasons_Profile',
			'foreign_key' => 'season_profiles_id'
		)
	);
	protected $_has_many = array(
		'teams' => array(
			'model' => 'Sportorg_Teams',
			'foreign_key' => 'seasons_id'
		),
		'statvals' => array(
			'model' => 'Stats_Vals',
			'foreign_key' => 'seasons_id'
		)
	);

	public function getTeamsBySport($sports_id=NULL)
	{

	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"seasonprofile" => $this->seasonprofile->getBasics(),			 
			"name" => $this->name,
			"season_profiles_id" => $this->season_profiles_id,
		);
	}
	
}