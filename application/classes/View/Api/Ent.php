<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Ent API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Ent extends Api_Viewclass
	{

	
		/**
		 * get_basics() Basic info on an entity
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
		 * get_comments() Get comments on a specific subject
		 *
		 * @retun array
		 */
		public function get_comments()
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
		 * get_votes() Get votes on a specific subject
		 *
		 * @retun array
		 */
		public function get_votes()
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
		 * get_tags() Get tags for a specific subject
		 *
		 * @retun array
		 */
		public function get_tags()
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
		 * post_comment() Post a new comment about a given subject
		 *
		 * @retun array
		 */
		public function post_comment()
		{

		}
		
		/**
		 * post_vote() Post a Vote on a specific subject
		 *
		 * @retun array
		 */
		public function post_vote()
		{
			$retArr = array();
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_follow() Follow a Subject
		 *
		 * @retun array
		 */
		public function post_follow()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_tag() Tag a Subject
		 *
		 * @retun array
		 */
		public function post_tag()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
	}