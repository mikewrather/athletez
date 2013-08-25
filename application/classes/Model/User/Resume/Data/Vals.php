<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 3:37 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Data_Vals extends ORM
{
	
	protected $_table_name = 'resume_data_vals';

	public $error_message_path = 'models/user/resume/data';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'resume_data' => array(
			'model' => 'User_Resume_Data',
			'foreign_key' => 'resume_data_id'
		)
	);

	public function rules(){

		return array
		(
			// resume_data_id (int)
			'resume_data_id'=>array(
				array('not_empty'),
				array('digit'),
				array('resume_data_id_exist'),
			),

			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist'),
			),
			// user_value (varchar)
			'user_value'=>array(
			),
		);
	}

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
	
	public function name()
	{
		return $this->user->first_name.' '.$this->user->last_name;
	}

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'resume_data_obj' => 'resume_data',
			'users_obj' => 'user',
			'users_id' => 'user_id'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);
	
	public function getBasics($settings = array())
	{
//		return array(
//			"id" => $this->id,
//			"user" => $this->user->getBasics(),
//			"resume_data" => $this->resume_data->getBasics(),
//			"user_value" => $this->user_value,
//			"user_id" => $this->users_id,
//			"resume_data_id" => $this->resume_data_id,
//		);

		return parent::getBasics($settings);
	}
	
	public function updateResumeDataVal($user_value)
	{
		if(isset($user_value))
		{
			$this->user_value = $user_value;
		}
		try{
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public function addValue($args = array())
	{
		extract($args);
		
		if(isset($user_value))
		{
			$this->user_value = $user_value;
		}
		
		if(isset($users_id))
		{
			$this->users_id = $users_id;
		}

		if(isset($resume_data_id))
		{
			$this->resume_data_id = $resume_data_id;
		}

		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}
	
	public function addResumeDataVal($args = array())
	{
		extract($args);
		
		if(isset($users_id))
		{
			$this->users_id = $users_id;
		}
		
		if(isset($user_value))
		{
			$this->user_value = $user_value;
		} 
		
		if(isset($resume_data_id))
		{
			$this->resume_data_id = $resume_data_id;
		}
		
		try {
            $this->save();  
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        }   
	}

	public function owner(){
		if(!$this->id){
			return "";
		}
		return intval($this->users_id);
	}

	public function is_owner($user){
		if (is_object($user)){
			return intval($user->id) == $this->owner();
		}else{
			return intval($user) == $this->owner();
		}
	}
}