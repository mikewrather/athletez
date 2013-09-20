<?php defined('SYSPATH') or die('No direct script access.');

/**
 * User API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_User extends Api_Viewclass
	{

	
		/**
		 * get_basics() Basic information about the user.
		 *
		 * @retun array
		 */
		public function get_basics()
		{
			$retArr = $this->obj->getBasics();
			return $retArr;
		}

		public function get_demo(){
			return $this->obj;
		}
		
		/**
		 * get_teams() List of teams the user is associated with
		 *
		 * @retun array
		 */
		public function get_teams()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();

			foreach($objs as $index => $obj)
			{
				$retArr[$index] = $obj->getBasics();
				$retArr[$index]['team_location'] = array();
			}

			if (empty($retArr)){
				return null;
			}
 
			return $retArr;
		}
		
		/**
		 * get_sports() List of sports that the user is associated with
		 *
		 * @retun array
		 */
		public function get_sports()
		{
			$retArr = array();
			// Scaffolding Code For Array:

			$objs = $this->obj->execute();
			foreach($objs as $obj)
			{
				$sport = ORM::factory('Sportorg_Sport',$obj['sports_id']);
				$retArr[$sport->id] = $sport->getBasics();
				$retArr[$sport->id]['primary_position'] = ORM::factory('Sportorg_Position',$obj['positions_id'])->name;
				$retArr[$sport->id]['team_type'] = $obj['sport_type'];
				$retArr[$sport->id]['social_links'] = array();
			}

			if (empty($retArr)){
				return null;
			}
			return $retArr;
		}
		
		/**
		 * get_orgs() List of organizations the user is associated with team and schedule data
		 *
		 * @retun array
		 */
		public function get_orgs()
		{
			if(is_array($this->obj['result']))
			{
				$orgs = $this->obj['result'];
			}
			elseif(is_object($this->obj->result))
			{
				$orgs = Util::obj_arr_toggle($this->obj->result);
			}
			else
			{
				return null;
			}

		//	print_r($orgs);

			$neworgs = null;
			foreach($orgs as $key=>&$org)
			{
			//	print_r($org);
				if($key=='groupby') continue;

				if(isset($org['sports']))
				{
					foreach($org['sports'] as &$sport)
					{
						$new_complevels = array();
						foreach($sport['complevels'] as &$team)
						{
						//	$new_complevels[] = $this->_team_loop($team);
						}
						//$sport['complevels'] = $new_complevels;
					}
				}
				elseif(isset($org['teams']))
				{
					foreach($org['teams'] as &$team)
					{
						$team = $this->_team_loop($team);
					}
				}
				$neworgs[] = $org;
			}
			return $neworgs;
		}

		protected function _team_loop(&$team)
		{

			$team_obj = is_object($team) ? ORM::factory('Sportorg_Team', $team->team_id) :  ORM::factory('Sportorg_Team', $team['team_id']);

			$schedule = $team_obj->getSchedule(3,true);

		//	$schedule[] = array(); //I put this in because I kept getting an error from the foreach if i didn't do this.
			$sArr = array();
			foreach($schedule as $game)
			{
				if(is_object($game)) $sArr[] = $game->getBasics();
			}

			$team['schedules'] = $sArr;

			return $team;
		}
		
		/**
		 * get_related() Content related to this user to be displayed on the "related content" pane
		 *
		 * @retun array
		 */
		public function get_related()
		{
		
			$retArr = array(
				"num_fans" => NULL,
				"num_votes" => NULL,
				"teams" => array(),
				"user_id" => NULL,
				"user_name" => NULL,
				"user_picture" => NULL
			);
			return $retArr;
			/*
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
			
			$retArr = array();
			$teams_links = $this->obj->find_all();
			
			foreach($teams_links as $teams_link)
			{ 
				$teams = array();
				$tl = $teams_link->getBasics();							
				$team = $tl['team'];								
				$org = $team['org_sport_link']['org'];
				$teams['org'] = $org['name'];
				$sport = $team['org_sport_link']['sport'];
				$teams['sport'] = $sport['name'];
				$teams['season'] = $team['season']['name'];  
				$teams['year'] = $team['year'];
				
				$positions_list = $teams_link->positions;
				$position = array();
				foreach($positions_list as $pos )
				{
					array_push($position, $pos['name']);	
				}
				
				$teams['position'] = $position;
				$user = $teams_link->user->getBasics(); 
				$first_name = $user['first_name'];
				$last_name = $user['last_name'];
				
				$user_name = $first_name.' '.$last_name;					
				$payload = array();
				$payload['user_id'] = $user['id'];
				$payload['user_name'] = $user_name;				
				$payload['user_picture'] = null; 	//TODO: Add To Database - user_picture : string
				$payload['num_votes'] = 0;			//TODO: Add To Database - num_votes : integer
				$payload['num_fans'] = 0;			//TODO: Add To Database - num_fans : integer
				$payload['teams'] = $teams;
				
				array_push($retArr, $payload); 
			} 
			*/ 
			return $retArr = array();
		}
		
		/**
		 * get_videos() List of videos uploaded by the user
		 *
		 * @retun array
		 */
		public function get_videos()
		{
			$videos = $this->obj->result;
			return $videos;
		}

		public function get_references(){
			$retArr = null;
			//array('sports_id' => array('sport_name'));
			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			$grouped_array = array();
			$references_arr = array();
			$sports_id = "";
			foreach($objs as $obj)
			{
				$basic = $obj->getBasics();
				if ( $basic['sports_id'] != $sports_id){
					unset($references_arr);
				}
				$sports_id = $basic['sports_id'];

				$obj = new stdClass();
				$obj->name = $basic['sport']['sport_name'];
				$obj->sports_name = $basic['sport']['sport_name'];
				$obj->sports_id = $sports_id;
				$references_arr[] = $basic;
				$obj->references = $references_arr;
				$grouped_array[$sports_id] = $obj;
				$retArr = $grouped_array;
			}

			$results = null;
			if ($retArr)
				foreach($retArr as $b){
					$results[] = $b;
				}

			return $results;
		}

		public function get_contact(){
			$retArr = $this->obj->find();
			if (!$retArr->loaded()){
				return null;
			}
			$retArr = $retArr->getBasics();
			return $retArr;
		}

		public function get_awards(){
			$retArr = null;

			$objs = $this->obj->find_all();
			$grouped_array = array();
			$awards_arr = array();
			$sports_id = "";
			foreach($objs as $obj)
			{
				$basic = $obj->getBasics();
				if ( $basic['sports_id'] != $sports_id){
					unset($awards_arr);
				}
				$sports_id = $basic['sports_id'];
				$obj = new stdClass();
				$obj->id = $sports_id;
				$obj->name = $basic['sport']['sport_name'];
				$awards_arr[] = $basic;
				$obj->awards = $awards_arr;
				$grouped_array[$sports_id] = $obj;

				$retArr = $grouped_array;
			}
			$results = null;
			if ($retArr)
				foreach($retArr as $b){
					$results[] = $b;
				}

			return $results;
		}
		
		/**
		 * get_images() List of images uploaded by the user
		 *
		 * @retun array
		 */
		public function get_images()
		{
		//	print_r($this->obj);
			$images = $this->obj->result;
			return $images;
		}

		
		/**
		 * get_commentsof() Get a list of the comments made by the user
		 *
		 * @retun array
		 */
		public function get_commentsof()
		{
			$retArr = array();

			$comments = $this->obj->find_all();
			foreach($comments as $comment)
			{
				$retArr[$comment->id] = $comment->getBasics();
				$retArr[$comment->id]['poster']	= $retArr[$comment->id]['user']['user_name'];
				$retArr[$comment->id]['poster_picture']	= $retArr[$comment->id]['user']['user_picture'];
                $retArr[$comment->id]['poster_email']    = $retArr[$comment->id]['user']['email'];
				$retArr[$comment->id]['comment_date'] = NULL;
			}

			return $retArr;
		}

		/**
		* get_commentson() Get a list of comments related to the user
		*
		* @retun array
		*/
		public function get_commentson()
		{
			$retArr = null;

			$comments = $this->obj->find_all();
			foreach($comments as $comment)
			{
				$gb = $comment->getBasics();

				$retArr[$comment->id] = $gb;
				$retArr[$comment->id]['poster'] = $retArr[$comment->id]['user']['name'];
				$retArr[$comment->id]['poster_picture'] = $retArr[$comment->id]['user']['user_picture'];
				$retArr[$comment->id]['poster_email']    = $retArr[$comment->id]['user']['email'];
			}

			return $retArr;
		}

		/**
		 * get_fitnessbasics() Get the basic fitness data for the user
		 *
		 * @retun array
		 */
		public function get_fitnessbasics()
		{
			// Scaffolding Code For Single:
			//$retArr = $this->obj->getResumeData();
			$retArr = array();

			$fitnessbasics = $this->obj; 

			foreach($fitnessbasics as $fb)
			{	
				$retArr[] = $fb;
			}
			if (empty($retArr)){
				return null;
			}
			return $retArr;
		}

		/**
		 * get_primaryvideo() Get the primary video to be displayed on a user profile page
		 *
		 * @retun array
		 */
		public function get_primaryvideo()
		{
			$retArr = array(); 
			// Scaffolding Code For Single:
			$video_meta = $this->obj;

			foreach($video_meta as $name => $meta)
			{
				$retArr[$name] = $meta;
			}
			 
			return $retArr;
		}

		/**
		 * get_sent_resumes() Retrieve all resumes this user has sent to college coaches.
		 *
		 * @retun array
		 */
		public function get_sent_resumes()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}
			return $retArr;
		}

		/**
		 * get_rdtree() rdtree sands for Resume Data Tree.  This method will retrieve all resume data groups  that a specific user should fill out based on his / her sports and positions.  Each group has a list of profiles and data values for the user.
		 *
		 * @retun array
		 */
		public function get_rdtree()
		{
			return $this->obj->getResumeDataTree();
		}

		/**
		 * get_gpa() Get this user's GPA for all years there are values for.
		 *
		 * @retun array
		 */
		public function get_gpa()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}
			return $retArr;
		}

		/**
		 * get_tests() Get all academic tests that the user has scores for.  Tests can be filtered by "Standardized" and "AP" formats.
		 *
		 * @retun array
		 */
		public function get_tests()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();

			foreach($objs as $obj)
			{
				$obj->setUserID($this->obj->getUserID());
				$retArr[] = $obj->getBasics();
			}
			return $retArr;
		}

		/**
		 * post_addtestscore() This will allow a user to add a score for an Academic Test Topic
		 *
		 * @retun array
		 */
		public function post_addtestscore()
		{
			$retArr = $this->obj->getBasics();
			return $retArr;
		}

		/**
		 * post_add() Create a new user with all necessary basic information (possibly first step of registration)
		 *
		 * @retun array
		 */
		public function post_add()
		{
			$retArr = array(); 
		 
			return $retArr;
		}
		
		/**
		 * post_addteam() Add a new team association for a user
		 *
		 * @retun array
		 */
		public function post_addteam()
		{
			if(is_array($this->obj))
			{
				$retArr = array();
				foreach($this->obj as $team)
				{
					$retArr[] = $team->getBasics();
				}
			}
			elseif(is_object($this->obj))
			{
				return $this->obj->getBasics();
			}
		}
		
		/**
		 * post_addsport() Add a new sport association for a user
		 *
		 * @retun array
		 */
		public function post_addsport()
		{			 
			return $retArr;
		}
		
		/**
		 * post_addrole() Add a new role for this User
		 *
		 * @retun array
		 */
		public function post_addrole()
		{
			return $this->obj->getBasics();
		}

		/**
		 * post_addcomment() This will add a comment to the "fanboard" for this user's profile page.
		 *
		 * @retun array
		 */
		public function post_addcomment()
		{
			return $this->obj->getBasics();
		}

		/**
		 * put_basics() Update basic information about the user
		 *
		 * @retun array
		 */
		public function put_basics()
		{
			$retArr = array();
 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_team() Update the user / team assosication (for future use)
		 *
		 * @retun array
		 */
		public function put_team()
		{
			$retArr = array();
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_sport() Update the user / sport association (for future use)
		 *
		 * @retun array
		 */
		public function put_sport()
		{
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_fitnessbasics() Update basic fitness data for the user
		 *
		 * @retun array
		 */
		public function put_fitnessbasics()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		/**
		 * put_teamseasons() Update basic fitness data for the user
		 *
		 * @retun array
		 */
		public function put_teamseasons()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_base() Delete a User
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			return null;
		}
		
		/**
		 * delete_team() Delete the user / team assosication
		 *
		 * @retun array
		 */
		public function delete_team()
		{
			return null;
		}
		
		/**
		 * delete_sport() Delete the user / sport association
		 *
		 * @retun array
		 */
		public function delete_sport()
		{
			return null;
		}

		/**
		 * delete_position() Delete a position for a user / team association
		 *
		 * @retun array
		 */
		public function delete_position()
		{
			return null;
		}

		
		/**
		 * delete_role() Delete a user's Role
		 *
		 * @retun array
		 */
		public function delete_role()
		{
			return null;
		}
		
		/**
		 * delete_identity() Delete a User's Identity
		 *
		 * @retun array
		 */
		public function delete_identity()
		{
			return null;
		}
		
		/**
		 * post_position() Add a Position for a user
		 *
		 * @retun array
		 */
		public function post_position()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		/**
		 * post_register() This is different than add in that it will also log the person in and send verification email.
		 *
		 * @retun array
		 */
		public function post_register()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_fbreg() Get facebook user information
		 *
		 * @retun array
		 */
		public function post_fbreg()
		{
		//	print_r($this->obj);
			// Get user facebook task
			$retArr =  $this->obj;
			return $retArr;
		}

		/**
		 * get_fbreg() Get facebook user information
		 *
		 * @retun array
		 */
		public function get_fbreg()
		{
			return $this->post_fbreg();
		}



		/**
		 * post_savecrop() This is the method that can save the cropping information for an image being used as userpic.  It differs from those in the media controller in that it assumes this is going to be a userpic.
		 *
		 * @retun array
		 */
		public function post_savecrop()
		{
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();
			return $retArr;
		}

		/**
		 * post_fbpics() This is the method return facebook user photos.
		 *
		 * @retun array
		 */
		public function get_fbpics()
		{
			$retArr = array();
			
			//Get facebook login users photos
			$retArr =  $this->obj->get_photos();
			
			return $retArr;
		}

		/**
		 * get_search() Search for users based on various criteria
		 *
		 * @retun array
		 */
		public function get_search()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->execute();

			foreach($objs as $obj)
			{
				$user = ORM::factory('User_Base',$obj['users_id']);
				$retArr[] = $user->getBasics();
			}

			return $retArr;
		}

		/**
		 * post_addgpa() Add a GPA for a given year
		 *
		 * @retun array
		 */
		public function post_addgpa()
		{
			$retArr = $this->obj->getBasics();
			return $retArr;
		}

		/**
		 * post_gpa() Add a GPA for a given year
		 * It is an alias for addgpa
		 *
		 * @retun array
		 */
		public function post_gpa()
		{
			return $this->post_addgpa();
		}

		/**
		 * put_testscore() Update a given test score for a user.
		 *
		 * @retun array
		 */
		public function put_testscore()
		{
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		/**
		 * put_gpa() Update the Grade Point Average for a user for a given year.
		 *
		 * @retun array
		 */
		public function put_gpa()
		{
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		/**
		 * delete_testscore() Delete a Test Score for a user.
		 *
		 * @retun array
		 */
		public function delete_testscore()
		{
			return null;
		}

		/**
		 * delete_gpa() Delete a GPA for a given user / year
		 *
		 * @retun array
		 */
		public function delete_gpa()
		{
			return null;
		}

		public function post_contact()
		{
			$retArr = null;
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		public function put_contact()
		{
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		public function delete_contact(){
			return null;
		}


	}