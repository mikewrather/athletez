<?php defined('SYSPATH') or die('No direct script access.');

/**
 * State API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_State extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Location_State'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on a given state
		 * via /api/state/basics/{states_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a given state";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}
		
		/**
		 * action_get_counties() All counties within the state
		 * via /api/state/counties/{states_id}
		 *
		 */
		public function action_get_counties()
		{
			$this->payloadDesc = "All counties within the state";
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getCountries();
		}
		
		/**
		 * action_get_divisions() All divisions within a state
		 * via /api/state/divisions/{states_id}
		 *
		 */
		public function action_get_divisions()
		{
			$this->payloadDesc = "All divisions within a state";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getDivisions();
		}
		
		/**
		 * action_get_sections() All sections within a state
		 * via /api/state/sections/{states_id}
		 *
		 */
		public function action_get_sections()
		{
			$this->payloadDesc = "All sections within a state";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getSections();
		}
		
		/**
		 * action_get_leagues() All leagues within a given state
		 * via /api/state/leagues/{states_id}
		 *
		 */
		public function action_get_leagues()
		{
			$this->payloadDesc = "All leagues within a given state";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getLeagues();
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new State
		 * via /api/state/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new State";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the state
				
			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}
			
			// countries_id (REQUIRED)
			// The country the state belongs to
				
			if((int)trim($this->request->post('countries_id')) > 0)
			{
				$args['countries_id'] = (int)trim($this->request->post('countries_id'));
			}

                $result = $this->mainModel->addState($args);
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
		
		/**
		 * action_post_addcounty() Add a county within the state
		 * via /api/state/addcounty/{states_id}
		 *
		 */
		public function action_post_addcounty()
		{
			$this->payloadDesc = "Add a county within the state";
			$args = array();
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the county to add
				
			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "name",
					"param_desc" => "The name of the county to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			$args['states_id'] = $this->mainModel->id;
			 
			$county = ORM::factory('Location_County');
            if($county->check_county_exist($args))
            {
                unset($county);
                $county = ORM::factory('Location_County');
                $result = $county->addCounty($args);
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
            } else
            {
                // Create Array for Error Data
                $error_array = array(
                    "error" => "This county already exists",
                    "param_name" => "name and state_id",
                    "param_desc" => "name and state_id"
                );

                // Set whether it is a fatal error
                $is_fatal = true;

                // Call method to throw an error
                $this->addError($error_array,$is_fatal);
            }
		}
		
		/**
		 * action_post_division() Add a division within the state
		 * via /api/state/division/{states_id}
		 *
		 */
		public function action_post_division()
		{
			$this->payloadDesc = "Add a division within the state";
			$args = array();
		    if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
		    // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the Division to add
				
			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "name",
					"param_desc" => "Name of the Division to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// sections_id 
			// The ID of the Section (if applicable)
				
			if((int)trim($this->request->post('sections_id')) > 0)
			{
				$args['sections_id'] = (int)trim($this->request->post('sections_id'));
			}
			$args['states_id'] = $this->mainModel->id;
			  
			$division = ORM::factory('Sportorg_Division');			
            
            if($division->check_division_exist($args))
            {
                unset($division);
                $division = ORM::factory('Sportorg_Division');
                $result = $division->addDivision($args);
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
            } else
            {
                // Create Array for Error Data
                $error_array = array(
                    "error" => "This division already exists",
                    "param_name" => "name and state_id",
                    "param_desc" => "name and state_id"
                );

                // Set whether it is a fatal error
                $is_fatal = true;

                // Call method to throw an error
                $this->addError($error_array,$is_fatal);
            }
		}
		
		/**
		 * action_post_section() Add a section within the state
		 * via /api/state/section/{states_id}
		 *
		 */
		public function action_post_section()
		{
			$this->payloadDesc = "Add a section within the state";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the Section to add
				
			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "name",
					"param_desc" => "Name of the Section to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// sports_id (REQUIRED)
			// The ID of the sport this section refers to
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->request->post('sports_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "sports_id",
					"param_desc" => "The ID of the sport this section refers to"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			$args['states_id'] = $this->mainModel->id; 
			$section = ORM::factory('Sportorg_Section');
			 
            if($section->check_section_exist($args))
            {
                unset($section);
                $section = ORM::factory('Sportorg_Section');
                $result = $section->addSection($args);
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
            } else
            {
                // Create Array for Error Data
                $error_array = array(
                    "error" => "This section already exists",
                    "param_name" => "name,state_id, sports_id",
                    "param_desc" => "name,state_id, sports_id"
                );

                // Set whether it is a fatal error
                $is_fatal = true;

                // Call method to throw an error
                $this->addError($error_array,$is_fatal);
            }
		}
		
		/**
		 * action_post_league() Add a league within the state
		 * via /api/state/league/{states_id}
		 *
		 */
		public function action_post_league()
		{
			$this->payloadDesc = "Add a league within the state";
			$args = array();
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['states_id'] = $this->mainModel->id; 
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the League to add
				
			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "name",
					"param_desc" => "Name of the League to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// sections_id 
			// The ID of the Section (if applicable)
				
			if((int)trim($this->request->post('sections_id')) > 0)
			{
				$args['sections_id'] = (int)trim($this->request->post('sections_id'));
			}
			$league = ORM::factory('Sportorg_League');
			 
            if($league->check_league_exist($args))
            {
                unset($league);
                $league = ORM::factory('Sportorg_League');
                $result = $league->addLeague($args);
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
            } else
            {
                // Create Array for Error Data
                $error_array = array(
                    "error" => "This league already exists",
                    "param_name" => "name,state_id, sports_id",
                    "param_desc" => "name,state_id, sports_id"
                );

                // Set whether it is a fatal error
                $is_fatal = true;

                // Call method to throw an error
                $this->addError($error_array,$is_fatal);
            }
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic info on a given state
		 * via /api/state/basics/{states_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic info on a given state";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the state
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim($this->put('name'));
			}

			// countries_id 
			// Change the country that the state exists in
				
			if((int)trim($this->put('countries_id')) > 0)
			{
				$args['countries_id'] = (int)trim($this->put('countries_id'));
			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['id'] = $this->mainModel->id;
			$result = $this->mainModel->updateState($args);

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
		 * action_delete_base() Delete  state
		 * via /api/state/base/{states_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  state";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->delete();
		}
		
	}