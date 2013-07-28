<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 3:41 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Sent extends ORM
{
	
	protected $_table_name = 'resumes_sent';

	public $error_message_path = 'models/user/resume';
	/*
	protected $_belongs_to = array(
		'resume_data_group' => array(
			'model' => 'User_Resume_Data_Group',
			'foreign_key' => 'resume_data_groups_id'
		)
	);

	protected $_has_many = array(
		'datavals' => array(
			'model' => 'User_Resume_Data_Vals',
			'foreign_key' => 'resume_data_id'
		),
	);
	*/
	public function rules(){

		return array
		(
			'college_coach_id'=>array(
				array('not_empty'),
				array('coaches_id_exist'),
			),

			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist'),
			),

			'sports_id'=>array(
				array('not_empty'),
				array('sports_id_exist'),
			),
		);
	}

//	public function __construct($id=NULL)
//	{
//		parent::__construct($id);
//	}
//
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"users_id" => $this->users_id,
			"college_coach_id" => $this->college_coach_id,
			"sports_id" => $this->sports_id,
		);
	}
	
	public function saveSentInfo($args = array(), $email = "")
	{
		extract($args);
		
		if ( isset($users_id) )
		{
			$this->users_id = $users_id;
		}
		
		if ( isset($college_coach_id) )
		{
			$this->college_coach_id = $college_coach_id;
		}

		if ( isset($sports_id) )
		{
			$this->sports_id = $sports_id;
		}

		try{

			if(isset($users_id)){
				$user_model = ORM::factory("User_Base", $users_id);
				$user_mail = $user_model->email;
				$user_fullname = $user_model->name();
			}

			$messages = $user_fullname." interested in your sport course. his contact mail is ".$user_mail;
			$messages .= "Resume link is ".URL::base()."profile/".$users_id;

			if ($this->save()){

				if (Email::send_mail($email, "Send mail to coaches", $messages)){
					$return_message = "Sent to coach($email) success";
				}else{
					$return_message = "Sent to coach($email), info didn't saved";
					//delete the new inserted one.b/c the send mail action is failed.
					$this->delete();
				}
				return $return_message;
			}
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public function getSentResumes($args = array())
	{
		extract($args);
		$resumesent = ORM::factory('User_Resume_Sent');
		if (isset($users_id))
			$resumesent->where('users_id', '=', $users_id);

		if (isset($sports_id))
			$resumesent->where('sports_id', '=', $sports_id);

		$classes_arr = array(
			'User_Resume_Sent' => 'user_resume_sent'
		);

		$resumesent = ORM::_sql_exclude_deleted($classes_arr, $resumesent);
		return $resumesent;
	}
}