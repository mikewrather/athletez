<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Stat API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Stat extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic information for a given stat
		 *
		 * @retun array
		 */
		public function get_basics()
		{
			$retArr = $this->obj->getBasics();
			return $retArr;
		}
		
		/**
		 * get_listall() Lists all statistics (apply filters)
		 *
		 * @retun array
		 */
		public function get_listall()
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
		 * post_addval() Add a Stat value for a given statistic
		 *
		 * @retun array
		 */
		public function post_addval()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_basics() Update basic information for a given stat
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
		 * delete_base() Delete  a given stat
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
		
	}