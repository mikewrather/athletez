<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/30/13
 * Time: 2:45 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_College_Coach extends ORM
{
	
	protected $_table_name = 'college_coaches';

	protected $_belongs_to = array(
		'college' => array(
			'model' => 'College_Base',
			'foreign_key' => 'collge_id'
		)
	);

	public function sendMail($args = array()){
		extract($args);


		try{
			$message_arr = array();
			foreach($coaches as $coach){
				$resume_sent_model = ORM::factory("User_Resume_Sent");
				$data = array(
					'college_coach_id' => $coach,
					'users_id' => $users_id
				);
				if (isset($sports_id)){
					$data['sports_id'] = $sports_id;
				}
				$coaches_model = ORM::factory("College_Coach", $coach);
				$message = $resume_sent_model->saveSentInfo($data, 'mike.wrather@gmail.com');//TODO, this is the real email: $coaches_model->email
				$message_arr[] = $message;
				unset($coaches_model);
				unset($resume_sent_model);
			}
			$std = new stdClass();
			$std->result = $message_arr;
			return $std;
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function name()
	{
		return $this->coach_first." ".$this->coach_last;
	}

}