<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/20/13
 * Time: 4:53 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Identity extends ORM
{
	
	protected $_table_name = 'user_identities';
	

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'user_id'
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