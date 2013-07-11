<?php defined('SYSPATH') or die('No direct script access.');

/**
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_References extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_References'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}

		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about references";

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

			$this->payloadDesc = "Add a new reference";

			$args = array(); //This will get passed to the add method

			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}

			if((int)trim($this->request->post('users_id')) > 0)
			{
				$args['users_id'] = (int)trim($this->request->post('users_id'));
			}

			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->request->post('sports_id'));
			}

			if(trim($this->request->post('phone')) != "")
			{
				$args['phone'] = trim($this->request->post('phone'));
			}

			if(trim($this->request->post('email')) != "")
			{
				$args['email'] = trim($this->request->post('email'));
			}

			if(trim($this->request->post('relation')) != "")
			{
				$args['relation'] = trim($this->request->post('relation'));
			}

			if(trim($this->request->post('long_description')) != "")
			{
				$args['long_description'] = trim($this->request->post('long_description'));
			}

			$result =  $this->mainModel->addReferences($args);

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
			$this->payloadDesc = "Update reference";
			$args = array(); //This will get passed to the add method

			if(trim($this->put('name')) != "")
			{
				$args['name'] = urldecode(trim($this->put('name')));
			}

			if(trim($this->put('long_description')) != "")
			{
				$args['long_description'] = urldecode(trim($this->put('long_description')));
			}

			if((int)trim($this->put('users_id')) > 0)
			{
				$args['users_id'] = (int)trim($this->put('users_id'));
			}

			if((int)trim($this->put('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->put('sports_id'));
			}

			if(trim($this->put('phone')) != "")
			{
				$args['phone'] = urldecode(trim($this->put('phone')));
			}

			if(trim($this->put('email')) != "")
			{
				$args['email'] = trim($this->put('email'));
			}

			if(trim($this->put('relation')) != "")
			{
				$args['relation'] = urldecode(trim($this->put('relation')));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['id'] = $this->mainModel->id;

			$result =  $this->mainModel->addReferences($args);

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
			$this->payloadDesc = "Delete reference";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel->delete();
		}

	}