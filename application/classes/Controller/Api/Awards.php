<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Club API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Awards extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Awards'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}

		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a awards";

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

			$this->payloadDesc = "Add a new award";

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

			if(trim($this->request->post('description')) != "")
			{
				$args['description'] = trim($this->request->post('description'));
			}

			$result =  $this->mainModel->addAwards($args);

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
			$this->payloadDesc = "Update awards";
			$args = array(); //This will get passed to the add method

			if(trim($this->put('name')) != "")
			{
				$args['name'] = urldecode(trim($this->put('name')));
			}

			if(trim($this->put('description')) != "")
			{
				$args['description'] = urldecode(trim($this->put('description')));
			}

			if((int)trim($this->put('users_id')) > 0)
			{
				$args['users_id'] = (int)trim($this->put('users_id'));
			}

			if((int)trim($this->put('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->put('sports_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['id'] = $this->mainModel->id;

			$result =  $this->mainModel->addAwards($args);

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

		public function action_delete_basics()
		{
			$this->payloadDesc = "Delete award";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$this->mainModel->delete();

		}

	}