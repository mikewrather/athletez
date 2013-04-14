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

	public $error_message_path = 'models/user/user_fitness_dataval';
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

	public function updateFitnessData($args = array()){
		extract($args);
		//unset($args['fitness_data_values_id']);
		try {
			$validate = Validation::factory($args);
			if ($fitness_data_values_id != ""){
				$validate->rule("user_value", "not_empty");
				$validate->rule("user_value", "digit");
				$validate->rule("fitness_data_values_id", "fitness_data_values_id_exist");
				//$obj = ORM::factory("User_Fitness_Dataval", $fitness_data_values_id);
				if ($this->check($validate)){
					$obj = ORM::factory("User_Fitness_Dataval", $fitness_data_values_id);
					$obj->user_value = $user_value;
					$obj->update($validate);
					return $obj;
				}
			}else{
					$validate->rule("users_id", "not_empty");
					$validate->rule("users_id", "digit");
					$validate->rule("users_id", "users_id_exist");

					$validate->rule("fitness_data_id", "not_empty");
					$validate->rule("fitness_data_id", "digit");
					$validate->rule("fitness_data_id", "fitness_datavalue_exist", array($fitness_data_id, $users_id));
					$validate->rule("user_value", "not_empty");
					$validate->rule("user_value", "digit");
				if ($this->check($validate)){
					$return_pk = $this->get_pk($fitness_data_id, $users_id);
					$obj = ORM::factory("User_Fitness_Dataval", $return_pk);
					$obj->users_id = $users_id;
					$obj->fitness_data_id = $fitness_data_id;
					$obj->user_value = $user_value;
					//$obj->id = $return_pk;
					$obj->update($validate);
					return $obj;
				}
			}
			//return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function get_pk($fitness_data_id, $users_id){

		$exists_obj = DB::select('*')
			->from($this->_table_name)
			->where('fitness_data_id','=',$fitness_data_id)
			->and_where('users_id', '=', $users_id)->execute()->as_array();

		if(count($exists_obj)){
			return $exists_obj[0]['id'];
		}else{
			return "";
		}
	}

}