<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Sport API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Sport extends Api_Viewclass
	{



	
		/**
		 * get_basics() Provides basic information about a sport
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
		 * get_listall() Retrives a list of all sports narrowed by a number of optional criteria
		 *
		 * @retun array
		 */
		public function get_listall()
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
		 * get_positions() Lists all positions for a given sport
		 *
		 * @retun array
		 */
		public function get_positions()
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
		 * get_type() Get the type of sport
		 *
		 * @retun array
		 */
		public function get_type()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_videos() Videos associated with a given sport
		 *
		 * @retun array
		 */
		public function get_videos()
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
		 * get_images() Images associated with a given sport
		 *
		 * @retun array
		 */
		public function get_images()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_resumedata() Retrieves resume data related to the sport
		 *
		 * @retun array
		 */
		public function get_resumedata()
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
		 * get_statistics() Gets statistics associated with a given sport
		 *
		 * @retun array
		 */
		public function get_statistics()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			//print_r($this->obj->find()->as_array());

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_stattabs() Gets the statistics tabs for a given sport
		 *
		 * @retun array
		 */
		public function get_stattabs()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_users() Gets all users for a given sport
		 *
		 * @retun array
		 */
		public function get_users()
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
		 * post_add() Add a new Sport
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
		 * post_position() Add a new position for a given sport
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
		
		/**
		 * put_basics() Update basic information about a sport
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
		 * put_type() Update the type of sport
		 *
		 * @retun array
		 */
		public function put_type()
		{
			$retArr = array();
 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_base() Delete Resume Data Profile
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj; 
			return $retArr;
		}
		
	}