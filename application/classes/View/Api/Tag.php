<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Tag API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Tag extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic information on a given tag
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
		 * get_user() Gets the user being tagged
		 *
		 * @retun array
		 */
		public function get_user()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_add() Add a new tag
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
		 * delete_base() Delete Tab
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			return null;
		}
		
	}