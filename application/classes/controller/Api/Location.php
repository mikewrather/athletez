<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Location API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Location extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Location_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Returns basic info about this location
		 * via /api/location/basics/{locations_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Returns basic info about this location";

		
		}
		
		/**
		 * action_get_games() Returns all games that have taken place at a certain location
		 * via /api/location/games/{locations_id}
		 *
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "Returns all games that have taken place at a certain location";

		         // CHECK FOR PARAMETERS:
			// games_before 
			// Filter games associated with a given location to only show those before a given date
				
			if($this->request->post('games_before') != "")
			{
				// Format as date
				$games_before = date("Y-m-d H:i:s",strtotime($this->request->post('games_before')));
			}

			// games_after 
			// Filter games associated with a given location to only show those before a given date
				
			if($this->request->post('games_after') != "")
			{
				// Format as date
				$games_after = date("Y-m-d H:i:s",strtotime($this->request->post('games_after')));
			}

			// sports_id 
			// Filter games associated with a given location to only show those for a specific sport
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

			// complevels_id 
			// Filter games associated with a given location to only show those of a specific competition level
				
			if((int)trim($this->request->post('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->request->post('complevels_id'));
			}

			// teams_id 
			// Filter games associated with a given location to only show those for a specific team
				
			if((int)trim($this->request->post('teams_id')) > 0)
			{
				$teams_id = (int)trim($this->request->post('teams_id'));
			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new location
		 * via /api/location/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new location";

		         // CHECK FOR PARAMETERS:
			// address 
			// Street Address of the location
				
			if(trim($this->request->post('address')) != "")
			{
				$address = trim($this->request->post('address'));
			}

			// cities_id 
			// ID of the city
				
			if((int)trim($this->request->post('cities_id')) > 0)
			{
				$cities_id = (int)trim($this->request->post('cities_id'));
			}

			// states_id 
			// ID of the state
				
			if((int)trim($this->request->post('states_id')) > 0)
			{
				$states_id = (int)trim($this->request->post('states_id'));
			}

			// lon 
			// If available, the longitude of the location (For instance, if the location is picked on a map instead of entered by address)
				
			if(trim($this->request->post('lon')) != "")
			{
				$lon = trim($this->request->post('lon'));
			}

			// lat 
			// If available, the latitude of the location (For instance, if the location is picked on a map instead of entered by address)
				
			if(trim($this->request->post('lat')) != "")
			{
				$lat = trim($this->request->post('lat'));
			}

			// location_type 
			// Specify whether this is a high school, park, etc.
				
			if(trim($this->request->post('location_type')) != "")
			{
				$location_type = trim($this->request->post('location_type'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Updates basic info about this location
		 * via /api/location/basics/{locations_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Updates basic info about this location";

		         // CHECK FOR PARAMETERS:
			// address 
			// Change the address of this location
				
			if(trim($this->request->body('address')) != "")
			{
				$address = trim($this->request->body('address'));
			}

			// cities_id 
			// Change the city of the location
				
			if((int)trim($this->request->body('cities_id')) > 0)
			{
				$cities_id = (int)trim($this->request->body('cities_id'));
			}

			// lon 
			// Change the longitude of this location
				
			if(trim($this->request->body('lon')) != "")
			{
				$lon = trim($this->request->body('lon'));
			}

			// lat 
			// Change the latitude of this location
				
			if(trim($this->request->body('lat')) != "")
			{
				$lat = trim($this->request->body('lat'));
			}

			// location_type 
			// Change the location type of this location
				
			if(trim($this->request->body('location_type')) != "")
			{
				$location_type = trim($this->request->body('location_type'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  location
		 * via /api/location/base/{locations_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  location";

		
		}
		
	}