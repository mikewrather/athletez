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
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}
		
		/**
		 * action_get_listall() Retrives a list of all sports narrowed by a number of optional criteria
		 * via /api/sport/listall/{sports_id}
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Retrives a list of all sports narrowed by a number of optional criteria";

//			if(!$this->mainModel->id)
//			{
//				$this->modelNotSetError();
//				return false;
//			}
			$args['id'] = $this->mainModel->id;
			return $this->mainModel->getListall($args);
		}
		
		/**
		 * action_get_positions() Lists all positions for a given sport
		 * via /api/sport/positions/{sports_id}
		 *
		 */
		public function action_get_positions()
		{
			$this->payloadDesc = "Lists all positions for a given sport";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getPositions();
		}
		
		/**
		 * action_get_type() Get the type of sport
		 * via /api/sport/type/{sports_id}
		 *
		 */
		public function action_get_type()
		{
			$this->payloadDesc = "Get the type of sport";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getSportType();
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

			$args['users_id'] = $users_id;
			$args['seasons_id'] = $seasons_id;
			$args['complevels_id'] = $complevels_id;

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel->getVideos($args);


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

			$args['users_id'] = $users_id;
			$args['seasons_id'] = $seasons_id;
			$args['complevels_id'] = $complevels_id;

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel->getImages($args);


		}
		
		/**
		 * action_get_resumedata() Retrieves resume data related to the sport
		 * via /api/sport/resumedata/{sports_id}
		 *
		 */
		public function action_get_resumedata()
		{
			$this->payloadDesc = "Retrieves resume data related to the sport";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// users_id
			// Filter resume data associated with a given sport to a specific user

			if((int)trim($this->request->query('users_id')) > 0)
			{
				$arguments["users_id"] = (int)trim($this->request->query('users_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$arguments['sports_id'] = $this->mainModel->id;
			return $this->mainModel->getResumeData($arguments);
		}
		
		/**
		 * action_get_statistics() Gets statistics associated with a given sport
		 * via /api/sport/statistics/{sports_id}
		 *
		 */
		public function action_get_statistics()
		{
			$this->payloadDesc = "Gets statistics associated with a given sport";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getStat();
		}
		
		/**
		 * action_get_stattabs() Gets the statistics tabs for a given sport
		 * via /api/sport/stattabs/{sports_id}
		 *
		 */
		public function action_get_stattabs()
		{
			$this->payloadDesc = "Gets the statistics tabs for a given sport";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getStatTabs();
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

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$args['orgs_id'] = $orgs_id;
			$args['teams_id'] = $teams_id;
			$args['seasons_id'] = $seasons_id;
			$args['positions_id'] = $positions_id;
			$args['complevels_id'] = $complevels_id;

			return $this->mainModel->getAthletes($args);
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

			if($this->request->post('male') != "")
			{
				//convert male to a boolean
				$male = Util::convert_to_boolean($this->request->post('male'));
			}

			// female 
			// True if sport is for women
				
			if($this->request->post('female') != "")
			{
				//convert female to a boolean
				$female = Util::convert_to_boolean($this->request->post('female'));
			}

			// sporttype 
			// ID of the Sport Type
				
			if((int)trim($this->request->post('sporttype')) > 0)
			{
				$sporttype = (int)trim($this->request->post('sporttype'));
			}
			$args['name'] = $name;
			$args['male'] = $male;
			$args['female'] = $female;
			$args['sport_type_id'] = $sporttype;
			$result = $this->mainModel->addSport($args);
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
		
		/**
		 * action_post_position() Add a new position for a given sport
		 * via /api/sport/position/{sports_id}
		 *
		 */
		public function action_post_position()
		{
			$this->payloadDesc = "Add a new position for a given sport";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// name
			// Name of the position to add

			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}

			// stattab_id
			// ID of the default statistics tab for the position

			if((int)trim($this->request->post('stattab_id')) > 0)
			{
				$arguments["stattab_id"] = (int)trim($this->request->post('stattab_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$arguments['sports_id'] = $this->mainModel->id;

			$position_model = ORM::factory("Sportorg_Position");

			$result = $position_model->addPosition($arguments);

			if(get_class($result) == get_class($result))
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
		 * action_put_basics() Update basic information about a sport
		 * via /api/sport/basics/{sports_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about a sport";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of this sport
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim(urldecode($this->put('name')));
			}

			// male 
			// Update whether men can compete in this sport
				
			if($this->put('male') != "")
			{
				//convert male to a boolean
				$args['male'] = Util::convert_to_boolean($this->put('male'));
			}

			// female 
			// Update whether women can compete in this sport
				
			if($this->put('female') != "")
			{
				//convert female to a boolean
				$args['female'] = Util::convert_to_boolean($this->put('female'));
			}

			// sport_type_id 
			// Change the Sport Type ID for this sport
				
			if((int)trim($this->put('sport_type_id')) > 0)
			{
				$args['sport_type_id'] = (int)trim($this->put('sport_type_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$result = $this->mainModel->updateSport($args);
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
				
			if((int)trim($this->put('sport_type_id')) > 0)
			{
				$sport_type_id = (int)trim($this->put('sport_type_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$result = $this->mainModel->updateType($sport_type_id);
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
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Sport Data";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->delete();			
		}
		
	}