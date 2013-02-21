<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/19/13
 * Time: 2:06 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Highschool extends ORM
{
	
	protected $_table_name = 'highschools';
	

	protected $_belongs_to = array(
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'state_id'
		)
	);
	/*
	protected $_has_many = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		),
		'_alias_' => array(
			'model' => '_model_name_', 
			'through' => '_pivot_table_',
			'foreign_key' => '_column_',
			'far_key' => '_column_'
		)
	);
	
	protected $_has_one = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		)
	);
*/
	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}