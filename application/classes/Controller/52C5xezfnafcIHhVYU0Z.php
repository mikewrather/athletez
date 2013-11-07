<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 5/28/13
 * Time: 1:02 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_52C5xezfnafcIHhVYU0Z extends Controller_Template
{

	public function action_index()
	{

		$result = DB::select('*')->from('users');
		$result = ORM::_sql_exclude_deleted_abstract(array("User_Base" => "users.id"),$result);
		$result = $result->execute();

	//	print_r($users);
		$view = View::factory('usermap');
		$view->users = $result;

		$this->template->content = $view;
	}
}