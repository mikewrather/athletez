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
		'complevel' => array(
			'model' => 'Sportorg_Complevel_Base',
			'foreign_key' => 'complevels_id'
		)
	);

	protected $_has_many = array(
		'gameslink' => array(
			'model' => 'Sportorg_Games_Teamslink',
			'foreign_key' => 'teams_id'
		),
		'athletes' => array(
			'model' => 'Users',
			'through' => 'users_teams_link'
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
	public function __construct()
	{
		parent::__construct();
	}

}