<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/18/13
 * Time: 5:09 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_User extends Controller_Api_Base
{

	public function action_index()
	{

	}

	public function action_get_basics()
	{
		$user = new Model_User_Base($this->request->param('id'));
		return $this->getDataFromView($user);
	}

}