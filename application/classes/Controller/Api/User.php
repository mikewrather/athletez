<?php defined('SYSPATH') or die('No direct script access.');

/**
 * User API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_User extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about the user.
		 * via /api/user/basics/{users_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about the user.";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel; 
		}
		
		/**
		 * action_get_teams() List of teams the user is associated with
		 * via /api/user/teams/{users_id}
		 *
		 */
		public function action_get_teams()
		{
			$this->requireID();
			$this->payloadDesc = "List of teams the user is associated with";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getTeams();
		}
		
		/**
		 * action_get_sports() List of sports that the user is associated with
		 * via /api/user/sports/{users_id}
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "List of sports that the user is associated with";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getSports();
		}
		
		/**
		 * action_get_orgs() List of organizations the user is associated with
		 * via /api/user/orgs/{users_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->requireID();
			$this->payloadDesc = "List of organizations the user is associated with";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return (Object)$this->mainModel->getOrgs($this->myID);			
		}
		
		/**
		 * action_get_related() Content related to this user to be displayed on the "related content" pane
		 * via /api/user/related/{users_id}
		 *
		 */
		public function action_get_related()
		{
			$this->requireID();
			$this->payloadDesc = "Content related to this user to be displayed on the \"related content\" pane";
			//$teams_link = ORM::factory('User_Teamslink')->where('users_id', '=', $this->myID ); 
			//return $teams_link; 
		}
		
		/**
		 * action_get_videos() List of videos uploaded by the user
		 * via /api/user/videos/{users_id}
		 *
		 */
		public function action_get_videos()
		{
			 
			$this->payloadDesc = "List of videos uploaded by the user";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getVideos();			
		
		}
		
		/**
		 * action_get_images() List of images uploaded by the user
		 * via /api/user/images/{users_id}
		 *
		 */
		public function action_get_images()
		{
			 
			$this->payloadDesc = "List of images uploaded by the user";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getImages();		
		}
		
		/**
		 * action_get_commentsof() Get a list of the comments made by the user
		 * via /api/user/commentsof/{users_id}
		 *
		 */
		public function action_get_commentsof()
		{
			$this->requireID();
			$this->payloadDesc = "Get a list of the comments made by the user";
			return $this->mainModel->getCommentsOf();
		}
		
		/**
		 * action_get_commentson() Get a list of comments related to the user
		 * via /api/user/commentson/{users_id}
		 *
		 */
		public function action_get_commentson()
		{
			$this->requireID();
			$this->payloadDesc = "Get a list of comments related to the user";
			return $this->mainModel->getCommentsOn();
		}
		
		/**
		 * action_get_fitnessbasics() Get the basic fitness data for the user
		 * via /api/user/fitnessbasics/{users_id}
		 *
		 */
		public function action_get_fitnessbasics()
		{
			$this->requireID();
			$this->payloadDesc = "Get the basic fitness data for the user"; 
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return (Object)$this->mainModel->getFitnessbasics();		
		
		}
		
		/**
		 * action_get_primaryvideo() Get the primary video to be displayed on a user profile page
		 * via /api/user/primaryvideo/{users_id}
		 *
		 */
		public function action_get_primaryvideo()
		{
			$this->requireID();
			$this->payloadDesc = "Get the primary video to be displayed on a user profile page";
	
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return (Object)$this->mainModel->getPrimaryVideo();	
		}
		
		/**
		 * action_get_fbreg() Get user facebook basic information
		 * via /api/user/fbreg
		 *
		 */
		public function  action_get_fbreg()
		{
			$this->payloadDesc = "Get user facebook basic information";
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################


		/**
		 *
		 */
		public function action_post_fbreg()
		{
			$facebook = FacebookAuth::factory();
			$retArr =  $facebook->get_user();
			if($retArr['message']){
				$error_array = array(
					"error" => $retArr['message']
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;
			}
			else{
				return $facebook;
			}
		}

		/**
		 * action_post_add() Create a new user with all necessary basic information (possibly first step of registration)
		 * via /api/user/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Create a new user with all necessary basic information (possibly first step of registration)";

			$args = array();

			if(trim($this->request->post('email')) != "")
			{
				$args['email'] = trim($this->request->post('email'));
			}

			if(trim($this->request->post('firstname')) != "")
			{
				$args['firstname'] = trim($this->request->post('firstname'));
			}

			if(trim($this->request->post('lastname')) != "")
			{
				$args['lastname'] = trim($this->request->post('lastname'));
			}

			// password 
			// User Password
				
			if(trim($this->request->post('password')) != "")
			{
				$args['password'] = $this->request->post('password');
			}

			// password
			// User Password

			if(trim($this->request->post('re_password')) != "")
			{
				$args['re_password'] = $this->request->post('re_password');
			}

			if(trim($this->request->post('dob')) != "")
			{
				$args['dob'] = date('Y-m-d',strtotime(trim($this->request->post('dob'))));
			}

			// facebook_id 
			// Facebook Identification
				
			if(trim($this->request->post('facebook_id')) != "")
			{
				$args['facebook_id'] = trim($this->request->post('facebook_id'));
			}


			$result = $this->mainModel->addUser($args);

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
		 * Modified by Jeffrey
		 * @return bool
		 */
		public function action_post_addteam(){
			$this->payloadDesc = "Add a new team association for a user";

			// Check That:
			// a) user is loaded
			// b) EITHER user in main model matches user logged in
			// c) OR user is an admin


			if(!$this->user || !($this->user->id == $this->mainModel->id || $this->user->has('roles','2')))
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "This action requires authentication"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}

			// CHECK WHAT PARAMETERS WERE PROVIDED IN POST DATA:

			if((int)trim($this->request->post('teams_id')) >= 0)
			{
				$teams_id = (int)trim($this->request->post('teams_id'));
			}

			// orgs_id
			// Organization ID
			if((int)trim($this->request->post('orgs_id')) >= 0)
			{
				$orgs_id = (int)trim($this->request->post('orgs_id'));
			}

			// sports_id
			// Sport ID
			if((int)trim($this->request->post('sports_id')) >= 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

			// complevels_id
			// Competition Level ID
			if((int)trim($this->request->post('complevels_id')) >= 0)
			{
				$complevels_id = (int)trim($this->request->post('complevels_id'));
			}

			// seasons_id
			// Season ID
			if((int)trim($this->request->post('seasons_id')) >= 0)
			{
				$seasons_id = (int)trim($this->request->post('seasons_id'));
			}

			// year
			// Year
			if((int)trim($this->request->post('year')) > 0)
			{
				$year = (int)trim($this->request->post('year'));
			}
			else
			{
				// IF THE YEAR IS NOT SET, SET IT TO CURRENT YEAR
				$year = date('Y',time());
			}

			$args = array(
				'teams_id' => $teams_id,
				'orgs_id' => $orgs_id,
				'sports_id' => $sports_id,
				'complevels_id' => $complevels_id,
				'seasons_id' => $seasons_id,
				'year' => $year,
			);

			$result = $this->mainModel->addTeam($args);

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
		 * action_post_addsport() Add a new sport association for a user
		 * via /api/user/addsport/{users_id}
		 *
		 */
		public function action_post_addsport()
		{
			$this->payloadDesc = "Add a new sport association for a user";

		     // CHECK FOR PARAMETERS:
			// sports_id 
			// ID of the sport to be added
			
			if(!$this->user)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "This action requires authentication"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}	
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}
			$new_user_sport_link_obj = ORM::factory("User_Sportlink");
			$new_user_sport_link_obj->sports_id = $sports_id;
			$new_user_sport_link_obj->users_id = $this->user->id;		
			
			try{
				$new_user_sport_link_obj->save();
				 
			}catch(ErrorException $e)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save User",
					"desc" => $e->getMessage()
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}		
		}
		
		/**
		 * action_post_addrole() Add a new role for this User
		 * via /api/user/addrole/{users_id}
		 *
		 */
		public function action_post_addrole()
		{
			$this->payloadDesc = "Add a new role for this User";
			if(!$this->user)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "This action requires authentication"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}
		     // CHECK FOR PARAMETERS:
			// roles_id 
			// The ID of the role to associate the user with
				
			if((int)trim($this->request->post('roles_id')) > 0)
			{
				$roles_id = (int)trim($this->request->post('roles_id'));
			}
			
			$new_roles_users_obj = ORM::factory("Roles_Users");
			$new_roles_users_obj->role_id = $roles_id;
			$new_roles_users_obj->users_id = $this->user->id;		
			
			try{
				$new_roles_users_obj->save();
				 
			}catch(ErrorException $e)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save User",
					"desc" => $e->getMessage()
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}	
		}
		
		/**
		 * action_post_addidentity() Add an aditional identity to this user's profile
		 * via /api/user/addidentity/{users_id}
		 *
		 */
		public function action_post_addidentity()
		{
			$this->payloadDesc = "Add an aditional identity to this user\'s profile";
			if(!$this->user)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "This action requires authentication"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}
		     // CHECK FOR PARAMETERS:
			// provider 
			// The provider the identity is for
				
			if(trim($this->request->post('provider')) != "")
			{
				$provider = trim($this->request->post('provider'));
			}

			// identity 
			// The Identity string for a specific provider
			if(trim($this->request->post('provider')) != "")
			{
				$identity = trim($this->request->post('identity'));
			}
				
			if(trim($this->request->post('identity')) != "")
			{
				$identity = trim($this->request->post('identity'));
			}
			$new_user_identities_obj = ORM::factory("User_Identitie");
			$new_user_identities_obj->provider = $provider;
			$new_user_identities_obj->identity = $identity;
			$new_user_identities_obj->user_id = $this->user->id;		
			
			try{
				$new_user_identities_obj->save();
				 
			}catch(ErrorException $e)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save User",
					"desc" => $e->getMessage()
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}	
		}
		
		/**
		 * action_post_position() Add a Position for a user
		 * via /api/user/position/{users_id}
		 *
		 */
		public function action_post_position()
		{
			$this->payloadDesc = "Add a Position for a user";
			if(!$this->user)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "This action requires authentication"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}
			
		     // CHECK FOR PARAMETERS:
			// teams_id 
			// Team ID the position is for (We are adding a position to a user/team link)
				
			if((int)trim($this->request->post('teams_id')) > 0)
			{
				$teams_id = (int)trim($this->request->post('teams_id'));
			}

			// positions_id 
			// The posititon to add.
				
			if((int)trim($this->request->post('positions_id')) > 0)
			{
				$positions_id = (int)trim($this->request->post('positions_id'));
			}
			
			// get users_teams_link_id
			$teams_link_obj = ORM::factory('User_Teamslink')->where('teams_id','=',$teams_id)->and_where('users_id', '=', $this->user->id );
			$teams_link  = $teams_link_obj->find(1);
			$tl_result = $teams_link->getBasics();
			$users_teams_link_id = $tl_result['id'];
			
			// create new utl_position_link object
			$utl_position_link_obj = ORM::factory('User_Teamslink_Positionlink');
			$utl_position_link_obj->users_teams_link_id = $users_teams_link_id;
			$utl_position_link_obj->positions_id = $positions_id;
			try{
				$utl_position_link_obj->save();				 
			}catch(ErrorException $e)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save User",
					"desc" => $e->getMessage()
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

		
		/**
		 * action_put_basics() Update basic information about the user
		 * via /api/user/basics/{users_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about the user";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// email
			// Updated Email Address

			if(trim($this->put('email')) != "")
			{
				$arguments["email"] = urldecode(trim($this->put('email')));
			}

			// firstname
			// Updated First Name

			if(trim($this->put('firstname')) != "")
			{
				$arguments["firstname"] = trim($this->put('firstname'));
			}

			// lastname
			// Updated Last Name

			if(trim($this->put('lastname')) != "")
			{
				$arguments["lastname"] = trim($this->put('lastname'));
			}

			// password
			// New Password

			if(trim($this->put('password')) != "")
			{
				$arguments["password"] = trim($this->put('password'));
			}

			// re_password
			// Re-entered Password for verification

			if(trim($this->put('re_password')) != "")
			{
				$arguments["re_password"] = trim($this->put('re_password'));
			}

			// cities_id
			// User's Home City

			if((int)trim($this->put('cities_id')) > 0)
			{
				$arguments["cities_id"] = (int)trim($this->put('cities_id'));
			}
            
            if(!$this->mainModel->id)
            {
                $this->modelNotSetError();
                return false;
            }
			$arguments['id'] =  $this->mainModel->id;

                $result = $this->mainModel->updateUser($arguments);
                
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
		 * action_put_team() Update the user / team assosication (for future use)
		 * via /api/user/team/{users_id}/teams_id
		 *
		 */
		public function action_put_team()
		{
			$this->payloadDesc = "Update the user / team assosication (for future use)";

		    if(!$this->mainModel->id)
            {
                $this->modelNotSetError();
                return false;
            }
            
            $result = $this->mainModel->updateTeam();    
                
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
		 * action_put_sport() Update the user / sport association (for future use)
		 * via /api/user/sport/{users_id}/sports_id
		 *
		 */
		public function action_put_sport()
		{
			$this->payloadDesc = "Update the user / sport association (for future use)";

		    if(!$this->mainModel->id)
            {
                $this->modelNotSetError();
                return false;
            }
            
            $result = $this->mainModel->updateSport();    
                
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
		 * action_put_fitnessbasics() Update basic fitness data for the user
		 * via /api/user/fitnessbasics/{users_id}/fitness_data_id
		 *
		 */
		public function action_put_fitnessbasics()
		{
			$this->payloadDesc = "Update basic fitness data for the user.  This will require the logged in user owns the fitness data value or the logged in user is an admin.  This method can work either my taking in the fitness_data_values_id and a new value or fitness_data_id, user_id (can be logged in user), and the new value.";
			$arguments = array();

			$arguments["fitness_data_id"] = trim($this->put('fitness_data_id'));

			$arguments["users_id"] =  trim($this->put('users_id'));

			$arguments["user_value"] = trim($this->put('user_value'));

			$arguments["fitness_data_values_id"] = trim($this->put('fitness_data_values_id'));


			if($this->mainModel->id)
			{
				$arguments['users_id'] = $this->mainModel->id;
			}

			//TODO, add by Jeffrey, Here need to do permission check, only owner and admin can update the fitness data

			$fitness_dataval = ORM::factory("User_Fitness_Dataval");

			$result = $fitness_dataval->updateFitnessData($arguments);
			//Check for success / error
			if(get_class($result) == get_class($fitness_dataval))
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
		 * action_delete_base() Delete a User
		 * via /api/user/base/{users_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a User";

		    if(!$this->mainModel->id)
            {
                $this->modelNotSetError();
                return false;
            }
            return $this->mainModel->delete();
		}
		
		/**
		 * action_delete_team() Delete the user / team assosication
		 * via /api/user/team/{users_id}/teams_id
		 *
		 */
		public function action_delete_team()
		{
			$this->payloadDesc = "Delete the user / team assosication";

		    if(!$this->mainModel->id)
            {
                $this->modelNotSetError();
                return false;
            }

			$arguments = array();
			// CHECK FOR PARAMETERS:
			// teams_id (REQUIRED)
			// The ID of team to disassociate the user from.  This will delete any connections that exist but won't throw an error if the team-user link does not exist.

			if((int)trim($this->delete('teams_id')) > 0)
			{
				$arguments["teams_id"] = (int)trim($this->delete('teams_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "teams_id",
					"param_desc" => "The ID of team to disassociate the user from.  This will delete any connections that exist but won't throw an error if the team-user link does not exist."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

            return $this->mainModel->deleteTeam($arguments);
		}
		
		/**
		 * action_delete_sport() Delete the user / sport association
		 * via /api/user/sport/{users_id}/sports_id
		 *
		 */
		public function action_delete_sport()
		{
			$this->payloadDesc = "Delete the user / sport association";

		    if(!$this->mainModel->id)
            {
                $this->modelNotSetError();
                return false;
            }

			$arguments = array();
			// CHECK FOR PARAMETERS:
			// sports_id (REQUIRED)
			// The ID of sport to disassociate the user from.  This will be used for individual sports through the user_sport_link table.

			if((int)trim($this->delete('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->delete('sports_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "sports_id",
					"param_desc" => "The ID of sport to disassociate the user from.  This will be used for individual sports through the user_sport_link table."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
            return $this->mainModel->deleteSport($arguments);
		}
		
		/**
		 * action_delete_role() Delete a user's Role
		 * via /api/user/role/{users_id}/roles_id
		 *
		 */
		public function action_delete_role()
		{
			$this->payloadDesc = "Delete a user\'s Role";

			$arguments = array();
			// CHECK FOR PARAMETERS:
			// role_id (REQUIRED)
			// This is the ID of the role from which to disassociate the user.

			if((int)trim($this->delete('role_id')) > 0)
			{
				$arguments["role_id"] = (int)trim($this->delete('role_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "role_id",
					"param_desc" => "This is the ID of the role from which to disassociate the user."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			if($this->mainModel->id)
			{
				return $this->mainModel->deleteRole($arguments);
			}
			else
			{
				$this->modelNotSetError();
				return false;
			}
		}
		
		/**
		 * action_delete_identity() Delete a User's Identity
		 * via /api/user/identity/{users_id}/identity_id
		 *
		 */
		public function action_delete_identity()
		{
			$this->payloadDesc = "Delete a User\'s Identity";
            
		    if(!$this->mainModel->id)
            {
                $this->modelNotSetError();
                return false;
            }

			$arguments = array();
			// CHECK FOR PARAMETERS:
			// identity_id (REQUIRED)
			// This is the ID of the identity from which to disassociate the user.

			if( trim($this->delete('identity_id')) != "")
			{
				$arguments["identity_id"] = trim($this->delete('identity_id'));
				if (!Valid::identity_exist($arguments["identity_id"])){
					$error_array = array(
						"error" => "Identity doesn't exist",
						"param_name" => "identity_id",
						"param_desc" => "This is the ID of the identity from which to disassociate the user."
					);

					// Set whether it is a fatal error
					$is_fatal = true;

					// Call method to throw an error
					$this->addError($error_array,$is_fatal);
					return false;
				}
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "identity_id",
					"param_desc" => "This is the ID of the identity from which to disassociate the user."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

            return $this->mainModel->deleteIdentity($arguments);
		}
		
	}