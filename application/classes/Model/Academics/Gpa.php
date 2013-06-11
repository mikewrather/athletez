<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 6/10/13
 * Time: 3:53 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Academics_Gpa extends ORM
{
	
	protected $_table_name = 'academics_gpa';

	public $error_message_path = 'models/academics';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		)
	);

	public function rules(){
		return array
		(
			'year'=>array(
				array('not_empty'),
			),

			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist')
			),

			'gpa'=>array(
				array('not_empty'),
				array('numeric')
			),
		);
	}

	public function getGpa($args = array()){
		extract($args);
		if ($users_id){
			$this->where('users_id', '=', $users_id);
		}
		return $this;
	}

	public function addGpa($args = array()){
		extract($args);
		if (isset($year)){
			$this->year = $year;
		}

		if (isset($users_id)){
			$this->users_id = $users_id;
		}

		if (isset($gpa)){
			$this->gpa = $gpa;
		}
		try{
			$this->save();
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function updateGpa($args = array()){
		extract($args);

		if (isset($id)){
			$this->id = $id;
		}

		if (isset($year)){
			$this->year = $year;
		}

		if (isset($users_id)){
			$this->users_id = $users_id;
		}

		if (isset($gpa)){
			$this->gpa = $gpa;
		}
		try{
			$this->update();
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getBasics(){
		return array(
			'year' => $this->year,
			'users_id' => $this->users_id,
			'gpa' => $this->gpa,
		);
	}
}