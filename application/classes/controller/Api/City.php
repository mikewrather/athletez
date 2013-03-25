<?php defined('SYSPATH') or die('No direct script access.');

/**
 * City API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
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

		
		}
		
		/**
		 * action_get_locations() All locations within a given city
		 * via /api/city/locations/{cities_id}
		 *
		 */
		public function action_get_locations()
		{
			$this->payloadDesc = "All locations within a given city";

			$locations = ORM::factory('Location_Base')->where('cities_id','=',$this->myID);

			// CHECK FOR PARAMETERS:
			// loc_type (REQUIRED)
			// Only return locations of a certain type within the given city

			if(trim($this->request->query('loc_type')) != "")
			{
				$loc_type = trim($this->request->query('loc_type'));
				$locations->where('location_type','=',$loc_type);
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
			}

			return $locations;
		}
		
		/**
		 * action_get_orgs() All organizations within a given city
		 * via /api/city/orgs/{cities_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a given city";

		
		}

		/**
		 * action_get_games() All games that take place within a city
		 * via /api/city/games/{cities_id}
		 *
		 * @return object DB expression retrieved from the getGames method
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "All games that take place within a city";

			//Check for ID and end the call if there isn't one
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			// This will be passed to the getGames() method of the org object.
			$args = array();

		     // CHECK FOR PARAMETERS:

			// games_before 
			// Filter games associated with a given city to only show those before a given date
			if(trim($this->request->query('games_before')) != "")
			{
				$args["games_before"] = trim($this->request->query('games_before'));
			}

			// games_after 
			// Filter games associated with a given city to only show those before a given date
			if(trim($this->request->query('games_after')) != "")
			{
				$args["games_after"] = trim($this->request->query('games_after'));
			}

			// sports_id 
			// Filter games associated with a given city to only show those for a specific sport
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id 
			// Filter games associated with a given city to only show those of a specific competition level
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$args['complevels_id'] = (int)trim($this->request->query('complevels_id'));
			}

			// teams_id 
			// Filter games associated with a given city to only show those for a specific team
			if((int)trim($this->request->query('teams_id')) > 0)
			{
				$args['teams_id'] = (int)trim($this->request->query('teams_id'));
			}

			$games = $this->mainModel->getGames($args);
			return $games;

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

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the city to add
				
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
					"param_desc" => "Name of the city to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// states_id 
			// State the city belongs to
				
			if((int)trim($this->request->post('states_id')) > 0)
			{
				$states_id = (int)trim($this->request->post('states_id'));
			}

			// counties_id (REQUIRED)
			// The county the city belongs to
				
			if((int)trim($this->request->post('counties_id')) > 0)
			{
				$counties_id = (int)trim($this->request->post('counties_id'));
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

			}
			
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}