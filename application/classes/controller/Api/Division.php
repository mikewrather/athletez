<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Division API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Division extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Division'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a division
		 * via /api/division/basics/{divisions_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a division";

		
		}
		
		/**
		 * action_get_orgs() Returns all organizations within with a certain division
		 * via /api/division/orgs/{divisions_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "Returns all organizations within with a certain division";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new Division
		 * via /api/division/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Division";
			$division_obj = ORM::factory('Sportorg_Division');
			$name = trim($this->request->post('name'));

			$states_id = (int)trim($this->request->post('states_id'));

			$sections_id = (int)trim($this->request->post('sections_id'));

			$division_obj->name = $name;
			$division_obj->states_id = $states_id;
			$division_obj->sections_id = $sections_id;

			//add validation & save logics here
			$division_validate = Validation::factory($division_obj->as_array())
				->rule('name', 'not_empty')
				->rule('states_id', 'not_equals', array(':value', 0))
				->rule('sections_id', 'not_equals', array(':value', 0));

			if (!$division_validate->check()){
				$validate_errors = $division_validate->errors('models/sportorg/division');
				$error_array = array(
					"error" => implode('\n', $validate_errors),
					"param_name" => "name",
					"param_desc" => "Name of the County to add"
				);
				// Set whether it is a fatal error
				$is_fatal = true;
				$this->addError($error_array, $is_fatal);
				return $division_obj;
			}
			$division_obj->save();
			return $division_obj;
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information about a division
		 * via /api/division/basics/{divisions_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about a division";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the division
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim($this->put('name'));
			}

			// states_id 
			// Change the state of this division
				
			if((int)trim($this->put('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->put('states_id'));
			}

			// sections_id 
			// Change the Section this division belongs to
				
			if((int)trim($this->put('sections_id')) > 0)
			{
				$args['sections_id'] = (int)trim($this->put('sections_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->updateDivision($args);
		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  division
		 * via /api/division/base/{divisions_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  division";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->deleteDivision();
		
		}
		
	}