<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Game API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Game extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic information about the game
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
		 * get_teams() All teams competing in the game
		 *
		 * @retun array
		 */
		public function get_teams()
		{
			$retArr = $this->obj->result;

			return $retArr;
		}
		
		/**
		 * get_location() Returns the location of a game
		 *
		 * @retun array
		 */
		public function get_location()
		{
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		public function get_teamrosters(){
			return $this->obj->result;
		}

		public function post_addcomments()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_matches() List of all matches within a given game
		 *
		 * @retun array
		 */
		public function get_matches()
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
		 * get_videos() Get all videos tagged with a certain game
		 *
		 * @retun array
		 */
		public function get_videos()
		{
			$videos = $this->obj->result;
			return $videos;
		}
		
		/**
		 * get_images() Get all images associated with a certain game
		 *
		 * @retun array
		 */
		public function get_images()
		{
			$images = $this->obj->result;
			return $images;
		}

		/**
		 * get_search() Search for a game based on several parameters
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

		/**
		 * post_add() Add a new game
		 *
		 * @retun array
		 */
		public function post_add()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_addteam() Add a new team to this game
		 *
		 * @retun array
		 */
		public function post_addteam()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_addmatch() Add a new match to this game
		 *
		 * @retun array
		 */
		public function post_addmatch()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_addvideo() Post a new video for this game
		 *
		 * @retun array
		 */
		public function post_addvideo()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_addimage() Post a new image for this game
		 *
		 * @retun array

		public function post_addimage()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		*/

		/**
		 * put_basics() Update Basic information about the game
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
		 * put_score() Change the score for this game for a given team
		 *
		 * @retun array
		 */
		public function put_score()
		{
			// Scaffolding Code For Single:
			return $this->obj->getBasics();
		}

		
		/**
		 * delete_base() Delete a Game
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			return null;
		}
		
	}