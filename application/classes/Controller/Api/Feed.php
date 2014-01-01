<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 12/31/13
 * Time: 3:34 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Feed extends Controller_Api_Base
{

	public function __construct($request,$response)
	{
		parent::__construct($request,$response);
		$this->mainModel = ORM::factory('Site_Feed');
		$this->popMainModel();
	}
	public function action_index()
	{
	
	}
	
	//GET methods
	public function action_get_process()
	{
		$this->payloadDesc = "Process The Feed";
		$this->mainModel->processFeed();
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