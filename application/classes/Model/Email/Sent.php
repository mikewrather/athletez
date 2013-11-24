<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 10/15/13
 * Time: 12:58 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Email_Sent extends ORM
{
	
	protected $_table_name = 'email_sent';
	

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'user_id'
		),
		'emailschedule' => array(
			'model' => 'Email_Schedule',
			'foreign_key' => 'email_schedule_id'
		),
		'coach' => array(
			'model' => 'College_Coach',
			'foreign_key' => 'college_coaches_id'
		),
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
	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function saveSent($args){
		extract($args);
		$this->user_id = $users_id;
		$this->uniqueString = $queue->uniqueString;

		try{
			$this->save();

			if(is_object($queue))
			{
				if($this->loaded() && $queue->loaded()){
					$queue->email_sent_id = $this->id;
					$queue->save();
				}
			}

		}
		catch (ORM_Validation_Exception $e)
		{

		}

		return $this;
	}

}