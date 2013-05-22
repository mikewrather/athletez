<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Vote API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Vote extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic information on a given vote
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
		 * get_subject() Returns the subject for a given vote
		 *
		 * @retun array
		 */
		public function get_subject()
		{
			$retArr = array();
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_user() Returns the user who voted
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
		 * post_add() Add a new Vote
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
		 * delete_base() Delete a Vote
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			$retArr = array();
			$retArr = $this->obj->id;

			return $retArr;
		}
		
	}