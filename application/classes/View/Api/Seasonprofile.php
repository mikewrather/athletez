<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Seasonprofile API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Seasonprofile extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic info about the season profile
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
		 * get_seasons() List of seasons in the season profile
		 *
		 * @retun array
		 */
		public function get_seasons()
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
		 * post_addseason() Add a new season to a season profile
		 *
		 * @retun array
		 */
		public function post_addseason()
		{
			$retArr = array();
 

			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_add() Add a new season profile
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
		 * put_basics() Update Basic info about the season profile
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
		 * delete_base() Delete a Season Profile
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