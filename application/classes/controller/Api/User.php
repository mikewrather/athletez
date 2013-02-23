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

	public function __construct($request,$response)
	{
		parent::__construct($request,$response);

		//set main model to user
		if((int)$this->request->param('id') > 0)
		{
			$this->mainModel = ORM::factory('User_Base',$this->request->param('id'));
		}
	}

	public function action_index()
	{

	}

	//GET methods
	public function action_get_basics()
	{
		return $this->getDataFromView();
	}

	public function action_get_teams()
	{
		return $this->getDataFromView();
	}

	public function action_get_sports()
	{
		return $this->getDataFromView();
	}

	public function action_get_orgs()
	{
		return $this->getDataFromView();
	}

	public function action_get_related()
	{
		return $this->getDataFromView();
	}

	public function action_get_videos()
	{
		return $this->getDataFromView();
	}

	public function action_get_images()
	{
		return $this->getDataFromView();
	}

	public function action_get_comments()
	{
		return $this->getDataFromView();
	}

	//POST METHODS
	public function action_post_teams()
	{
		return $this->request->post();
	}

}