<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/26/13
 * Time: 2:49 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Ent extends Controller_Api_Base
{

	public function __construct($request, $response)
	{
		parent::__construct($request, $response);
		$this->SetMainModel(Ent::eFact($this->myID,$this->myID2));
	}

	public function action_index()
	{

	}

	//GET methods
	public function action_get_basics()
	{
		$this->payloadDesc = "Basic information about the Ent.";
		return $this->getDataFromView();
	}

	//POST methods
	public function action_post_vote()
	{

	}

	public function action_post_comment()
	{

	}

	public function action_post_follow()
	{

	}

	//PUT Methods
	public function action_put_vote()
	{

	}

	public function action_put_comment()
	{

	}

	public function action_put_follow()
	{

	}

	//DELETE Methods
	public function action_delete_ent()
	{

	}

	public function action_delete_vote()
	{

	}

	public function action_delete_comment()
	{

	}

	public function action_delete_follow()
	{

	}
}