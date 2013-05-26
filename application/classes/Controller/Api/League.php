<?php defined('SYSPATH') or die('No direct script access.');

/**
 * League API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_League extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_League'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basics on a League
		 * via /api/league/basics/{leagues_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basics on a League";
			//Check for ID and end the call if there isn't one
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			return $this->mainModel;
		}
		
		/**
		 * action_get_orgs() All organizations within a League
		 * via /api/league/orgs/{leagues_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a League";
		
			//Check for ID and end the call if there isn't one
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
		 * action_post_add() Add a new League
		 * via /api/league/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new League";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the League to add

			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}

			if((int)trim($this->request->post('sections_id')) > 0)
			{
				$arguments["sections_id"] = (int)trim($this->request->post('sections_id'));
			}

			// states_id (REQUIRED)
			// The ID of the state the League belongs to

			if((int)trim($this->request->post('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->post('states_id'));
			}

			$result = $this->mainModel->addLeague($arguments);

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
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basics on a League
		 * via /api/league/basics/{leagues_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basics on a League";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the league
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = urldecode(trim($this->put('name')));
			}

			// states_id 
			// Change the state of this league
				
			if((int)trim($this->put('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->put('states_id'));
			}

			// sections_id
			// Change the Section this league belongs to

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
				$result = $this->mainModel->updateLeague($args);
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
		 * action_delete_base() Delete  League
		 * via /api/league/base/{leagues_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  League";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			if (!$this->mainModel->deleteBasic()){
				$error_array = array(
					"error" => "Leagues can't delete",
					"desc" => "Leagues can't delete, b/c already in use"
				);
				$this->modelNotSetError($error_array);
				return false;
			}
			return $this;
		}
		
	}