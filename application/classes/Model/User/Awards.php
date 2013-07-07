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
		return array();
	}

	public function addAwards($args = array()){
		extract($args);
		if (isset($id)){
			echo "id = ".$id;
			$this->id = $id;
		}

		if(isset($name))
		{
			$this->name = $name;
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
			$this->update();
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
			"name" => $this->name,
			"users_id" => $this->users_id,
			"sports_id" => $this->sports_id,
			"description" => $this->description
		);
	}


}