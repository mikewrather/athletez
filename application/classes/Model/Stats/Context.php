<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:54 PM
 */

class Model_Stats_Context extends ORM
{
	
	protected $_table_name = 'stat_contexts';
	
/*
	protected $_belongs_to = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		)
	);
	*/

	protected $_has_many = array(
		'statvals' => array(
			'model' => 'Stats_Val',
			'foreign_key' => 'stat_contexts_id'
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
	public function __construct($id)
	{
		parent::__construct($id);
	}
	
	public function getBasics()
	{
		return array(
			"name" => $this->name,			
		);
	}
}