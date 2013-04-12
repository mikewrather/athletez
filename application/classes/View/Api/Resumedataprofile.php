<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedataprofile API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Resumedataprofile extends Api_Viewclass
	{ 
		/**
		 * get_basics() Returns basic info for a given Resume Data Profile
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
		 * get_datagroups() Returns all Resume Data Groups for a given Resume Data Profile
		 *
		 * @retun array
		 */
		public function get_datagroups()
		{
			$retArr = array();
			
			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}
 
			return $retArr;
		}
		
		/**
		 * get_sports() Returns all sports for a given Resume Data Profile
		 *
		 * @retun array
		 */
		public function get_sports()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			} 
			return $retArr;
		}
		
		/**
		 * post_linksport() Link this RDP to a Sport
		 *
		 * @retun array
		 */
		public function post_linksport()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$retArr = $this->obj->getBasics();
			return $retArr;
		}
		
		/**
		 * post_linkrdg() Link to a Resume Data Group
		 *
		 * @retun array
		 */
		public function post_linkrdg()
		{
			$retArr = array();
            $retArr = $this->obj->getBasics(); 
			return $retArr;
		}
		
		/**
		 * post_add() Add a new Resume Data Profile
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
		 * put_basics() Updates basic info for a given Resume Data Profile
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
		 * delete_base() Delete Resume Data Profile
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