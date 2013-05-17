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
            if (!$this->myID) 
                $this->myID = $this->user->id;
			$this->popMainModel();
			if(!$this->mainModel->id && $this->is_logged_in){
				$this->mainModel->id = $this->user->id;
			}
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
			$arguments = array();
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if((int)trim($this->request->query('sport_id')) > 0)
			{
				$arguments["sport_id"] = (int)trim($this->request->query('sport_id'));
			}
			return $this->mainModel->getTeams($arguments);
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
			return $this->mainModel->getOrgs($this->myID);			
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
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getRelated();
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

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$sports_id = $arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}else{
				$sports_id = null;
			}

			return $this->mainModel->getUploadedVideos($this->mainModel, $sports_id);
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

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$sports_id = $arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}else{
				$sports_id = null;
			}

			return $this->mainModel->getImages($sports_id);
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
			return $this->action_post_fbreg();
		}

		/**
		 * action_get_search() Search for users based on various criteria
		 * via /api/user/search/{users_id}
		 *
		 */
		public function action_get_search()
		{
			$this->payloadDesc = "Search for users based on various criteria";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// sports_id
			// Narrow user list based on sport

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id
			// Narrow user list to users of a comp level

			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$arguments["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			// gradyear
			// a year or a range

			if(trim($this->request->query('gradyear')) != "")
			{
				$arguments["gradyear"] = trim($this->request->query('gradyear'));
			}

			// orderby
			// Default will be to order by votes.

			if(trim($this->request->query('orderby')) != "")
			{
				$arguments["orderby"] = trim($this->request->query('orderby'));
			}

			// positions_id
			// Search for users who play a specific position

			if((int)trim($this->request->query('positions_id')) > 0)
			{
				$arguments["positions_id"] = (int)trim($this->request->query('positions_id'));
			}

			// searchtext
			// A string to search names and descriptions

			if(trim($this->request->query('searchtext')) != "")
			{
				$arguments["searchtext"] = trim($this->request->query('searchtext'));
			}

			$user_obj = ORM::factory('User_Base');

			$result = $user_obj->getSearch($arguments);

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
		###########################    POST METHODS    #############################
		############################################################################

		/**
		 *
		 */
		public function action_post_fbreg()
		{
			$facebook = FacebookAuth::factory();

		//	print_r($facebook);
			$retArr =  $facebook->get_user();

		//	print_r($retArr);

			if(isset($retArr['message']))
			{

				//Error message array
				$error_array = array(
					"error" => $retArr['message']."..."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

				return false;
			}
			else
			{
		//		print_r($facebook);
				return $facebook;
			}
		}


		/**
		 * action_get_fbpics() Get Facebook all user profile photo(s)
		 * via /api/user/fbpics/{0}
		 *
		 */
		public function action_get_fbpics()
		{
			$facebook = FacebookAuth::factory();

			$retArr =  $facebook->get_photos();

			if($retArr['error_message'])
			{
				//Error message array
				$error_array = array(
					"error" => $retArr['error_message']
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

				return false;
			}
			else
			{
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
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			//TODO, add by Jeffrey, Here need to add ACL control.
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
			$seasons_arr = array();

			if (!intval($teams_id) > 0){
				if(trim($this->request->post('seasons_arr')) != "")
				{
					$seasons_arr = explode(',' , trim($this->request->post('seasons_arr')));
				}else{
					$error_array = array(
						"error" => "Seasons id invalid",
						"desc" => "Multiple seasons id should be like 1,2"
					);
					$this->modelNotSetError($error_array);
					return false;
				}
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
				'seasons_arr' => $seasons_arr,
				'year' => $year,
				'users_id' => $this->mainModel->id
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
			//TODO, Add by Jeffrey, Here need to do permissoin check.
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

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$arguments = array();

			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->post('sports_id'));
			}

			$arguments['users_id'] = $this->mainModel->id;
			$new_user_sport_link_obj = ORM::factory("User_Sportlink");
			$result = $new_user_sport_link_obj->addSport($arguments);

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
		 * action_post_addrole() Add a new role for this User
		 * via /api/user/addrole/{users_id}
		 *
		 */
		public function action_post_addrole()
		{
			$this->payloadDesc = "Add a new role for this User";
			if(!$this->user)
			{
				$error_array = array(
					"error" => "This action need authentication",
					"desc" => "This action need authentication"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$arguments = array();
			// CHECK FOR PARAMETERS:
			// roles_id
			// The ID of the role to associate the user with

			if((int)trim($this->request->post('roles_id')) > 0)
			{
				$arguments["role_id"] = (int)trim($this->request->post('roles_id'));
			}

			$new_roles_users_obj = ORM::factory("RolesUsers");

			$arguments['user_id'] = $this->mainModel->id;

			$result = $new_roles_users_obj->addRole($arguments);

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
		 * action_post_addidentity() Add an aditional identity to this user's profile
		 * via /api/user/addidentity/{users_id}
		 *

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
		 */

		/**
		 * action_post_position() Add a Position for a user
		 * via /api/user/position/{users_id}
		 *
		 */
		public function action_post_position()
		{
			$this->payloadDesc = "Add a Position for a user";
			//TODO, add by Jeffrey, here need to permission check.
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

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$teams_link = ORM::factory("User_Teamslink");
			// get users_teams_link_id
			$users_teams_id = "";
			if (!$teams_link->check_user_teams_link_exist($this->mainModel->id, $teams_id, $users_teams_id)){
				$error_array = array(
					"error" => "Users teams ID doesn't exist",
					"desc" => "Users teams ID doesn't exist, you must set link between users and teams first"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			// create new utl_position_link object

			$utl_position_link_obj = ORM::factory('User_Teamslink_Positionlink');

			$args['users_teams_link_id'] = $users_teams_id;
			$args['positions_id'] = $positions_id;

			$result = $utl_position_link_obj->savePositionLink($args);

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
		 * action_post_register() This is different than add in that it will also log the person in and send verification email.
		 * via /api/user/register/{users_id}
		 *
		 */
		public function action_post_register()
		{
			$this->payloadDesc = "This is different than add in that it will also log the person in and send verification email.";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// email (REQUIRED)
			// Email Address of New Registrant

			if(trim($this->request->post('email')) != "")
			{
				$arguments["email"] = trim($this->request->post('email'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "email",
					"param_desc" => "Email Address of New Registrant"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// firstname
			// First Name of Registrant

			if(trim($this->request->post('firstname')) != "")
			{
				$arguments["firstname"] = trim($this->request->post('firstname'));
			}

			// lastname
			// Last Name of Registrant

			if(trim($this->request->post('lastname')) != "")
			{
				$arguments["lastname"] = trim($this->request->post('lastname'));
			}

			// password
			// Registrant Password

			if(trim($this->request->post('password')) != "")
			{
				$arguments["password"] = trim($this->request->post('password'));
			}

			// accept_terms (REQUIRED)
			// This isn't just required, but it has to be true in order to create an account.

			if($this->request->post('accept_terms') != "")
			{
				//convert accept_terms to a boolean
				$arguments["accept_terms"] = (bool)$this->request->post('accept_terms');
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "accept_terms",
					"param_desc" => "This isn't just required, but it has to be true in order to create an account."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// re_password
			// Re-Enter Registrant Password

			if(trim($this->request->post('re_password')) != "")
			{
				$arguments["re_password"] = trim($this->request->post('re_password'));
			}

			// dob (REQUIRED)
			// Date of Birth for New Registrant

			if(trim($this->request->post('dob')) != "")
			{
				$arguments["dob"] = trim($this->request->post('dob'));
			}
			// gender
			// Gender

			if($this->request->post('gender') != "")
			{
				//convert gender to a boolean
				$arguments["gender"] = $this->request->post('gender');
			}

			$result = ORM::factory('User_Base')->addRegister($arguments);

			//Check for success / error
			if(get_class($result) == get_class($this->mainModel))
			{

				$email = $arguments['email'];
				$password = $arguments['password'];
				//Process user's info,set it to session
				Auth::instance()->login($email, $password);
				//Here to send mail
				if (Email::send_mail($email, 'register success', 'test content')){
					//TODO, add by jeffrey, give message to user.
				}else{
					if(!$this->mainModel->id)
					{
						$error_array = array(
							"error" => "Something wrong to send register notification mail",
							"desc" => "Something wrong to send register notification mail"
						);
						$this->modelNotSetError($error_array);
						return false;
					}
				}
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
		 * action_post_savecrop() This is the method that can save the cropping information for an image being used as userpic.
		 * It differs from those in the media controller in that it assumes this is going to be a userpic.
		 * via /api/user/savecrop/{users_id}
		 *
		 */
		public function action_post_savecrop()
		{
			$this->payloadDesc = "This is the method that can save the cropping information for an image being used as userpic.  It differs from those in the media controller in that it assumes this is going to be a userpic.";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// image_url (REQUIRED)
			// This is the url of the image being cropped.  It will be downloaded from this url and the crop data will be used to save a new version.

			if(trim($this->request->post('image_url')) != "")
			{
				$arguments["image_url"] = trim($this->request->post('image_url'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "image_url",
					"param_desc" => "This is the url of the image being cropped.  It will be downloaded from this url and the crop data will be used to save a new version."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// crop_x (REQUIRED)
			// The x axis of the top left corner of the crop box.

			if((int)trim($this->request->post('crop_x')) > 0)
			{
				$arguments["crop_x"] = (int)trim($this->request->post('crop_x'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "crop_x",
					"param_desc" => "The x axis of the top left corner of the crop box."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// crop_y (REQUIRED)
			// The y axis of the top left corner of the cropping box.

			if((int)trim($this->request->post('crop_y')) > 0)
			{
				$arguments["crop_y"] = (int)trim($this->request->post('crop_y'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "crop_y",
					"param_desc" => "The y axis of the top left corner of the cropping box."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// crop_width (REQUIRED)
			// The width of the crop box.

			if((int)trim($this->request->post('crop_width')) > 0)
			{
				$arguments["crop_width"] = (int)trim($this->request->post('crop_width'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "crop_width",
					"param_desc" => "The width of the crop box."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// crop_height (REQUIRED)
			// The height of the crop box.

			if((int)trim($this->request->post('crop_height')) > 0)
			{
				$arguments["crop_height"] = (int)trim($this->request->post('crop_height'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "crop_height",
					"param_desc" => "The height of the crop box."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// image_width (REQUIRED)
			// The width of the image after it has been resized with zoom.

			if((int)trim($this->request->post('image_width')) > 0)
			{
				$arguments["image_width"] = (int)trim($this->request->post('image_width'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "image_width",
					"param_desc" => "The width of the image after it has been resized with zoom."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// image_height (REQUIRED)
			// The height of the image after it has been resized with zoom.

			if((int)trim($this->request->post('image_height')) > 0)
			{
				$arguments["image_height"] = (int)trim($this->request->post('image_height'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "image_height",
					"param_desc" => "The height of the image after it has been resized with zoom."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// lock-proportion
			// Not exactly sure what this does.

			if($this->request->post('lock-proportion') != "")
			{
				//convert lock-proportion to a boolean
				$arguments["lock-proportion"] = (bool)$this->request->post('lock-proportion');
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

			if((int)trim($this->put('teams_id')) > 0)
			{
				$arguments["teams_id"] = (int)trim($this->put('teams_id'));
			}else{
				$error_array = array(
					"error" => "Teams ID required",
					"desc" => "Teams ID required"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

            $arguments['users_id'] = $this->mainModel->id;
            $result = $this->mainModel->updateUserTeam($arguments);
                
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

			if((int)trim($this->delete('teams_id')) > 0)
			{
				$arguments["teams_id"] = (int)trim($this->delete('teams_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"desc" => "The ID of team to disassociate the user from.  This will delete any connections that exist but won't throw an error if the team-user link does not exist."
				);

				$this->modelNotSetError($error_array);
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
					"desc" => "The ID of sport to disassociate the user from.  This will be used for individual sports through the user_sport_link table."
				);

				$this->modelNotSetError($error_array);
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
					"desc" => "This is the ID of the role from which to disassociate the user."
				);
				$this->modelNotSetError($error_array);
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

			if( trim($this->delete('identity_id')) != "")
			{
				$arguments["identity_id"] = trim($this->delete('identity_id'));
				if (!Valid::identity_exist($arguments["identity_id"])){
//					$error_array = array(
//						"error" => "Identity doesn't exist",
//						"param_name" => "identity_id",
//						"param_desc" => "This is the ID of the identity from which to disassociate the user."
//					);

					$error_array = array(
						"error" => "Identity doesn't exist",
						"desc" => "This is the ID of the identity from which to disassociate the user."
					);
					$this->modelNotSetError($error_array);
					return false;
				}
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
//				$error_array = array(
//					"error" => "Required Parameter Missing",
//					"param_name" => "identity_id",
//					"param_desc" => "This is the ID of the identity from which to disassociate the user."
//				);

				$error_array = array(
					"error" => "Required Parameter Missing",
					"desc" => "This is the ID of the identity from which to disassociate the user."
				);
				$this->modelNotSetError($error_array);

				return false;
			}

            return $this->mainModel->deleteIdentity($arguments);
		}
		
	}