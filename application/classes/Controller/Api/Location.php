<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Location API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
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

			//Check for ID and end the call if there isn't one
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}
		
		/**
		 * action_get_games() Returns all games that have taken place at a certain location
		 * via /api/location/games/{locations_id}
		 *
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "Returns all games that have taken place at a certain location";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// games_before
			// Filter games associated with a given location to only show those before a given date
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if($this->request->query('games_before') != "")
			{
				// Format as date
				$arguments["games_before"] = date("Y-m-d H:i:s",strtotime($this->request->query('games_before')));
			}

			// games_after
			// Filter games associated with a given location to only show those before a given date

			if($this->request->query('games_after') != "")
			{
				// Format as date
				$arguments["games_after"] = date("Y-m-d H:i:s",strtotime($this->request->query('games_after')));
			}

			// sports_id
			// Filter games associated with a given location to only show those for a specific sport

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id
			// Filter games associated with a given location to only show those of a specific competition level

			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$arguments["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			// teams_id
			// Filter games associated with a given location to only show those for a specific team

			if((int)trim($this->request->query('teams_id')) > 0)
			{
				$arguments["teams_id"] = (int)trim($this->request->query('teams_id'));
			}

			if((int)trim($this->request->query('display_qty')) > 0)
			{
				$arguments["limit"] = (int)trim($this->request->query('display_qty'));
			}

			return $this->mainModel->getGames($arguments);
		}

		/**
		 * action_get_search()
		 * via /api/location/search/{locations_id}
		 *
		 */
		public function action_get_search()
		{
			$this->payloadDesc = "";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// search_text
			// This will search cities, states, and location addresses

			if(trim($this->request->query('search_text')) != "")
			{
				$arguments["search_text"] = trim($this->request->query('search_text'));
			}

			if(trim($this->request->query('searchtext')) != "")
			{
				$arguments["search_text"] = trim($this->request->query('searchtext'));
			}

			// states_id
			//

			if((int)trim($this->request->query('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->query('states_id'));
			}

			// cities_id
			//

			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$arguments["cities_id"] = (int)trim($this->request->query('cities_id'));
			}

			$result = $this->mainModel->search($arguments);
			return $result;

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
			//Must logged user can do action
			if (!$this->is_logged_user()){
				return $this->throw_authentication_error();
			}

			$this->payloadDesc = "Add a new location";
			$args = array(); //This will get passed to the add method
		    
		    // CHECK FOR PARAMETERS:
			// address 
			// Street Address of the location
				

			if(trim($this->request->post('address')) != "")
			{
				$args['address'] = trim($this->request->post('address'));
			}

			// cities_id 
			// ID of the city
				
			if((int)trim($this->request->post('cities_id')) > 0)
			{
				$args['cities_id'] = (int)trim($this->request->post('cities_id'));
			}

			// states_id 
			// ID of the state
				
			if((int)trim($this->request->post('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->request->post('states_id'));
			}

			// lon 
			// If available, the longitude of the location (For instance, if the location is picked on a map instead of entered by address)
				
			if(trim($this->request->post('lon')) != "")
			{
				$args['lon'] = trim($this->request->post('lon'));
			}

			// lat 
			// If available, the latitude of the location (For instance, if the location is picked on a map instead of entered by address)
				
			if(trim($this->request->post('lat')) != "")
			{
				$args['lat'] = trim($this->request->post('lat'));
			}

			// location_type 
			// Specify whether this is a high school, park, etc.
				
			if(trim($this->request->post('location_type')) != "")
			{
				$args['location_type'] = trim($this->request->post('location_type'));
			}

			if(trim($this->request->post('zip')) != "")
			{
				$args['zip'] = trim($this->request->post('zip'));
			}

			$location_obj = ORM::factory("Location_Base");

			$result = $location_obj->addLocation($args);
			
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(is_subclass_of($result,'Kohana_Exception'))
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
		 * action_put_basics() Updates basic info about this location
		 * via /api/location/basics/{locations_id}
		 *
		 */
		public function action_put_basics()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Updates basic info about this location";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// address 
			// Change the address of this location
				
			if(trim($this->put('address')) != "")
			{
				$args['address'] = urldecode(trim($this->put('address')));
			}

			// cities_id 
			// Change the city of the location
				
			if((int)trim($this->put('cities_id')) > 0)
			{
				$args['cities_id'] = (int)trim($this->put('cities_id'));
			}

			// lon 
			// Change the longitude of this location
				
			if(trim($this->put('lon')) != "")
			{
				$args['lon'] = trim($this->put('lon'));
			}

			// lat 
			// Change the latitude of this location
				
			if(trim($this->put('lat')) != "")
			{
				$args['lat'] = trim($this->put('lat'));
			}

			// location_type 
			// Change the location type of this location
				
			if(trim($this->put('location_type')) != "")
			{
				$args['location_type'] = urldecode(trim($this->put('location_type')));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['id'] = $this->mainModel->id;

			$result = $this->mainModel->updateLocation($args);
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
		 * action_delete_base() Delete  location
		 * via /api/location/base/{locations_id}
		 *
		 */
		public function action_delete_base()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Delete location";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$this->mainModel->delete_with_deps();
		}
		
	}