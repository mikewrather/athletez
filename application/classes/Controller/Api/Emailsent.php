<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 11/17/13
 * Time: 3:13 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Emailsent extends Controller_Api_Base
{

	public function __construct($request,$response)
	{
		parent::__construct($request,$response);
		$this->mainModel = ORM::factory('Email_Sent');
		$this->popMainModel();
	}

	protected function popMainModel()
	{
		if($this->myID)
		{
			$enttypes_id = Ent::getMyEntTypeID($this->mainModel);
			$is_deleted = ORM::enttypes_is_deleted($enttypes_id, $this->myID);
			$this->mainModel->where('uniqueString','=',$this->myID)
				->where(DB::expr('0'), '=', $is_deleted)
				->find();
			if(!$this->mainModel->loaded())	unset($this->mainModel);
		}
	}

	public function action_index()
	{
	
	}
	
	//GET methods
	public function action_get_pingback()
	{
		if($this->mainModel->loaded() && $this->mainModel->pingTime==null)
		{
			$this->mainModel->pingTime = date('Y-m-d H:i:s');
			$this->mainModel->save();
		}
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