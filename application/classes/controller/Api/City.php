<?php defined('SYSPATH') or die('No direct script access.');

/**
 * City API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
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

		         // CHECK FOR PARAMETERS:
			// loc_type 
			// Only return locations of a certain type within the given city
				
			if((int)trim($this->request->post('loc_type')) > 0)
			{
				$loc_type = (int)trim($this->request->post('loc_type'));
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

		
		}
		
		/**
		 * action_get_games() All games that take place within a city
		 * via /api/city/games/{cities_id}
		 *
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "All games that take place within a city";

		         // CHECK FOR PARAMETERS:
			// games_before 
			// Filter games associated with a given city to only show those before a given date
				
			if($this->request->post('games_before') != "")
			{
				// Format as date
				$games_before = date("Y-m-d H:i:s",strtotime($this->request->post('games_before')));
			}

			// games_after 
			// Filter games associated with a given city to only show those before a given date
				
			if($this->request->post('games_after') != "")
			{
				// Format as date
				$games_after = date("Y-m-d H:i:s",strtotime($this->request->post('games_after')));
			}

			// sports_id 
			// Filter games associated with a given city to only show those for a specific sport
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

			// complevels_id 
			// Filter games associated with a given city to only show those of a specific competition level
				
			if((int)trim($this->request->post('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->request->post('complevels_id'));
			}

			// teams_id 
			// Filter games associated with a given city to only show those for a specific team
				
			if((int)trim($this->request->post('teams_id')) > 0)
			{
				$teams_id = (int)trim($this->request->post('teams_id'));
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

		         // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the city to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
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
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}