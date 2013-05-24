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

			//Check for ID and end the call if there isn't one
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}
		
		/**
		 * action_get_locations() All locations within a given city
		 * via /api/city/locations/{cities_id}
		 *
		 */
		public function action_get_locations()
		{
			$this->payloadDesc = "All locations within a given city optionally filtered by location type";

			//Check for ID and end the call if there isn't one
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			// Set up arguments array to be passed
			$args = array();

			// CHECK FOR PARAMETERS:
			// loc_type (REQUIRED)
			// Only return locations of a certain type within the given city

			if(trim($this->request->query('loc_type')) != "")
			{
				$args['loc_type'] = trim($this->request->query('loc_type'));
				//make sure all the location type are in enum values
				if (!Valid::location_type_exist($args['loc_type'])){
					$error = array(
						"error" => "Invalid location type",
						"desc" => "Location type should be 'High School' or 'Park' or 'Other'"
					);
					$this->modelNotSetError($error);
					return false;
				}
			}
			$locations = $this->mainModel->getLocations($args);
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
			//Check for ID and end the call if there isn't one
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel->getOrgs();
		
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

			if (isset($arguments['city_name'])){
				if (!strlen($arguments['city_name'])>= 3){
					$error = array(
						"error" => "Invalid city name",
						"desc" => "City name must at least have 3 characters"
					);
					$this->modelNotSetError($error);
					return false;
				}
			}

			$cities = $this->mainModel->getCities($arguments);
			return $cities;
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

			$args = array(); //This will get passed to the add method

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the city to add
			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}

			// states_id
			// State the city belongs to
			/*
			if((int)trim($this->request->post('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->request->post('states_id'));
			}
			*/

			// counties_id (REQUIRED)
			// The county the city belongs to
			if((int)trim($this->request->post('counties_id')) > 0)
			{
				$args['counties_id'] = (int)trim($this->request->post('counties_id'));
			}

			$result =  $this->mainModel->addCity($args);

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
	}