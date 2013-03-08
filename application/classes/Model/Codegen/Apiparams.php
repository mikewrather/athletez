<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/8/13
 * Time: 2:08 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Codegen_Apiparams extends ORM
{
	
	protected $_table_name = 'apiparams';
	

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