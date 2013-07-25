<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 1:02 PM
 */

class Model_User_Contact extends ORM
{
	protected $_table_name = 'user_contact';

	public $error_message_path = 'models/user';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'location' => array(
			'model' => 'Location_Base',
			'foreign_key' => 'locations_id'
		)
	);

	public function rules(){
		return array(

			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist')
			),
			// sports_id (int)
			'locations_id'=>array(
				array('not_empty'),
				array('locations_id_exist')
			),
		);
	}

	public function addContact($args = array()){
		extract($args);
		if (isset($id)){
			$this->id = $id;
		}

		if(isset($phone_cell))
		{
			$this->phone_cell = $phone_cell;
		}

		if(isset($phone_work))
		{
			$this->phone_work = $phone_work;
		}

		if(isset($locations_id))
		{
			$this->locations_id = $locations_id;
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

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"phone_cell" => $this->phone_cell,
			"phone_work" => $this->phone_work,
			"users_id" => $this->users_id,
			"user" => $this->user->getBasics(),
			"locations_id" => $this->locations_id,
			"location" => $this->location->getBasics()
		);
	}

	public function name(){
		return "";
	}
}