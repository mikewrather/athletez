<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 7/13/13
 * Time: 3:27 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Data_Profile_Sportslink extends ORM
{
	
	protected $_table_name = 'rdp_sports_link';
	
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