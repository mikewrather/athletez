<?php defined('SYSPATH') or die('No direct script access.');

/**
 * City API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_City extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Location_City'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a city
		 * via /api/city/basics/{cities_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a city";
			$arguments = array();
		

		}
		
		/**
		 * action_get_locations() All locations within a given city
		 * via /api/city/locations/{cities_id}
		 *
		 */
		public function action_get_locations()
		{
			$this->payloadDesc = "All locations within a given city";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// loc_type (REQUIRED)
			// Only return locations of a certain type within the given city
				
			if(trim($this->request->query('loc_type')) != "")
			{
				$arguments["loc_type"] = trim($this->request->query('loc_type'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "loc_type",
					"param_desc" => "Only return locations of a certain type within the given city"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			

		}
		
		/**
		 * action_get_orgs() All organizations within a given city
		 * via /api/city/orgs/{cities_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a given city";
			$arguments = array();
		

		}
		
		/**
		 * action_get_games() All games that take place within a city
		 * via /api/city/games/{cities_id}
		 *
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "All games that take place within a city";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// games_before 
			// Filter games associated with a given city to only show those before a given date
				
			if($this->request->query('games_before') != "")
			{
				// Format as date
				$arguments["games_before"] = date("Y-m-d H:i:s",strtotime($this->request->query('games_before')));
			}

			// games_after 
			// Filter games associated with a given city to only show those before a given date
				
			if($this->request->query('games_after') != "")
			{
				// Format as date
				$arguments["games_after"] = date("Y-m-d H:i:s",strtotime($this->request->query('games_after')));
			}

			// sports_id 
			// Filter games associated with a given city to only show those for a specific sport
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id 
			// Filter games associated with a given city to only show those of a specific competition level
				
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$arguments["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			// teams_id 
			// Filter games associated with a given city to only show those for a specific team
				
			if((int)trim($this->request->query('teams_id')) > 0)
			{
				$arguments["teams_id"] = (int)trim($this->request->query('teams_id'));
			}


		}
		
		/**
		 * action_get_search() Used to auto-narrow a list of cities based on passed parameters and partial search strings.
		 * via /api/city/search/{cities_id}
		 *
		 */
		public function action_get_search()
		{
			$this->payloadDesc = "Used to auto-narrow a list of cities based on passed parameters and partial search strings.";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// city_name (REQUIRED)
			// This is a partial string which will be used to narrow the list.  Because the cities long, no list will be returned unless at least three characters have been provided in the search string.  Searches front of string.
				
			if(trim($this->request->query('city_name')) != "")
			{
				$arguments["city_name"] = trim($this->request->query('city_name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "city_name",
					"param_desc" => "This is a partial string which will be used to narrow the list.  Because the cities long, no list will be returned unless at least three characters have been provided in the search string.  Searches front of string."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new city
		 * via /api/city/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new city";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the city to add
				
			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "name",
					"param_desc" => "Name of the city to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// states_id 
			// State the city belongs to
				
			if((int)trim($this->request->post('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->post('states_id'));
			}

			// counties_id (REQUIRED)
			// The county the city belongs to
				
			if((int)trim($this->request->post('counties_id')) > 0)
			{
				$arguments["counties_id"] = (int)trim($this->request->post('counties_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "counties_id",
					"param_desc" => "The county the city belongs to"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}