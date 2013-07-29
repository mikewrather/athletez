<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Contact API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Contact extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Contact'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}

		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a contact info";

			//Check for ID and end the call if there isn't one
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}





		public function action_delete_base()
		{
			$this->payloadDesc = "Delete contact info";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel->delete();
		}

	}