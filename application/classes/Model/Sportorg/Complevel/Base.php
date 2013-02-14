<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:53 PM
 */

class Model_Sportorg_Complevel_Base extends ORM
{
	
	protected $_table_name = 'complevels';
	

	protected $_belongs_to = array(
		'complevelprofile' => array(
			'model' => 'Sportorg_Complevel_Profile',
			'foreign_key' => 'complevel_profiles_id'
		)
	);
	
	protected $_has_many = array(
		'teams' => array(
			'model' => 'Sportorg_Team',
			'foreign_key' => 'complevels_id'
		),
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