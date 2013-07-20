<?php defined('SYSPATH') or die('No direct script access.');

/**
 * League API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_League extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basics on a League
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
		 * get_orgs() All organizations within a League
		 *
		 * @retun array
		 */
		public function get_orgs()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}
 
			return $retArr;
		}
		
		/**
		 * post_add() Add a new League
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
		 * put_basics() Update basics on a League
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
		 * delete_base() Delete  League
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