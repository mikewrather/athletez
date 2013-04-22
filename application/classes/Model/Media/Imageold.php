<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 4/21/13
 * Time: 7:01 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Media_Imageold extends ORM
{
	
	protected $_table_name = 'images_old';
	
/*
	protected $_belongs_to = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		)
	);
	
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