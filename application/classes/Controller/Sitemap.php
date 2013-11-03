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

class Controller_Sitemap extends Controller_Template
{

	public function action_index()
	{

		$result = DB::select('id')->from('users');
		$result = ORM::_sql_exclude_deleted_abstract(array("User_Base" => "users.id"),$result);
		$result = $result->execute();
		$users = $result->as_array();

		$result = DB::select('id')->from('games');
		$result = ORM::_sql_exclude_deleted_abstract(array("Sportorg_Games_Base" => "games.id"),$result);
		$result = $result->execute();
		$games = $result->as_array();

		$result = DB::select('id')->from('teams');
		$result = ORM::_sql_exclude_deleted_abstract(array("Sportorg_Team" => "teams.id"),$result);
		$result = $result->execute();
		$teams = $result->as_array();


	//	print_r($users);
		$view = View::factory('sitemap');
		$view->users = $users;
		$view->games = $games;
		$view->teams = $teams;

		$this->template = $view;
	}
}