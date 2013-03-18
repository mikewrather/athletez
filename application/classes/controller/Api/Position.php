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

		     // CHECK FOR PARAMETERS:
			// sports_id 
			// Filter list of positions to a given sport.
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->query('sports_id'));
			}

			// users_id 
			// Filter positions to a list of all positions for a given user
				
			if((int)trim($this->request->query('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->query('users_id'));
			}

		}
		
		/**
		 * action_get_players() Retrives all players for a given position narrowed by other optional criteria
		 * via /api/position/players/{positions_id}
		 *
		 */
		public function action_get_players()
		{
			$this->payloadDesc = "Retrives all players for a given position narrowed by other optional criteria";

		     // CHECK FOR PARAMETERS:
			// orgs_id 
			// Filter the players for a given position to a specific organization
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$orgs_id = (int)trim($this->request->query('orgs_id'));
			}

			// cities_id 
			// Filter the players for a given position to players within a certain city
				
			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$cities_id = (int)trim($this->request->query('cities_id'));
			}

		}
		
		/**
		 * action_get_defaultstattab() Gets the default statistics tab to select for a given position
		 * via /api/position/defaultstattab/{positions_id}
		 *
		 */
		public function action_get_defaultstattab()
		{
			$this->payloadDesc = "Gets the default statistics tab to select for a given position";

		
		}
		
		/**
		 * action_get_sport() Gets the sport associated with a given position
		 * via /api/position/sport/{positions_id}
		 *
		 */
		public function action_get_sport()
		{
			$this->payloadDesc = "Gets the sport associated with a given position";

		
		}
		
		/**
		 * action_get_images() Gets images for players of a given position
		 * via /api/position/images/{positions_id}
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "Gets images for players of a given position";

		     // CHECK FOR PARAMETERS:
			// orgs_id 
			// Filter images to those for players who play a certain position within a specific organization.
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$orgs_id = (int)trim($this->request->query('orgs_id'));
			}

			// cities_id 
			// Filter images to players of a certain position within a certain city.
				
			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$cities_id = (int)trim($this->request->query('cities_id'));
			}

		}
		
		/**
		 * action_get_videos() Gets videos for players of a given position
		 * via /api/position/videos/{positions_id}
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Gets videos for players of a given position";

		     // CHECK FOR PARAMETERS:
			// orgs_id 
			// Filter videos to those for players who play a certain position within a specific organization.
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$orgs_id = (int)trim($this->request->query('orgs_id'));
			}

			// cities_id 
			// Filter videos to players of a certain position within a certain city.
				
			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$cities_id = (int)trim($this->request->query('cities_id'));
			}

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
			$this->payloadDesc = "Add a new position";

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the Posititon to be added
				
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
					"param_desc" => "Name of the Posititon to be added"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// sports_id 
			// Sport the position belongs to
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

			// stattab_id 
			// Default Statistics Tab to use for this position
				
			if((int)trim($this->request->post('stattab_id')) > 0)
			{
				$stattab_id = (int)trim($this->request->post('stattab_id'));
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
			$this->payloadDesc = "Update Basics properties of the position";

		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Sports Position
				
			if(trim($this->request->body('name')) != "")
			{
				$name = trim($this->request->body('name'));
			}

			// stattab_id 
			// Change the default Statistics Tab
				
			if((int)trim($this->request->body('stattab_id')) > 0)
			{
				$stattab_id = (int)trim($this->request->body('stattab_id'));
			}

			// sports_id 
			// Change the sport this position belongs to
				
			if((int)trim($this->request->body('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->body('sports_id'));
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
			$this->payloadDesc = "Delete a Sports Position";

		
		}
		
	}