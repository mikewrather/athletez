<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Videoservice API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Videoservice extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic info about a given video service.
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
		 * get_videos() Returns a list of videos produced by a video service
		 *
		 * @retun array
		 */
		public function get_videos()
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
		 * post_add() Add a new video service
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
		 * put_basics() Basic info about a given video service.
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
		 * delete_base() Delete Video Service
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