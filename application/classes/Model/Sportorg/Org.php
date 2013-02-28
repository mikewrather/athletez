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
		'orggbslinks' => array(
			'model' => 'Sportorg_Orggbslink',
			'foreign_key' => 'orgs_id'
		),
		'divisions' => array(
			'model' => 'Sportorg_Division',
			'foreign_key' => 'divisions_id',
		),
		'leagues' => array(
			'model' => 'Sportorg_League',
			'foreign_key' => 'leagues_id',
		),
		'gbslinks' => array(
			'model' => 'Sportorg_Gbslink',
			'foreign_key' => 'orgs_id',
			'far_key' => 'gbs_link_id',
			'through' => 'org_gbs_link'
		)
	);

	public function getTeams()
	{
		$orggbslinks = $this->orggbslinks->find_all();
		$teams = array();
		foreach($orggbslinks as $orggbslink)
		{
			$ts = $orggbslink->teams->find_all();
			foreach($ts as $t)
			{
				$teams[$t->id] = $t;
			}

		}
		return $teams;
	}
}