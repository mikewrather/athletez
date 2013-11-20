<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 11/12/13
 * Time: 12:06 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Email_Queue extends ORM
{
	
	protected $_table_name = 'email_queue';
	

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'sent' => array(
			'model' => 'Email_Sent',
			'foreign_key' => 'email_sent_id'
		)
	);


	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function addToQueue($args){


		if(isset($args['users_id']))
		{
			$this->users_id = $args['users_id'];
		}
		else
		{
			return false;
		}

		if(isset($args['subject_line']))
		{
			$this->subject_line = $args['subject_line'];
		}
		else
		{
			return false;
		}

		if(isset($args['message_body']))
		{
			$this->message_body = $args['message_body'];
		}
		else
		{
			return false;
		}

		if(isset($args['to_address']))
		{
			$this->to_address = $args['to_address'];
		}
		else
		{
			return false;
		}

		if(isset($args['cc_array']) && is_array($args['cc_array']))
		{
			$this->cc_array = serialize($args['cc_array']);
		}

		if(isset($args['bcc_array']) && is_array($args['bcc_array']))
		{
			$this->bcc_array = serialize($args['bcc_array']);
		}

		$this->uniqueString = Email::generateUniqueString();

		try{
			$this->save();
			return $this;
		} catch(Kohana_Exception $e){
			print_r($e->getMessage());
		}
	}

	public function processQueue(){
		$unsent = $this->where('email_sent_id','IS',null)->find_all();
		foreach($unsent as $message)
		{
			Email::sendFromQueue($message->id);
		}
	}

}