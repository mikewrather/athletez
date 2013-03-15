<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:53 PM
 */

class Model_Stats_Tab extends ORM
{
	
	protected $_table_name = 'stattabs';
	
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

	public function getBasics()
	{
		return array(
			"stattab_id" => $this->stattab_id,
			"sport_id" => $this->sport_id,
			"sport_id2" => $this->sport_id2,
			"name" => $this->name,
			"classname" => $this->classname,
			"is_root" => $this->is_root,
			"defaultChild" => $this->defaultChild,
			"orderNum" => $this->orderNum,
		);
	}
}