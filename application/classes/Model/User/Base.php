<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 12:17 AM
 */

class Model_User_Base extends Model_Auth_User
{
	
	//protected $_table_name = '';
	
/*
	protected $_belongs_to = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		)
	);
	
	protected $_has_many = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		),
		'[alias name]' => array(
			'model' => '[model name]', 
			'through' => '[model name of pivot table]'
		)
	);
	
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