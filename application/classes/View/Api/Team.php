<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Team API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Team extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic info on a given team
		 *
		 * @retun array
		 */
		public function get_basics()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_games() Get all games for a given team
		 *
		 * @retun array
		 */
		public function get_games()
		{
			$retArr = null;
			// Scaffolding Code For Single:
			$objs = $this->obj->find_all();
			
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}

			if (empty($retArr)){
				return null;
			}
			
			return $retArr;
		}
		
		/**
		 * get_roster() Get the players for a given team
		 *
		 * @retun array
		 */
		public function get_roster()
		{
			$retArr = null;
			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			 
			foreach($objs as $obj)
			{
				$combine_obj = new stdClass();
				$basics = $obj->getBasics();

				$position_name = $this->obj->getPositionByUserteamslinkid($obj->id);
				$sport_name = $basics['team']['org_sport_link']['sport']['sport_name'];
				$combine_obj->name = $basics['user']['name'];
				$combine_obj->user_picture = $basics['user']['user_picture'];
				$combine_obj->grad_year = $basics['user']['grad_year'];
				$combine_obj->sport_name = $sport_name;
				$combine_obj->position = $position_name;
				$combine_obj->num_votes = $basics['user']['num_votes'];
				$combine_obj->num_followers = $basics['user']['num_followers'];

				$retArr[] = $combine_obj;
			}

			return $retArr;
		}

		/**
		 * get_search() Search for a team
		 *
		 * @retun array
		 */
		public function get_search()
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

		public function get_recent_schedules()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->result;
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}

			return $retArr;
		}

		public function get_upcoming_schedules()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->result;
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}

			return $retArr;
		}

		public function get_comments()
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


		public function post_images()
		{
			return $this->post_addimage();
		}

		/**
		 * post_add() Add a new team
		 *
		 * @retun array
		 */
		public function post_add()
		{
			$retArr = array();
			$retArr = $this->obj->getBasics();
			return $retArr;
		}
		
		/**
		 * post_game() Add a new game to a team's schedule
		 *
		 * @retun array
		 */
		public function post_game()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}


		
		/**
		 * post_player() Add a new player to the roster
		 *
		 * @retun array
		 */
		public function post_player()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_basics() Update Basic info on a given team
		 *
		 * @retun array
		 */
		public function put_basics()
		{
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_gamelink() Update the link between teams and games which contains score information
		 *
		 * @retun array
		 */
		public function put_gamelink()
		{
			$retArr = array();
 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_base() Delete a team
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			$retArr = array();
 
			// Scaffolding Code For Single:
			$retArr = $this->obj;  

			return $retArr;
		}
		
		/**
		 * delete_gamelink() Delete a team from a game
		 *
		 * @retun array
		 */
		public function delete_gamelink()
		{
			$retArr = array();
 
			// Scaffolding Code For Single:
			$retArr = $this->obj;
			return $retArr;
		}
		
	}