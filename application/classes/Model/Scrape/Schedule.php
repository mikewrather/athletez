<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/8/13
 * Time: 5:56 PM
 */

class Model_Scrape_Schedule extends ORM
{
	protected $_db_group = 'scraping';
	protected $_table_name = 'schedule';
	
/*
	protected $_belongs_to = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		)
	);
	*/
	protected $_has_many = array(
		'teams' => array(
			'model' => 'Scrape_Scheduleteam',
			'foreign_key' => 'schedule_id'
		)
	);
	/*
	protected $_has_one = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		)
	);
*/

	public static function getByContestID($contestID)
	{
		$sc = ORM::factory('Scrape_Schedule')->where('mp_contestid','=',$contestID)->find();
		if($sc->loaded()) return $sc;
		return false;
	}

	public function checkForTeam($school_id,$ssid)
	{
		$team = $this->teams->where('mp_school_id','=',$school_id)->and_where('mp_ssid','=',$ssid)->find();
		//print_r($team);
		if(!$team->loaded()) {
			return false;
		}
		return true;
	}


}