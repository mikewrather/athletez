<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/11/13
 * Time: 10:22 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Fitness_Dataval extends ORM
{
	
	protected $_table_name = 'fitness_data_vals';
	
	protected $_belongs_to = array(
		'fitness_data' => array(
			'model' => 'User_Fitness_Data',
			'foreign_key' => 'fitness_data_id'
		),
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
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
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"fitness_data" => $this->fitness_data->getBasics(),
			"user" => $this->user->getBasics(),
			"user_value" => $this->user_value,
			"fitness_data_id" => $this->fitness_data_id,
			"users_id" => $this->users_id
		);
	}

}