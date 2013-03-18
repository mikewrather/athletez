<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Sport API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Sport extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Sport'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Provides basic information about a sport
		 * via /api/sport/basics/{sports_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Provides basic information about a sport";

		
		}
		
		/**
		 * action_get_listall() Retrives a list of all sports narrowed by a number of optional criteria
		 * via /api/sport/listall/{sports_id}
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Retrives a list of all sports narrowed by a number of optional criteria";

		
		}
		
		/**
		 * action_get_positions() Lists all positions for a given sport
		 * via /api/sport/positions/{sports_id}
		 *
		 */
		public function action_get_positions()
		{
			$this->payloadDesc = "Lists all positions for a given sport";

		
		}
		
		/**
		 * action_get_type() Get the type of sport
		 * via /api/sport/type/{sports_id}
		 *
		 */
		public function action_get_type()
		{
			$this->payloadDesc = "Get the type of sport";

		
		}
		
		/**
		 * action_get_videos() Videos associated with a given sport
		 * via /api/sport/videos/{sports_id}
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Videos associated with a given sport";

		     // CHECK FOR PARAMETERS:
			// users_id 
			// Filter videos associated with a sport to a certain user
				
			if((int)trim($this->request->query('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->query('users_id'));
			}

			// seasons_id 
			// Filter videos associated with a sport to a specific season
				
			if((int)trim($this->request->query('seasons_id')) > 0)
			{
				$seasons_id = (int)trim($this->request->query('seasons_id'));
			}

			// complevels_id 
			// Filter videos associated with a sport to a specific competition level
				
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->request->query('complevels_id'));
			}

		}
		
		/**
		 * action_get_images() Images associated with a given sport
		 * via /api/sport/images/{sports_id}
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "Images associated with a given sport";

		     // CHECK FOR PARAMETERS:
			// users_id 
			// Filter images associated with a sport to a certain user
				
			if((int)trim($this->request->query('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->query('users_id'));
			}

			// seasons_id 
			// Filter images associated with a sport to a specific season
				
			if((int)trim($this->request->query('seasons_id')) > 0)
			{
				$seasons_id = (int)trim($this->request->query('seasons_id'));
			}

			// complevels_id 
			// Filter images associated with a sport to a specific competition level
				
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->request->query('complevels_id'));
			}

		}
		
		/**
		 * action_get_resumedata() Retrieves resume data related to the sport
		 * via /api/sport/resumedata/{sports_id}
		 *
		 */
		public function action_get_resumedata()
		{
			$this->payloadDesc = "Retrieves resume data related to the sport";

		     // CHECK FOR PARAMETERS:
			// users_id 
			// Filter resume data associated with a given sport to a specific user
				
			if((int)trim($this->request->query('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->query('users_id'));
			}

		}
		
		/**
		 * action_get_statistics() Gets statistics associated with a given sport
		 * via /api/sport/statistics/{sports_id}
		 *
		 */
		public function action_get_statistics()
		{
			$this->payloadDesc = "Gets statistics associated with a given sport";

		
		}
		
		/**
		 * action_get_stattabs() Gets the statistics tabs for a given sport
		 * via /api/sport/stattabs/{sports_id}
		 *
		 */
		public function action_get_stattabs()
		{
			$this->payloadDesc = "Gets the statistics tabs for a given sport";

		
		}
		
		/**
		 * action_get_users() Gets all users for a given sport
		 * via /api/sport/users/{sports_id}
		 *
		 */
		public function action_get_users()
		{
			$this->payloadDesc = "Gets all users for a given sport";

		     // CHECK FOR PARAMETERS:
			// orgs_id 
			// Filter users associated with a given sport to a specific organization
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$orgs_id = (int)trim($this->request->query('orgs_id'));
			}

			// teams_id 
			// Filter users associated with a given sport to a specific team
				
			if((int)trim($this->request->query('teams_id')) > 0)
			{
				$teams_id = (int)trim($this->request->query('teams_id'));
			}

			// seasons_id 
			// Filter users associated with a given sport to a specific season
				
			if((int)trim($this->request->query('seasons_id')) > 0)
			{
				$seasons_id = (int)trim($this->request->query('seasons_id'));
			}

			// positions_id 
			// Filter users associated with a given sport to a specific position
				
			if((int)trim($this->request->query('positions_id')) > 0)
			{
				$positions_id = (int)trim($this->request->query('positions_id'));
			}

			// complevels_id 
			// Filter users associated with a given sport to a specific competition level
				
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->request->query('complevels_id'));
			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new Sport
		 * via /api/sport/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Sport";

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the Sport to add
				
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
					"param_desc" => "Name of the Sport to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// male 
			// True if this sport is for men
				
			if($this->request->post('male') != "")
			{
				//convert male to a boolean
				$male = (bool)$this->request->post('male');
			}

			// female 
			// True if sport is for women
				
			if($this->request->post('female') != "")
			{
				//convert female to a boolean
				$female = (bool)$this->request->post('female');
			}

			// sporttype 
			// ID of the Sport Type
				
			if((int)trim($this->request->post('sporttype')) > 0)
			{
				$sporttype = (int)trim($this->request->post('sporttype'));
			}

		}
		
		/**
		 * action_post_position() Add a new position for a given sport
		 * via /api/sport/position/{sports_id}
		 *
		 */
		public function action_post_position()
		{
			$this->payloadDesc = "Add a new position for a given sport";

		     // CHECK FOR PARAMETERS:
			// name 
			// Name of the position to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			// stattab_id 
			// ID of the default statistics tab for the position
				
			if((int)trim($this->request->post('stattab_id')) > 0)
			{
				$stattab_id = (int)trim($this->request->post('stattab_id'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information about a sport
		 * via /api/sport/basics/{sports_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about a sport";

		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of this sport
				
			if(trim($this->request->body('name')) != "")
			{
				$name = trim($this->request->body('name'));
			}

			// male 
			// Update whether men can compete in this sport
				
			if($this->request->body('male') != "")
			{
				//convert male to a boolean
				$male = (bool)$this->request->body('male');
			}

			// female 
			// Update whether women can compete in this sport
				
			if($this->request->body('female') != "")
			{
				//convert female to a boolean
				$female = (bool)$this->request->body('female');
			}

			// sport_type_id 
			// Change the Sport Type ID for this sport
				
			if((int)trim($this->request->body('sport_type_id')) > 0)
			{
				$sport_type_id = (int)trim($this->request->body('sport_type_id'));
			}

		}
		
		/**
		 * action_put_type() Update the type of sport
		 * via /api/sport/type/{sports_id}
		 *
		 */
		public function action_put_type()
		{
			$this->payloadDesc = "Update the type of sport";

		     // CHECK FOR PARAMETERS:
			// sport_type_id 
			// Change the sport type ID
				
			if((int)trim($this->request->body('sport_type_id')) > 0)
			{
				$sport_type_id = (int)trim($this->request->body('sport_type_id'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}