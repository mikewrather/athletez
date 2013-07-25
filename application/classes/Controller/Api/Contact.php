<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Club API controller class
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

		public function action_post_add()
		{

			$this->payloadDesc = "Add a new contact info";

			$args = array(); //This will get passed to the add method

			if(trim($this->request->post('phone_cell')) != "")
			{
				$args['phone_cell'] = trim($this->request->post('phone_cell'));
			}

			if(trim($this->request->post('phone_work')) != "")
			{
				$args['phone_work'] = trim($this->request->post('phone_work'));
			}

			if((int)trim($this->request->post('users_id')) > 0)
			{
				$args['users_id'] = (int)trim($this->request->post('users_id'));
			}

			if((int)trim($this->request->post('locations_id')) > 0)
			{
				$args['locations_id'] = (int)trim($this->request->post('locations_id'));
			}

			$result =  $this->mainModel->addContact($args);

			//Check for success / error
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
			}

		}

		public function action_put_basics()
		{
			$this->payloadDesc = "Update contact info";
			$args = array(); //This will get passed to the add method

			if(trim($this->put('phone_cell')) != "")
			{
				$args['phone_cell'] = urldecode(trim($this->put('phone_cell')));
			}

			if(trim($this->put('phone_work')) != "")
			{
				$args['phone_work'] = trim($this->put('phone_work'));
			}

			if((int)trim($this->put('users_id')) > 0)
			{
				$args['users_id'] = (int)trim($this->put('users_id'));
			}

			if((int)trim($this->put('locations_id')) > 0)
			{
				$args['locations_id'] = (int)trim($this->put('locations_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['id'] = $this->mainModel->id;

			$result =  $this->mainModel->addContact($args);

			//Check for success / error
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
			}

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