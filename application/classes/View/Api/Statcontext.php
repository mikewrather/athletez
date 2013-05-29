<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Statcontext API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Statcontext extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic info for a given stat value field
		 *
		 * @retun array
		 */
		public function get_basics()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_basics() Update basic info for a given stat value field
		 *
		 * @retun array
		 */
		public function put_basics()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_base() Delete  a given stat value field
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
	}