<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 11/12/13
 * Time: 1:30 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Emailqueue extends Controller_Api_Base
{

	public function __construct($request,$response)
	{
		parent::__construct($request,$response);
		$this->mainModel = ORM::factory('Email_Queue');
		$this->popMainModel();
	}
	public function action_index()
	{
	
	}
	
	//GET methods
	public function action_get_processqueue()
	{
		$this->payloadDesc = "Process unsent email queue";
		$this->mainModel->processQueue();
	}
	
	//POST methods
	public function action_post_basics()
	{
		
	}
	
	//PUT Methods
	public function action_put_basics()
	{
		
	}
	
	//DELETE Methods
	public function action_delete()
	{
		
	}
}