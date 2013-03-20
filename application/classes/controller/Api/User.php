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
			$users = ORM::factory('User_Base')->where('id','=',$this->myID);			  
			return $users;
		}
		
		/**
		 * action_get_teams() List of teams the user is associated with
		 * via /api/user/teams/{users_id}
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "List of teams the user is associated with";
			$user_teams = ORM::factory("User_Teamslink")->where('users_id', '=', $this->myID );
			return $user_teams;
		}
		
		/**
		 * action_get_sports() List of sports that the user is associated with
		 * via /api/user/sports/{users_id}
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "List of sports that the user is associated with";
			
			$sports = ORM::factory('User_Sportlink')->where('users_id', '=', $this->myID );
			 
			return $sports; 
		}
		
		/**
		 * action_get_orgs() List of organizations the user is associated with
		 * via /api/user/orgs/{users_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "List of organizations the user is associated with";
			$teams_link = ORM::factory('User_Teamslink')->where('users_id', '=', $this->myID ); 
			return $teams_link;
		}
		
		/**
		 * action_get_related() Content related to this user to be displayed on the "related content" pane
		 * via /api/user/related/{users_id}
		 *
		 */
		public function action_get_related()
		{
			$this->payloadDesc = "Content related to this user to be displayed on the \"related content\" pane";
			$teams_link = ORM::factory('User_Teamslink')->where('users_id', '=', $this->myID ); 
			return $teams_link; 
		}
		
		/**
		 * action_get_videos() List of videos uploaded by the user
		 * via /api/user/videos/{users_id}
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "List of videos uploaded by the user";

		
		}
		
		/**
		 * action_get_images() List of images uploaded by the user
		 * via /api/user/images/{users_id}
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "List of images uploaded by the user";

		
		}
		
		/**
		 * action_get_commentsof() Get a list of the comments made by the user
		 * via /api/user/commentsof/{users_id}
		 *
		 */
		public function action_get_commentsof()
		{
			$this->payloadDesc = "Get a list of the comments made by the user";

		
		}
		
		/**
		 * action_get_commentson() Get a list of comments related to the user
		 * via /api/user/commentson/{users_id}
		 *
		 */
		public function action_get_commentson()
		{
			$this->payloadDesc = "Get a list of comments related to the user";

		
		}
		
		/**
		 * action_get_fitnessbasics() Get the basic fitness data for the user
		 * via /api/user/fitnessbasics/{users_id}
		 *
		 */
		public function action_get_fitnessbasics()
		{
			$this->payloadDesc = "Get the basic fitness data for the user";
			$fitnessbasic = ORM::factory('User_Fitness_Dataval')->where('users_id', '=', $this->myID ); 
			return $fitnessbasic;
		
		}
		
		/**
		 * action_get_primaryvideo() Get the primary video to be displayed on a user profile page
		 * via /api/user/primaryvideo/{users_id}
		 *
		 */
		public function action_get_primaryvideo()
		{
			$this->payloadDesc = "Get the primary video to be displayed on a user profile page";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Create a new user with all necessary basic information (possibly first step of registration)
		 * via /api/user/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Create a new user with all necessary basic information (possibly first step of registration)";

		     // CHECK FOR PARAMETERS:
			// email (REQUIRED)
			// Email Address of New User
				
			if(trim($this->request->post('email')) != "")
			{
				$email = trim($this->request->post('email'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "email",
					"param_desc" => "Email Address of New User"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// firstname 
			// First Name of User
				
			if(trim($this->request->post('firstname')) != "")
			{
				$firstname = trim($this->request->post('firstname'));
			}

			// lastname 
			// Last Name of User
				
			if(trim($this->request->post('lastname')) != "")
			{
				$lastname = trim($this->request->post('lastname'));
			}

			// password 
			// User Password
				
			if(trim($this->request->post('password')) != "")
			{
				$password = trim($this->request->post('password'));
			}

			// facebook_id 
			// Facebook Identification
				
			if(trim($this->request->post('facebook_id')) != "")
			{
				$facebook_id = trim($this->request->post('facebook_id'));
			}

		}
		
		/**
		 * action_post_addteam() Add a new team association for a user
		 * via /api/user/addteam/{users_id}
		 *
		 */
		public function action_post_addteam()
		{
			$this->payloadDesc = "Add a new team association for a user";

		     // CHECK FOR PARAMETERS:
			// teams_id 
			// ID of the Team to be added
				
			if((int)trim($this->request->post('teams_id')) > 0)
			{
				$teams_id = (int)trim($this->request->post('teams_id'));
			}

			// orgs_id 
			// Organization ID
				
			if((int)trim($this->request->post('orgs_id')) > 0)
			{
				$orgs_id = (int)trim($this->request->post('orgs_id'));
			}

			// sports_id 
			// Sport ID
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

			// complevels_id 
			// Competition Level ID
				
			if((int)trim($this->request->post('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->request->post('complevels_id'));
			}

			// seasons_id 
			// Season ID
				
			if((int)trim($this->request->post('seasons_id')) > 0)
			{
				$seasons_id = (int)trim($this->request->post('seasons_id'));
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
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
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

		     // CHECK FOR PARAMETERS:
			// roles_id 
			// The ID of the role to associate the user with
				
			if((int)trim($this->request->post('roles_id')) > 0)
			{
				$roles_id = (int)trim($this->request->post('roles_id'));
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

		     // CHECK FOR PARAMETERS:
			// provider 
			// The provider the identity is for
				
			if(trim($this->request->post('provider')) != "")
			{
				$provider = trim($this->request->post('provider'));
			}

			// identity 
			// The Identity string for a specific provider
				
			if(trim($this->request->post('identity')) != "")
			{
				$identity = trim($this->request->post('identity'));
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

		     // CHECK FOR PARAMETERS:
			// email 
			// Updated Email Address
				
			if(trim($this->request->body('email')) != "")
			{
				$email = trim($this->request->body('email'));
			}

			// firstname 
			// Updated First Name
				
			if(trim($this->request->body('firstname')) != "")
			{
				$firstname = trim($this->request->body('firstname'));
			}

			// lastname 
			// Updated Last Name
				
			if(trim($this->request->body('lastname')) != "")
			{
				$lastname = trim($this->request->body('lastname'));
			}

			// password 
			// New Password
				
			if(trim($this->request->body('password')) != "")
			{
				$password = trim($this->request->body('password'));
			}

			// re_password 
			// Re-entered Password for verification
				
			if(trim($this->request->body('re_password')) != "")
			{
				$re_password = trim($this->request->body('re_password'));
			}

			// cities_id 
			// User's Home City
				
			if((int)trim($this->request->body('cities_id')) > 0)
			{
				$cities_id = (int)trim($this->request->body('cities_id'));
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

		
		}
		
		/**
		 * action_put_sport() Update the user / sport association (for future use)
		 * via /api/user/sport/{users_id}/sports_id
		 *
		 */
		public function action_put_sport()
		{
			$this->payloadDesc = "Update the user / sport association (for future use)";

		
		}
		
		/**
		 * action_put_fitnessbasics() Update basic fitness data for the user
		 * via /api/user/fitnessbasics/{users_id}/fitness_data_id
		 *
		 */
		public function action_put_fitnessbasics()
		{
			$this->payloadDesc = "Update basic fitness data for the user";

		
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

		
		}
		
		/**
		 * action_delete_team() Delete the user / team assosication
		 * via /api/user/team/{users_id}/teams_id
		 *
		 */
		public function action_delete_team()
		{
			$this->payloadDesc = "Delete the user / team assosication";

		
		}
		
		/**
		 * action_delete_sport() Delete the user / sport association
		 * via /api/user/sport/{users_id}/sports_id
		 *
		 */
		public function action_delete_sport()
		{
			$this->payloadDesc = "Delete the user / sport association";

		
		}
		
		/**
		 * action_delete_role() Delete a user's Role
		 * via /api/user/role/{users_id}/roles_id
		 *
		 */
		public function action_delete_role()
		{
			$this->payloadDesc = "Delete a user\'s Role";

		
		}
		
		/**
		 * action_delete_identity() Delete a User's Identity
		 * via /api/user/identity/{users_id}/identity_id
		 *
		 */
		public function action_delete_identity()
		{
			$this->payloadDesc = "Delete a User\'s Identity";

		
		}
		
	}