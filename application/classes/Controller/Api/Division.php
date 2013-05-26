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

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel; 
		}
		
		/**
		 * action_get_orgs() Returns all organizations within with a certain division
		 * via /api/division/orgs/{divisions_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "Returns all organizations within with a certain division";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getOrgs();
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
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the Division to add

			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}

			// states_id (REQUIRED)
			// ID of the state this division belongs to

			if((int)trim($this->request->post('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->post('states_id'));
			}

			// sections_id
			// The ID of the Section this division belongs to (if applicable)

			if((int)trim($this->request->post('sections_id')) > 0)
			{
				$arguments["sections_id"] = (int)trim($this->request->post('sections_id'));
			}

			$division = ORM::factory('Sportorg_Division');
			$result = $division->addDivision($arguments);
			if(get_class($result) == get_class($division))
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
				$args['name'] = trim(urldecode($this->put('name')));
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
			$args['id'] = $this->mainModel->id;
			$result = $this->mainModel->updateDivision($args);

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