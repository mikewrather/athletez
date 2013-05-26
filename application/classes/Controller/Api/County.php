<?php defined('SYSPATH') or die('No direct script access.');

/**
 * County API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_County extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Location_County'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on a county
		 * via /api/county/basics/{counties_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a county";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		
		}
		
		/**
		 * action_get_cities() All cities within a given county
		 * via /api/county/cities/{counties_id}
		 *
		 */
		public function action_get_cities()
		{
			$this->payloadDesc = "All cities within a given county";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getCities();
		}
		
		/**
		 * action_get_orgs() All organizations within a given county
		 * via /api/county/orgs/{counties_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a given county";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$county_id = $this->mainModel->id;
			return $this->mainModel->getOrgs($county_id);
		}
		
		/**
		 *
		 * I'm going to remove this method from the code.  I'll make a note in the documentation. -mike
		 *
		 * action_get_games() All games that take place within a county
		 * via /api/county/games/{counties_id}
		 *
		 */
		/*
		public function action_get_games()
		{
			$this->payloadDesc = "All games that take place within a county";

		     // CHECK FOR PARAMETERS:
			// games_before 
			// Filter games associated with a given county to only show those before a given date
				
			if($this->request->query('games_before') != "")
			{
				// Format as date
				$games_before = date("Y-m-d H:i:s",strtotime($this->request->query('games_before')));
			}

			// games_after 
			// Filter games associated with a given county to only show those before a given date
				
			if($this->request->query('games_after') != "")
			{
				// Format as date
				$games_after = date("Y-m-d H:i:s",strtotime($this->request->query('games_after')));
			}

			// sports_id 
			// Filter games associated with a given county to only show those for a specific sport
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id 
			// Filter games associated with a given county to only show those of a specific competition level
				
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->request->query('complevels_id'));
			}

			// teams_id 
			// Filter games associated with a given county to only show those for a specific team
				
			if((int)trim($this->request->query('teams_id')) > 0)
			{
				$teams_id = (int)trim($this->request->query('teams_id'));
			}

		}
		*/
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new County
		 * via /api/county/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new County";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the County to add

			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}

			if((int)trim($this->request->post('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->post('states_id'));
			}

			$result = $this->mainModel->addCounty($arguments);
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
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic info on a county
		 * via /api/county/basics/{counties_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic info on a county";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the County
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = urldecode(trim($this->put('name')));
			}

			// states_id 
			// Change the State this County exists in
				
			if((int)trim($this->put('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->put('states_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
				$args['id'] = $this->mainModel->id;

				$result = $this->mainModel->updateCounty($args);
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
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  county
		 * via /api/county/base/{counties_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  county";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->delete();
			
		}
		
	}