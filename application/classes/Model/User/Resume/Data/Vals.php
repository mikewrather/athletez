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

			/*TODO, add by Jeffrey, developer need to validate this element manually
			'users_id'=>array(
				array('not_empty'),
				array('digit'),
			),
			*/
			// user_value (varchar)
			'user_value'=>array(
				array('not_empty'),
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
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"user" => $this->user->getBasics(),
			"resume_data" => $this->resume_data->getBasics(),
			"user_value" => $this->user_value,
			"user_id" => $this->users_id,
			"resume_data_id" => $this->resume_data_id,
		 
		);
	}
	
	public function updateResumeDataVal($user_value)
	{
		if(isset($user_value))
		{
			$this->user_value = $user_value;
		}
		return $this->save();
	}
	
	public function deleteResumeDataVal()
	{
		return $this->delete();
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
		$this->save();
		return $this;
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
}