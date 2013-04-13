<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Comment API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Comment extends Api_Viewclass
	{


		/**
		 * get_getall() Get all comments for a given subject.   This does not require a comment ID and parameters are used to specify the subject instead.
		 *
		 * @retun array
		 */
		public function get_getall()
		{
			$retArr = array();

			// The obj object should hold the list of the comments
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

			return $retArr;
		}

		/**
		 * get_basics() Basic info on a specific comment
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
		 * get_subject() Returns the subject with which the comment is associated.
		 *
		 * @retun array
		 */
		public function get_subject()
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
		 * get_user() Return the user responsible for a comment
		 *
		 * @retun array
		 */
		public function get_user()
		{
			$retArr = array();
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_add() Add a new comment
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
		 * put_basics() Update basic info on a specific comment
		 *
		 * @retun array
		 */
		public function put_basics()
		{
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_base() Delete Comment
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