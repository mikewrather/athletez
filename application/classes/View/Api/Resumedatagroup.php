<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedatagroup API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Resumedatagroup extends Api_Viewclass
	{



	
		/**
		 * get_basics() Retrives basic information for a resume data group
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
		 * get_resumedata() Returns a list of the resume data for a given group
		 *
		 * @retun array
		 */
		public function get_resumedata()
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
		 * get_profiles() Returns all Resume Data Profiles for which this Resume Data Group exists
		 *
		 * @retun array
		 */
		public function get_profiles()
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
		 * post_addtordp() Link this RDG to an RDP
		 *
		 * @retun array
		 */
		public function post_addtordp()
		{
			$retArr = array(); 
			// Scaffolding Code For Single:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

			return $retArr;
		}
		
		/**
		 * put_basics() Updates basic information for a resume data group
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
		 * delete_base() Delete Resume Data Group
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			$retArr = array();
 			$retArr = $objs = $this->obj;
			return $retArr;
		}
		
	}