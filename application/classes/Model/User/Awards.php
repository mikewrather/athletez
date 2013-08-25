<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 1:02 PM
 */

class Model_User_Awards extends ORM
{
	protected $_table_name = 'awards';

	public $error_message_path = 'models/user';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		)
	);

	public function rules(){
		return array(
			// states_id (int)
			'name'=>array(
				array('not_empty'),
			),
			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist')
			),
			// sports_id (int)
			'sports_id'=>array(
				array('not_empty'),
				array('sports_id_exist')
			),
		);
	}

	public function addAwards($args = array()){
		extract($args);
		if (isset($id)){
			$this->id = $id;
		}

		if(isset($name))
		{
			$this->name = $name;
		}

		if(isset($year))
		{
			$this->year = $year;
		}

		if(isset($description))
		{
			$this->description = $description;
		}

		if(isset($sports_id))
		{
			$this->sports_id = $sports_id;
		}

		if(isset($users_id))
		{
			$this->users_id = $users_id;
		}
		try{
			$this->save();
		}catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
		return $this;
	}

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'users_obj' => 'user',
			'sports_obj' => 'sport',
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(

		),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function getBasics($settings = array())
	{
//		return array(
//			"id" => $this->id,
//			"name" => $this->name,
//			"year" => $this->year,
//			"users_id" => $this->users_id,
//			"user" => $this->user->getBasics(),
//			"sports_id" => $this->sports_id,
//			"sport" => $this->sport->getBasics(),
//			"description" => $this->description
//		);
		return parent::getBasics($settings);
	}
}