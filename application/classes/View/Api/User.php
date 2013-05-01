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
			 
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
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
			$objs = $this->obj->find_all();
			 
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}
			return $retArr;
		}
		
		/**
		 * get_orgs() List of organizations the user is associated with
		 *
		 * @retun array
		 */
		public function get_orgs()
		{
			$retArr = array();
		
			$objs = $this->obj->find_all();
			 
			foreach($objs as $obj)
			{
				$org_sport_link = $obj->getBasics();
				$org = $org_sport_link['org'];
				$retArr[$org['id']] = $org;
			}
		 	
			return $retArr; 
		}
		
		/**
		 * get_related() Content related to this user to be displayed on the "related content" pane
		 *
		 * @retun array
		 */
		public function get_related()
		{
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
			$retArr = array();
			$videos = $this->obj->find_all();
			foreach($videos as $video)
			{
				$retArr[$video->id] = $video->getBasics();
			}
			return $retArr;
		}
		
		/**
		 * get_images() List of images uploaded by the user
		 *
		 * @retun array
		 */
		public function get_images()
		{
			$retArr = array();
			$images = $this->obj->find_all();
			foreach($images as $image)
			{
				$retArr[$image->id] = $image->getBasics();
			}
			return $retArr;
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
			$retArr = array();

			$comments = $this->obj->find_all();
			foreach($comments as $comment)
			{
				$retArr[$comment->id] = $comment->getBasics();
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
				$retArr[$fb['id']] = $fb;
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
			$comments = $this->obj->find_all();
			foreach($comments as $comment)
			{
				$retArr[$comment->id] = $comment->getBasics();
			}
			 
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
			$retArr = array();
			// Scaffolding Code For Array:
			$retArr = $this->obj->getBasics();

			return $retArr;
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
			$retArr = array(); 

			return $retArr;
		}
		
		/**
		 * post_addidentity() Add an aditional identity to this user's profile
		 *
		 * @retun array
		 */
		public function post_addidentity()
		{
			$retArr = array();
 
			return $retArr;
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
		 * delete_base() Delete a User
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			$retArr = array(); 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_team() Delete the user / team assosication
		 *
		 * @retun array
		 */
		public function delete_team()
		{
			$retArr = array();
 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_sport() Delete the user / sport association
		 *
		 * @retun array
		 */
		public function delete_sport()
		{
			$retArr = array();
 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_role() Delete a user's Role
		 *
		 * @retun array
		 */
		public function delete_role()
		{
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_identity() Delete a User's Identity
		 *
		 * @retun array
		 */
		public function delete_identity()
		{
			$retArr = array();
 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
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
			// Get user facebook task
			$retArr =  $this->obj->get_user();
			return $retArr;
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
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}
			if (empty($retArr)){
				return null;
			}
			return $retArr;
		}
	}