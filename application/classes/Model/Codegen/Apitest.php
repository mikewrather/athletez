<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 4/23/13
 * Time: 3:20 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Codegen_Apitest extends ORM
{
	
	protected $_table_name = 'apitest';
	

	protected $_belongs_to = array(
		'apimethod' => array(
			'model' => 'Codegen_Apimethod',
			'foreign_key' => 'apiaccess_id'
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