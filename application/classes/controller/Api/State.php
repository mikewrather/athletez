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

		
		}
		
		/**
		 * action_get_counties() All counties within the state
		 * via /api/state/counties/{states_id}
		 *
		 */
		public function action_get_counties()
		{
			$this->payloadDesc = "All counties within the state";

		
		}
		
		/**
		 * action_get_divisions() All divisions within a state
		 * via /api/state/divisions/{states_id}
		 *
		 */
		public function action_get_divisions()
		{
			$this->payloadDesc = "All divisions within a state";

		
		}
		
		/**
		 * action_get_sections() All sections within a state
		 * via /api/state/sections/{states_id}
		 *
		 */
		public function action_get_sections()
		{
			$this->payloadDesc = "All sections within a state";

		
		}
		
		/**
		 * action_get_leagues() All leagues within a given state
		 * via /api/state/leagues/{states_id}
		 *
		 */
		public function action_get_leagues()
		{
			$this->payloadDesc = "All leagues within a given state";

		
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

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "name",
					"param_desc" => "The name of the state"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// countries_id (REQUIRED)
			// The country the state belongs to
				
			if((int)trim($this->request->post('countries_id')) > 0)
			{
				$args['countries_id'] = (int)trim($this->request->post('countries_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "countries_id",
					"param_desc" => "The country the state belongs to"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			$state = ORM::factory('Location_State');
			return $state->addState($args);
			
		}
		
		/**
		 * action_post_addcounty() Add a county within the state
		 * via /api/state/addcounty/{states_id}
		 *
		 */
		public function action_post_addcounty()
		{
			$this->payloadDesc = "Add a county within the state";

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the county to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
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
			
		}
		
		/**
		 * action_post_division() Add a division within the state
		 * via /api/state/division/{states_id}
		 *
		 */
		public function action_post_division()
		{
			$this->payloadDesc = "Add a division within the state";

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the Division to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
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
				$sections_id = (int)trim($this->request->post('sections_id'));
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

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the Section to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
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
				$sports_id = (int)trim($this->request->post('sports_id'));
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
			
		}
		
		/**
		 * action_post_league() Add a league within the state
		 * via /api/state/league/{states_id}
		 *
		 */
		public function action_post_league()
		{
			$this->payloadDesc = "Add a league within the state";

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the League to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
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
				$sections_id = (int)trim($this->request->post('sections_id'));
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

		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the state
				
			if(trim($this->put('name')) != "")
			{
				$name = trim($this->put('name'));
			}

			// countries_id 
			// Change the country that the state exists in
				
			if((int)trim($this->put('countries_id')) > 0)
			{
				$countries_id = (int)trim($this->put('countries_id'));
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

		
		}
		
	}