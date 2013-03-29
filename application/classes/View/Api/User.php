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
						  
			$retArr['grad_year'] = null; 		//TODO: Add To Database - grad_year : string
			$retArr['user_picture'] = null; 	//TODO: Add To Database - user_picture : string
			$retArr['user_weight'] = null; 		//TODO: Add To Database - user_weight : string
			$retArr['user_height'] = null; 		//TODO: Add To Database - user_height : string
			$retArr['num_followers'] = 0; 		//TODO: Write getNumberFollowers() method for User Model
			$retArr['num_votes'] = 0; 			//TODO: Write getNumberVotes() method for User Model
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
			$user_teams = $this->obj->find_all();
			foreach($user_teams as $user_team)
			{
				$this_team = $user_team->team;
				$team = array();
				$team['team_name'] = method_exists($this_team,'name') ? $this_team->name() : $this_team->name;
				$team['team_location'] = $this_team->getLocation()->name();
				array_push($retArr, $team);
			}
			/*
			foreach($this->obj->teams->find_all() as $team)
			{
				$response = Request::factory('/api/team/basics/'.$team->id.'?users_id='.$this->obj->id)->execute();
				$retArr[$team->id] = $response->body;
			}*/
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
			$user_sports = $this->obj;
		 		
			// through User_sport_link
			foreach($user_sports as $user_sport )
			{					 
				$sport_info = $user_sport->find_all();	
			  
				foreach($sport_info as $us )
				{  
					$retArr[$us->id] = $us->getBasics();	
				} 
			}	
			
			// through User_team_link
			//$response = Request::factory('/api/user/sports/'.$this->obj->id)->execute();
        	//var_dump( $response );
						
			/*					
			$teams = $this->obj->teams->group_by('org_sport_link_id')->find_all();
			foreach($teams as $team)
			{
				$sport = $team->getSport();
				$retArr[$sport->id] = $sport->getBasics();
			}*/
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
		
			$teams_links = $this->obj->find_all();
			 
			foreach($teams_links as $teams_link)
			{ 
				$teams = array(); 
				$tl = $teams_link->getBasics();
				$team = $tl['team'];
				
				
				$teams['team_id'] = $team['id'];
				$teams['year'] = $team['year'];
				$teams['complevel'] = $team['complevel']['name'];
				$teams['season'] = $team['season']['name'];
				
				// get the game list by team.id
				$schedule_list = $teams_link->team->getSchedule();
				
				foreach($schedule_list as $schedule)
				{
					$schedules = array();								// game obj
					$schedules['schedule_id'] = $schedule->id;			// game id
					$schedules['schedule_date'] = $schedule->gameDay;	// game day
					$schedules['schedule_summary'] = $schedule->points_scored;
					 
					// add the other teams				
					$other_teams_obj = ORM::factory('Sportorg_Games_Teamslink')				
										->join('games')
											->on('games.id','=','sportorg_games_teamslink.games_id')		
										->where('sportorg_games_teamslink.teams_id', '!=', $team['id'] )
										->and_where('games.id', '=', $schedule->id)->find_all();
										
					foreach( $other_teams_obj as $other_team )
					{
						$o_team = $other_team->team;
						
						$schedules['other_team'][$other_team->id] = $o_team;
					}
					$teams['schedules'][$schedule->id] = $schedules;	 					
				} 
				 
				$org_id = $team['org_sport_link']['org']['id'];
				$org_name = $team['org_sport_link']['org']['name'];
				
				// StatVals
				$statvals_list = $teams_link->team->statvals;
				$statvals = array();
				 
				foreach($statvals_list as $sv)
				{
					$statval = $sv->getBasics();
					array_push($statvals, $statval['statval']);
					
					$stats = $sv->stat->getBasics();
					$stat_name = $stats['name'];					
					 
				}
				
				$payload['statvals'] = $statvals;
				$payload = array();
				$payload['org_id'] = $org_id;
				$payload['org_name'] = $org_name;
				$payload['teams'] = $teams;
				
				array_push($retArr, $payload); 
			} 
		 	
			return $retArr;
			/*
			$teams = $this->obj->teams->group_by('org_sport_link_id')->find_all();
			foreach($teams as $team)
			{
				$org = $team->getOrg();
				$response = Request::factory('/api/org/basics/'.$org->id.'?users_id='.$this->obj->id)->execute();
				$retArr[$org->id] = $response->body;
			}*/
			
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
			$images = $this->obj->getImages();
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
			
			$fitnessbasics = $this->obj->find_all();
			
			foreach($fitnessbasics as $fb)
			{
				$fitness = array();
				$fitness_data_value = $fb->getBasics();
				$fitness_data = $fb->fitness_data->getBasics();
				
				$fitness['name'] = $fitness_data['fitness_test'];
				$fitness['val'] = $fitness_data_value['user_value'];				
				$fitness['units'] = $fitness_data['unit_type'];
				
				array_push($retArr, $fitness);
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

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

			// Scaffolding Code For Single:
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
			$retArr = array();
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

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

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

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

			// Scaffolding Code For Single:
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

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

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

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

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

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

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

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

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

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

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

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
	}