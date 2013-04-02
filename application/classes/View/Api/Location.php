<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Location API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Location extends Api_Viewclass
	{



	
		/**
		 * get_basics() Returns basic info about this location
		 *
		 * @retun array
		 */
		public function get_basics()
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
		 * get_games() Returns all games that have taken place at a certain location
		 *
		 * @retun array
		 */
		public function get_games()
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
		 * post_add() Add a new location
		 *
		 * @retun array
		 */
		public function post_add()
		{	 
			// Scaffolding Code For Single:
			$obj = $this->obj;
		 	 
			if (isset($new_location))
				$retArr = $obj->getBasics();
			else {
				$retArr = $obj->error_array;
			}
			return $retArr;
		}
		
		/**
		 * put_basics() Updates basic info about this location
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
		 * delete_base() Delete  location
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