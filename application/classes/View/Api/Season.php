<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Season API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Season extends Api_Viewclass
	{



	
		/**
		 * get_teams() Gets all the teams for a given season narrowed by passed in parameters
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

			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_basics() Basic information about a season
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
		 * post_add() Add a new season
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
		 * put_basics() Update the basic information about a season
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
		 * delete_base() Delete a Season
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
		
	}