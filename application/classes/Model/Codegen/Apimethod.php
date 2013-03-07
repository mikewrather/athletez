<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/7/13
 * Time: 12:57 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Codegen_Apimethod extends ORM
{
	
	protected $_table_name = 'apiaccess';
	

	protected $_belongs_to = array(
		'entlist' => array(
			'model' => 'Codegen_Entlist',
			'foreign_key' => 'entlist_id'
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