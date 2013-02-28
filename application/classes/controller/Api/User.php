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

		$this->setMainModel(ORM::factory('User_Base'));
		$this->popMainModel();
	}

	public function action_index()
	{

	}

	//GET methods
	public function action_get_basics()
	{
		$this->payloadDesc = "Basic information about the user.";
	}

	public function action_get_teams()
	{
		$this->payloadDesc = "List of teams associated with the user.";
	}

	public function action_get_sports()
	{
		$this->payloadDesc = "List of sports associated with the user.";
	}

	//org list
	public function action_get_orgs()
	{
		$this->payloadDesc = "List of organizations associated with the user.";
	}

	public function action_get_related()
	{
		$this->payloadDesc = "List of related athletes and teams associated with the user.";
	}

	public function action_get_videos()
	{
		$this->payloadDesc = "List of videos associated with the user.";
	}

	public function action_get_images()
	{
		$this->payloadDesc = "List of images associated with the user.";
	}

	public function action_get_commentsof()
	{
		$this->payloadDesc = "List of comments made by the user.";
	}

	public function action_get_commentson()
	{
		$this->payloadDesc = "List of comments made ABOUT the the user on his/her profile.";
	}


	//POST METHODS
	public function action_post_teams()
	{
		return $this->request->post();
	}

}