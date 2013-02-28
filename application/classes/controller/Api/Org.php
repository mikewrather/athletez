<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/26/13
 * Time: 1:56 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Org extends Controller_Api_Base
{

	public function __construct($request, $response)
	{
		parent::__construct($request, $response);
		$this->setMainModel(ORM::factory('Sportorg_Org'));
		$this->popMainModel();
	}

	public function action_index()
	{
		return $this->constructMainObject();
	}

	public function action_get_basics()
	{
		return $this->constructMainObject();
	}

	public function action_get_teams()
	{
		return $this->constructMainObject();
	}

	protected function constructMainObject()
	{
		//Set up a custom object to pass to the view class
		$retObj = new stdClass();
		$retObj->main = $this->mainModel;

		//get teams
		//GETTING THE TEAMS FOR A SPECIFIC USER
		if($this->request->query('users_id') > 0)
		{
			$user = ORM::factory('User_Base',$this->request->query('users_id'));
			$teams = $user->teams->find_all();
		}
		elseif(0) // THIS WILL JUST BE CHECKING FOR ANY OTHER THINGS THAT COME UP THAT WILL CHANGE HOW TEAMS ARE PULLED
		{

		}
		else
		{
			$teams = $this->mainModel->getTeams();
		}

		$retObj->teams = $teams;
		return $retObj;
	}
}