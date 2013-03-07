<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/7/13
 * Time: 12:55 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Codegen_Entlist extends ORM
{
	
	protected $_table_name = 'entlist';
	
/*
	protected $_belongs_to = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		)
	);
	*/
	protected $_has_many = array(
		'apimethods' => array(
			'model' => 'Codegen_Apimethod',
			'foreign_key' => 'entlist_id'
		),
	);
	/*
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