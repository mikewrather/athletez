<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/4/13
 * Time: 1:30 PM
 */

class Model_Sportorg_Org extends ORM
{

	protected $_table_name = "orgs";
	
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
}