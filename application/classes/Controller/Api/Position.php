<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Position API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Position extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Position'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_listall() Lists available positions.
		 * via /api/position/listall/{positions_id}
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Lists available positions.";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// sports_id 
			// Filter list of positions to a given sport.
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->request->query('sports_id'));
			}

			// users_id 
			// Filter positions to a list of all positions for a given user
				
			if((int)trim($this->request->query('users_id')) > 0)
			{
				$args['users_id'] = (int)trim($this->request->query('users_id'));
			}
			  
		 	$position = ORM::factory('Sportorg_Position');
			return $position->getListall($args);
		}
		
		/**
		 * action_get_players() Retrives all players for a given position narrowed by other optional criteria
		 * via /api/position/players/{positions_id}
		 *
		 */
		public function action_get_players()
		{
			$this->payloadDesc = "Retrives all players for a given position narrowed by other optional criteria";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// orgs_id 
			// Filter the players for a given position to a specific organization
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$args['orgs_id'] = (int)trim($this->request->query('orgs_id'));
			}

			// cities_id 
			// Filter the players for a given position to players within a certain city
				
			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$args['cities_id'] = (int)trim($this->request->query('cities_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getPlayers($args);
		}
		
		/**
		 * action_get_defaultstattab() Gets the default statistics tab to select for a given position
		 * via /api/position/defaultstattab/{positions_id}
		 *
		 */
		public function action_get_defaultstattab()
		{
			$this->payloadDesc = "Gets the default statistics tab to select for a given position";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['id'] = $this->mainModel->id;
			return $this->mainModel->getStattab($args);
		}
		
		/**
		 * action_get_sport() Gets the sport associated with a given position
		 * via /api/position/sport/{positions_id}
		 *
		 */
		public function action_get_sport()
		{
			$this->payloadDesc = "Gets the sport associated with a given position";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$args['id'] = $this->mainModel->id;
			return $this->mainModel->getSport($args);
		}
		
		/**
		 * action_get_images() Gets images for players of a given position
		 * via /api/position/images/{positions_id}
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "Gets images for players of a given position";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// orgs_id 
			// Filter images to those for players who play a certain position within a specific organization.
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$args['orgs_id'] = (int)trim($this->request->query('orgs_id'));
			}

			// cities_id 
			// Filter images to players of a certain position within a certain city.
				
			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$args['cities_id'] = (int)trim($this->request->query('cities_id'));
			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['type'] = 'image';
			return $this->mainModel->getMedia($args);
		}
		
		/**
		 * action_get_videos() Gets videos for players of a given position
		 * via /api/position/videos/{positions_id}
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Gets videos for players of a given position";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// orgs_id 
			// Filter videos to those for players who play a certain position within a specific organization.
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$args['orgs_id'] = (int)trim($this->request->query('orgs_id'));
			}

			// cities_id 
			// Filter videos to players of a certain position within a certain city.
				
			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$args['cities_id'] = (int)trim($this->request->query('cities_id'));
			}
			$args['type'] = 'video';
			return $this->mainModel->getMedia($args);
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new position
		 * via /api/position/add/{0}
		 *
		 */
		public function action_post_add()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Add a new position";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the Posititon to be added
				
			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}

			// sports_id 
			// Sport the position belongs to
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->request->post('sports_id'));
			}

			// stattab_id 
			// Default Statistics Tab to use for this position
				
			if((int)trim($this->request->post('stattab_id')) > 0)
			{
				$args['stattab_id'] = (int)trim($this->request->post('stattab_id'));
			}
			
			$position_obj = ORM::factory("Sportorg_Position");
			$result = $position_obj->addPosition($args);
			if(get_class($result) == get_class($position_obj))
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
		 * action_put_basics() Update Basics properties of the position
		 * via /api/position/basics/{positions_id}
		 *
		 */
		public function action_put_basics()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Update Basics properties of the position";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Sports Position
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim(urldecode($this->put('name')));
			}

			// stattab_id 
			// Change the default Statistics Tab
				
			if((int)trim($this->put('stattab_id')) > 0)
			{
				$args['stattab_id'] = (int)trim($this->put('stattab_id'));
			}

			// sports_id 
			// Change the sport this position belongs to
				
			if((int)trim($this->put('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->put('sports_id'));
			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$result = $this->mainModel->updatePosition($args);
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
		 * action_delete_base() Delete a Sports Position
		 * via /api/position/base/{positions_id}
		 *
		 */
		public function action_delete_base()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Delete a Sports Position";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->delete();
		
		}
		
	}