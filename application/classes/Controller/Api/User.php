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
				if (!isset($this->mainModel)){
					$this->mainModel = ORM::factory('User_Base');
				}
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

			if((int)trim($this->request->query('sport_type_id')) > 0)
			{
				$sport_type_id = (int)trim($this->request->query('sport_type_id'));
			}
			else
			{
				$sport_type_id = null;
			}

			return $this->mainModel->getSports('select',$sport_type_id);
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

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$sports_id = $arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}
			elseif((int)trim($this->request->query('sport_id')) > 0)
			{
				$sports_id = $arguments["sports_id"] = (int)trim($this->request->query('sport_id'));
			}
			else
			{
				$sports_id = null;
			}

			if(trim($this->request->query('org_type')) != "")
			{
				$org_type = trim($this->request->query('org_type')) != "" ? trim($this->request->query('org_type')) : NULL;
			}
			$groupby = ($this->request->query('groupby') != '') ? $this->request->query('groupby') : NULL;

			return $this->mainModel->getOrgs($sports_id,$groupby,$org_type);
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
			}
			elseif((int)trim($this->request->query('sport_id')) > 0)
			{
				$sports_id = $arguments["sports_id"] = (int)trim($this->request->query('sport_id'));
			}
			else
			{
				$sports_id = null;
			}

			return $this->mainModel->getVideos($this->mainModel, $sports_id);
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
			}
			elseif((int)trim($this->request->query('sport_id')) > 0)
			{
				$sports_id = $arguments["sports_id"] = (int)trim($this->request->query('sport_id'));
			}
			else
			{
				$sports_id = null;
			}

			return $this->mainModel->getImages($this->mainModel, $sports_id);
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
				if (!Valid::date($arguments["gradyear"])){
					$error_array = array(
						"error" => "Invalid graduate year",
						"desc" => "Invalid graduate year"
					);
					$this->modelNotSetError($error_array);
				}
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

			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$arguments["cities_id"] = trim($this->request->query('cities_id'));
			}

			if((int)trim($this->request->query('states_id')) > 0)
			{
				$arguments["states_id"] = trim($this->request->query('states_id'));
			}

			$legal_orderby = array('votes', 'followers', 'regist_time');
			// orderby
			// Default will be to order by votes.

			if(trim($this->request->query('orderby')) != "")
			{
				$arguments["orderby"] = trim($this->request->query('orderby'));
				if (!in_array($arguments["orderby"], $legal_orderby)){
					$error_array = array(
						"error" => "Invalid order by column",
						"desc" => "Currently only support 'votes', 'followers', 'regist_time'"
					);
					$this->modelNotSetError($error_array);
				}
			}

			$user_obj = ORM::factory('User_Base');

			$result = $user_obj->getSearch($arguments);

			if(get_class($result) == 'Database_Query_Builder_Select')
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

		public function action_get_awards()
		{

			$this->payloadDesc = "List of awards associated with user";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}
			$arguments["users_id"] = (int) $this->mainModel->id;

			return $this->mainModel->getAwards($arguments);
		}

		public function action_get_references()
		{
			$this->payloadDesc = "List of references associated with user";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			$arguments["users_id"] = (int) $this->mainModel->id;

			return $this->mainModel->getReferences($arguments);
		}

		public function action_get_contact()
		{
			$this->payloadDesc = "List of contact associated with user";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$arguments["users_id"] = (int) $this->mainModel->id;
			//$this->mainModel = ORM::factory("User_Contact");
			return $this->mainModel->getContact($arguments);
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
		 * action_get_sent_resumes() Retrieve all resumes this user has sent to college coaches.
		 * via /api/user/sent_resumes/{users_id}
		 *
		 */
		public function action_get_sent_resumes()
		{
			$this->payloadDesc = "Retrieve all resumes this user has sent to college coaches.";
			$arguments = array();

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$arguments['users_id'] = $this->mainModel->id;

			if(!$this->user->can('Assumeownership', array('owner' => $arguments['users_id']))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			$resume_sent_model = ORM::factory("User_Resume_Sent");

			return $resume_sent_model->getSentResumes($arguments);
		}

		/**
		 * action_get_rdtree() rdtree sands for Resume Data Tree.  This method will retrieve all resume data groups  that a specific user should fill out based on his / her sports and positions.  Each group has a list of profiles and data values for the user.
		 * via /api/user/rdtree/{users_id}
		 *
		 */
		public function action_get_rdtree()
		{
			$this->payloadDesc = "rdtree stands for Resume Data Tree.  This method will retrieve all resume data groups  that a specific user should fill out based on his / her sports and positions.  Each group has a list of profiles and data values for the user.";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
		}

		/**
		 * action_get_gpa() Get this user's GPA for all years there are values for.
		 * via /api/user/gpa/{users_id}
		 *
		 */
		public function action_get_gpa()
		{
			$this->payloadDesc = "Get this user\'s GPA for all years there are values for.";
			$arguments = array();
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['users_id'] = $this->mainModel->id;

			if(!$this->user->can('Assumeownership', array('owner' => $args['users_id']))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			$gpa_model = ORM::factory("Academics_Gpa");
			return $gpa_model->getGpa($args);
		}

		/**
		 * action_get_tests() Get all academic tests that the user has scores for.  Tests can be filtered by "Standardized" and "AP" formats.
		 * via /api/user/tests/{users_id}
		 *
		 */
		public function action_get_tests()
		{
			$this->payloadDesc = "Get all academic tests that the user has scores for.  Tests can be filtered by \"Standardized\" and \"AP\" formats.";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// standardized
			// Return results for standardized tests.  True by default.
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(!is_object($this->user)) $this->populateAuthVars();

		//	print_r($this);

			$arguments['users_id'] = $this->mainModel->id;

			if($this->request->query('standardized') != "")
			{
				//convert standardized to a boolean
				$arguments["standardized"] = Util::convert_to_boolean($this->request->query('standardized'));
				if ($arguments["standardized"] === null){
					$error_array = array(
						"error" => "True/false required",
						"desc" => "Invalid test type value"
					);
					$this->modelNotSetError($error_array);
				}
			}else{
				$arguments["standardized"] = 1;
			}

			if($this->request->query('ap') != "")
			{
				//convert ap to a boolean
				$arguments["ap"] = Util::convert_to_boolean($this->request->query('ap'));
				if ($arguments["ap"] === null){
					$error_array = array(
						"error" => "True/false required",
						"desc" => "Invalid test type value"
					);
					$this->modelNotSetError($error_array);
				}
			}else{
				$arguments["ap"] = 1;
			}

			if(!$this->user->can('Assumeownership', array('owner' => $arguments['users_id']))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$sports_id = $arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			$test_model = ORM::factory("Academics_Tests");
			return $tests = $test_model->getTestsByType($arguments);
		}

		############################################################################
		###########################    POST METHODS    #############################
		############################################################################


		/**
		 * action_post_addtestscore() This will allow a user to add a score for an Academic Test Topic
		 * via /api/user/addtestscore/{users_id}
		 *
		 */
		public function action_post_addtestscore()
		{
			$this->payloadDesc = "This will allow a user to add a score for an Academic Test Topic";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// academics_topics_id (REQUIRED)
			// This is the ID of the Test Topic we are adding the score for

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			if((int)trim($this->request->post('academics_topics_id')) > 0)
			{
				$arguments["academics_tests_topics_id"] = (int)trim($this->request->post('academics_topics_id'));
			}

			if(trim($this->request->post('score')) != "")
			{
				$arguments["score"] = trim($this->request->post('score'));
			}

			$arguments['users_id'] = $this->mainModel->id;
			$score_model = ORM::factory("Academics_Tests_Scores");
			$result = $score_model->addTestScore($arguments);
			if(get_class($result) == get_class($score_model))
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
		 * action_post_addgpa() Add a GPA for a given year
		 * via /api/user/addgpa/{users_id}
		 *
		 */
		public function action_post_addgpa()
		{
			$this->payloadDesc = "Add a GPA for a given year";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// year (REQUIRED)
			// This is a 4 digit integer like 2013.

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			if(trim($this->request->post('year')) != "")
			{
				$arguments["year"] = strtolower(trim($this->request->post('year')));
			}

			if(trim($this->request->post('gpa')) != "")
			{
				$arguments["gpa"] = trim($this->request->post('gpa'));
			}

			$arguments['users_id'] = $this->mainModel->id;
			$gpa_model = ORM::factory("Academics_Gpa");
			$result = $gpa_model->addGpa($arguments);

			if(get_class($result) == get_class($gpa_model))
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
		 * This is an alias for post_addgpa()
		 * @return bool
		 */
		public function action_post_gpa()
		{
			return $this->action_post_addgpa();
		}

		/**
		 * @return bool|object
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
					"error" => $retArr['message']
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

				return false;
			}
			else
			{
				if (isset($retArr['id']))
				{
					//$this->populateAuthVars();
					$user_identity = ORM::factory('User_Identity');

					//Check if already logged in.  If so, we will link them up.
					if($this->is_logged_in)
					{
						if($user = $user_identity->find_by_identity($retArr['id'],false))
						{
							if($user->id != $this->user->id)
							{
								// a user with this facebook identity already exists
								// throw an error
								//Error message array
								$error_array = array(
									"error" => "This Facebook account is already linked up with a different AthletesUp account than the one you're logged in to now.  Try logging out and logging back in using facebook."

								);

								// Set whether it is a fatal error
								$is_fatal = true;

								// Call method to throw an error
								$this->addError($error_array,$is_fatal);

								return false;
							}
							else
							{
								$retArr["users_id"] = $user->id;
							}
						}
						else
						{
							//relationship does not exist... add it
							$this->user->addIdentity($retArr['id'],'facebook');
							$retArr["users_id"] = $this->user->id;
						}

					}
					else
					{

						// check for user for this facebook identity and force a login
						if(!$user = $user_identity->find_by_identity($retArr['id']))
						{
							// create a user here based on fb data
							$user = ORM::factory('User_Base');
							$result = $user->add_from_facebook($retArr);

							//Check for success / error
							if(get_class($result) == get_class($this->mainModel))
							{
								//	this indicates success
								//  facebook data will be returned at the end of this method
								$retArr["users_id"] = $user->id;
							}
							elseif(get_class($result) == 'ORM_Validation_Exception')
							{
								//parse error and add to error array
								$this->processValidationError($result,$this->mainModel->error_message_path);
								return false;
							}
						}
					}


				}
				return (object)$retArr;
			}
		}




		/**
		 * action_post_add() Create a new user with all necessary basic information (possibly first step of registration)
		 * via /api/user/add/{0}
		 *
		 */
		public function action_post_add()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

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

			$users_id = $this->mainModel->id;
			if(!$this->user->can('Assumeownership', array('owner' => $users_id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
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

				if(trim($this->request->post('seasons_id')) != "")
				{
					$seasons_id = (int)trim($this->request->post('seasons_id'));
				}
				elseif(trim($this->request->post('seasons_arr')) != "")
				{
					$seasons_arr = explode(',' , trim($this->request->post('seasons_arr')));
				}
				else
				{
					$error_array = array(
						"error" => "Seasons id invalid",
						"desc" => "Include either a single seasons_id parameter or multiple seasons as seasons_arr comma separated"
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
				'seasons_id' => isset($seasons_id) ? $seasons_id : NULL,
				'seasons_arr' => isset($seasons_arr) ? $seasons_arr : NULL,
				'year' => $year,
				'users_id' => $this->mainModel->id
			);

			$result = $this->mainModel->addTeam($args);
			//Check for success / error
			if(is_object($result) && get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
			}
			else
			{
				return $result;
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
			$arguments['users_id'] = $this->mainModel->id;

			if(!$this->user->can('Assumeownership', array('owner' => $arguments['users_id']))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->post('sports_id'));
			}

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
				$arguments["roles_id"] = (int)trim($this->request->post('roles_id'));
			}

			$new_roles_users_obj = ORM::factory("RolesUsers");

			$arguments['users_id'] = $this->mainModel->id;

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

			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
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

			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			$arguments = array();
			// CHECK FOR PARAMETERS:
			// image_url (REQUIRED)
			// This is the url of the image being cropped.  It will be downloaded from this url and the crop data will be used to save a new version.

			if(trim($this->request->post('original')) != "")
			{
				$arguments["image_url"] = trim($this->request->post('original'));
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

			if(is_numeric($this->request->post('crop-x')))
			{
				$arguments["crop_x"] = (int)trim($this->request->post('crop-x'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "crop-x",
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

			if(is_numeric($this->request->post('crop-y')))
			{
				$arguments["crop_y"] = (int)trim($this->request->post('crop-y'));
			}
			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "crop-y",
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

			if(is_numeric($this->request->post('crop-width')))
			{
				$arguments["crop_width"] = (int)trim($this->request->post('crop-width'));
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

			if(is_numeric($this->request->post('crop-height')))
			{
				$arguments["crop_height"] = (int)trim($this->request->post('crop-height'));
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

			if((int)trim($this->request->post('image-width')) > 0)
			{
				$arguments["image_width"] = (int)trim($this->request->post('image-width'));
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

			if((int)trim($this->request->post('image-height')) > 0)
			{
				$arguments["image_height"] = (int)trim($this->request->post('image-height'));
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

			$image = ORM::factory('Media_Image');
			return $image->saveCrop($arguments,$this->mainModel);

		}

		/**
		 * action_post_addcomment() This will add a comment to the "fanboard" for this user's profile page.
		 * via /api/user/addcomment/{users_id}
		 *
		 */
		public function action_post_addcomment()
		{
			$this->payloadDesc = "This will add a comment to the \"fanboard\" for this user\'s profile page.";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// comment (REQUIRED)
			// This is the actual comment being added to the user's fanboard.

			if(trim($this->request->post('comment')) != "")
			{
				$arguments["comment"] = trim($this->request->post('comment'));
			}
			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "comment",
					"param_desc" => "This is the actual comment being added to the user's fanboard."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			return $this->mainModel->addComment($arguments['comment'],$this->user->id);

		}

		public function action_post_contact()
		{

			$this->payloadDesc = "Add a new contact info";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$args = array(); //This will get passed to the add method

			if(trim($this->request->post('phone_cell')) != "")
			{
				$args['phone_cell'] = trim($this->request->post('phone_cell'));
			}

			if(trim($this->request->post('phone_work')) != "")
			{
				$args['phone_work'] = trim($this->request->post('phone_work'));
			}

			$args['users_id'] = $this->mainModel->id;

			if((int)trim($this->request->post('locations_id')) > 0)
			{
				$args['locations_id'] = (int)trim($this->request->post('locations_id'));
			}
			$contact_model = ORM::factory("User_Contact");
			$result =  $contact_model->addContact($args);

			//Check for success / error
			if(get_class($result) == get_class($contact_model))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$contact_model->error_message_path);
				return false;
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################
		public function action_put_contact()
		{
			$this->payloadDesc = "Update contact info";
			$args = array(); //This will get passed to the add method

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(trim($this->put('phone_cell')) != "")
			{
				$args['phone_cell'] = urldecode(trim($this->put('phone_cell')));
			}

			if(trim($this->put('phone_work')) != "")
			{
				$args['phone_work'] = trim($this->put('phone_work'));
			}

			$args['users_id'] = $this->mainModel->id;

			if((int)trim($this->put('locations_id')) > 0)
			{
				$args['locations_id'] = (int)trim($this->put('locations_id'));
			}

			$contact_model = ORM::factory("User_Contact");

			$result = $contact_model->editContact($args);

			//Check for success / error
			if(get_class($result) == get_class($contact_model))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$contact_model->error_message_path);
				return false;
			}
		}
		
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

			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
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

		/**
		 * action_put_gpa() Update the Grade Point Average for a user for a given year.
		 * via /api/user/gpa/{users_id}
		 *
		 */
		public function action_put_gpa()
		{
			$this->payloadDesc = "Update the Grade Point Average for a user for a given year.";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// year (REQUIRED)
			// A 4 digit integer for the year.

			if(trim($this->put('year')) != "")
			{
				$arguments["year"] = strtolower(trim($this->put('year')));
			}

			if(trim($this->put('gpa')) != "")
			{
				$arguments["gpa"] = trim($this->put('gpa'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$arguments['users_id'] = $this->mainModel->id;
			if(!$this->user->can('Assumeownership', array('owner' => $arguments['users_id']))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			$gpa_model = ORM::factory("Academics_Gpa");
			$result = $gpa_model->updateGpa($arguments);
			if(get_class($result) == get_class($gpa_model))
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
		 * action_put_testscore() Update a given test score for a user.
		 * via /api/user/testscore/{users_id}
		 *
		 */
		public function action_put_testscore()
		{
			$this->payloadDesc = "Update a given test score for a user.";
			$arguments = array();

			if((int)trim($this->put('academics_tests_topics_id')) > 0)
			{
				$arguments["academics_tests_topics_id"] = (int)trim($this->put('academics_tests_topics_id'));
			}

			if(trim($this->put('score')) != "")
			{
				$arguments["score"] = trim($this->put('score'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$arguments['users_id'] = $this->mainModel->id;
			if(!$this->user->can('Assumeownership', array('owner' => $arguments['users_id']))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			$score_model = ORM::factory("Academics_Tests_Scores");
			$result = $score_model->updateTestScore($arguments);
			if(get_class($result) == get_class($score_model))
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

		public function action_put_teamseasons()
		{
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if((int)trim($this->put('orgs_id')) > 0)
			{
				$orgs_id = $this->put('orgs_id');
			}
			else
			{
				$error_array = array(
					"error" => "Organization ID is a required field",
				);
				$this->addError($error_array,true);
				return false;
			}

			if((int)trim($this->put('sports_id')) > 0)
			{
				$sports_id = $this->put('sports_id');
			}
			else
			{
				$error_array = array(
					"error" => "Sports ID is a required field",
				);
				$this->addError($error_array,true);
				return false;
			}

			$osl = ORM::factory('Sportorg_Orgsportlink')
				->where('orgs_id','=',$orgs_id)
				->where('sports_id','=',$sports_id)
				->find();

			if(!$osl->loaded())
			{
				unset($osl);
				$osl = ORM::factory('Sportorg_Orgsportlink');
				$osl->orgs_id = $orgs_id;
				$osl->sports_id = $sports_id;
				$osl->save();
			}

			foreach($this->put('comp_levels') as $cl_obj)
			{
				$complevel_id = $cl_obj->complevel_id;

				foreach($cl_obj->seasons as $season_obj)
				{

					//Set up args array for addteam
					$args = array(
						'orgs_id' => $orgs_id,
						'sports_id' => $sports_id,
						'complevels_id' => $complevel_id,
						'seasons_arr' => array($season_obj->season_id), // this has to be an array to be handled by addTeam method
						'year'=>$season_obj->year,
						'positions' => Util::obj_arr_toggle($season_obj->positions),
					);

					if(isset($season_obj->unique_ident))
					{
						$args['unique_ident'] = $season_obj->unique_ident;
					}

					$result = $this->mainModel->addTeam($args);
					if(get_class($result) == 'ORM_Validation_Exception')
					{
						//print_r($args);
						//parse error and add to error array
						$this->processValidationError($result,$this->mainModel->error_message_path);
						return false;

					}

				}

				// Get Team:
				/*



				*/

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
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Delete a User";

		    if(!$this->mainModel->id)
            {
                $this->modelNotSetError();
                return false;
            }
            //return $this->mainModel->delete();
			return $this->mainModel->delete_with_deps(false);
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

			//permission check
			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
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

            if (!$this->mainModel->deleteTeam($arguments)){
				$error_array = array(
					"error" => "User teams link doesn't exist",
					"desc" => "User teams link doesn't exist."
				);

				$this->modelNotSetError($error_array);
				return false;
			}
			return null;
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

			//permission check
			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
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

			if (!$this->mainModel->deleteSport($arguments)){
				$error_array = array(
					"error" => "User sport link doesn't exist",
					"desc" => "User sport link doesn't exist."
				);

				$this->modelNotSetError($error_array);
				return false;
			}

        }

		/**
		 * action_delete_position() Delete a position for a user / team association
		 * via /api/user/position/{users_id}
		 *
		 */
		public function action_delete_position()
		{
			$this->payloadDesc = "Delete a position for a user / team association";
			$this->populateAuthVars();

			// Must be owner
			if(!$this->is_admin && !($this->mainModel->id == Auth::instance()->get_user()->id) )
			{
				$this->throw_permission_error(Constant::NOT_OWNER);
				return false;
			}

			$arguments = array();

			// CHECK FOR PARAMETERS:

			// teams_id
			// This is the ID of the Team we are deleting the position from.
			if((int)trim($this->delete('teams_id')) > 0)
			{
				$arguments["teams_id"] = (int)trim($this->delete('teams_id'));
			}

			// positions_id
			// the ID of the position
			if((int)trim($this->delete('positions_id')) > 0)
			{
				$arguments["positions_id"] = (int)trim($this->delete('positions_id'));
			}

			$arguments["users_id"] = $this->mainModel->id;
			if (!$this->mainModel->delete_position($arguments)){
				$error_array = array(
					"error" => "User position doesn't exist",
					"desc" => "User position doesn't exist."
				);

				$this->modelNotSetError($error_array);
				return false;
			}

		}
		
		/**
		 * action_delete_role() Delete a user's Role
		 * via /api/user/role/{users_id}/roles_id
		 *
		 */
		public function action_delete_role()
		{
			$this->payloadDesc = "Delete a user's Role";

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
			//permission check
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			if($this->mainModel->id)
			{
				if (!$this->mainModel->deleteRole($arguments)){
					$error_array = array(
						"error" => "User role link doesn't exist",
						"desc" => "User role link doesn't exist."
					);

					$this->modelNotSetError($error_array);
					return false;
				}
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

			//permission check
			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}
			$arguments = array();

			if( trim($this->delete('identity_id')) != "")
			{
				$arguments["identity_id"] = trim($this->delete('identity_id'));
				if (!Valid::identity_exist($arguments["identity_id"])){
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
				$error_array = array(
					"error" => "Required Parameter Missing",
					"desc" => "This is the ID of the identity from which to disassociate the user."
				);
				$this->modelNotSetError($error_array);

				return false;
			}

			if (!$this->mainModel->deleteIdentity($arguments)){
				$error_array = array(
					"error" => "User identity doesn't exist",
					"desc" => "User identity doesn't exist."
				);

				$this->modelNotSetError($error_array);
				return false;
			}
		}

		/**
		 * action_delete_gpa() Delete a GPA for a given user / year
		 * via /api/user/gpa/{users_id}
		 *
		 */
		public function action_delete_gpa()
		{
			$this->payloadDesc = "Delete a GPA for a given user / year";
			$arguments = array();

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			//permission check
			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			if(trim($this->delete('year')) != "")
			{
				$arguments["year"] = trim($this->delete('year'));
				if (!in_array(ucfirst($arguments["year"]), array('Junior', 'Senior', 'Freshman', 'Sophomore'))){
					$error_array = array(
						"error" => "Invalid year",
						"desc" => "Invalid year"
					);
					$this->modelNotSetError($error_array);
					return false;
				}
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing, Only 'Junior', 'Senior', 'Freshman', 'Sophomore' are acceptable",
					"param_name" => "year"
				);
				// Set whether it is a fatal error
				$is_fatal = true;
				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			$arguments['users_id'] = $this->mainModel->id;
			if (!$this->mainModel->delete_gpa($arguments)){
				$error_array = array(
					"error" => "User gpa doesn't exist",
					"desc" => "User gpa doesn't exist."
				);

				$this->modelNotSetError($error_array);
				return false;
			}

		}

		/**
		 * action_delete_testscore() Delete a Test Score for a user.
		 * via /api/user/testscore/{users_id}
		 *
		 */
		public function action_delete_testscore()
		{
			$this->payloadDesc = "Delete a Test Score for a user.";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// test_score_id (REQUIRED)
			// The ID of the test score to delete

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			//permission check
			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->id))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}

			if((int)trim($this->delete('academics_tests_topics_id')) > 0)
			{
				$arguments["academics_tests_topics_id"] = (int)trim($this->delete('academics_tests_topics_id'));
			}

			if (!$this->mainModel->delete_tests_score($arguments)){
				$error_array = array(
					"error" => "User test score doesn't exist",
					"desc" => "User test score doesn't exist."
				);

				$this->modelNotSetError($error_array);
				return false;
			}

			//$arguments['users_id'] = $this->mainModel->id;
		}

		public function action_delete_contact()
		{
			$this->payloadDesc = "Delete contact info";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if (!$this->mainModel->delete_contact()){
				$error_array = array(
					"error" => "User contact info doesn't exist",
					"desc" => "User contact info doesn't exist."
				);

				$this->modelNotSetError($error_array);
				return false;
			}
		}

		public function action_get_demo(){
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			 return $this->mainModel->get_new_basics();
		}
		
	}