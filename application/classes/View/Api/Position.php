<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Position API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Position extends Api_Viewclass
	{



	
		/**
		 * get_listall() Lists available positions.
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
		 * get_players() Retrives all players for a given position narrowed by other optional criteria
		 *
		 * @retun array
		 */
		public function get_players()
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
		 * get_defaultstattab() Gets the default statistics tab to select for a given position
		 *
		 * @retun array
		 */
		public function get_defaultstattab()
		{
			$retArr = array();
 			// Scaffolding Code For Single:
			$retArr = $this->obj; 

			return $retArr;
		}
		
		/**
		 * get_sport() Gets the sport associated with a given position
		 *
		 * @retun array
		 */
		public function get_sport()
		{
			$retArr = array();

			$retArr = $this->obj; 
			return $retArr;
		}
		
		/**
		 * get_images() Gets images for players of a given position
		 *
		 * @retun array
		 */
		public function get_images()
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
		 * get_videos() Gets videos for players of a given position
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

			return $retArr;
		}
		
		/**
		 * post_add() Add a new position
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
		 * put_basics() Update Basics properties of the position
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
		 * delete_base() Delete a Sports Position
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
		
	}