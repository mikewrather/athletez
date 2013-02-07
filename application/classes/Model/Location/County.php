<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:38 PM
 */

class Model_Location_County extends ORM
{
	
	protected $_table_name = 'counties';
	
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