<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 4/23/13
 * Time: 3:45 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Apitest extends Controller_Api_Base
{

	public function __construct($request,$response)
	{
		parent::__construct($request,$response);
		$this->mainModel = ORM::factory('Codegen_Apitest');
		$this->popMainModel();
	}
	public function action_index()
	{
	
	}

	public function action_get_testval()
	{
		
	}

}