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
				array('in_array', array(':value', array('Junior', 'Senior', 'Freshman', 'Sophomore'))),
			),
//
			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist')
			),
//
			'gpa'=>array(
				array('not_empty'),
				array('numeric'),
			),
		);
	}

	public function getGpa($args = array()){
		extract($args);
		$gpa = $this;
		if ($users_id){
			$gpa->where('users_id', '=', $users_id);
		}

		$classes_arr = array(
			'Academics_Gpa' => 'academics_gpa'
		);

		$gpa = ORM::_sql_exclude_deleted($classes_arr, $gpa);
		return $gpa;
	}

	public function addGpa($args = array()){
		extract($args);

		try
		{
			$gpa_model = ORM::factory("Academics_Gpa");
			$result = $gpa_model->where('users_id', '=', $users_id);
			$result->where('year', '=', ucfirst($year));
			$re = $result->find();
			if (!$re->loaded())
			{
				//add new row
				$new_gpa_model = ORM::factory("Academics_Gpa");
				$new_gpa_model->year = ucfirst($year);
				$new_gpa_model->users_id = $users_id;
				$new_gpa_model->gpa = $gpa;
				$new_gpa_model->save();
				return $new_gpa_model;
			}
			else
			{
				$re->gpa = $gpa;
				$re->update();
				return $result;
			}
		}
		catch (ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public function updateGpa($args = array()){
		extract($args);

		$gpa_model = ORM::factory("Academics_Gpa");
		$gpa_model->gpa = $gpa_model;
		$result = $gpa_model->where('users_id', '=', $users_id);
		$result->where('year', '=', ucfirst($year));
		$re = $result->find()->as_array();


		try{
			$year = ucfirst($year);
			if (empty($re['id'])){
				//add new row
				$new_gpa_model = ORM::factory("Academics_Gpa");
				$new_gpa_model->year = $year;
				$new_gpa_model->users_id = $users_id;
				$new_gpa_model->gpa = $gpa;
				$new_gpa_model->save();
				return $new_gpa_model;
			}else{
				$result->gpa = $gpa;
				$result->update();
				return $result;
			}
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getBasics($settings = array()){
//		return array(
//			'year' => $this->year,
//			'users_id' => $this->users_id,
//			'gpa' => $this->gpa,
//		);
		return parent::getBasics($settings);
	}
}