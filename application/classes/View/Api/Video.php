<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Video API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Video extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic information about a video
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
		 * get_types() Return all formats this video is available in
		 *
		 * @retun array
		 */
		public function get_types()
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
		 * get_meta() Retrives all metadata for a certain video.
		 *
		 * @retun array
		 */
		public function get_meta()
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
		 * get_search() Search for videos
		 *
		 * @retun array
		 */
		public function get_search()
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
		 * post_add() Post a new Video
		 *
		 * @retun array
		 */
		public function post_add()
		{
			$retArr = $this->obj->getBasics();
			return $retArr;
		}
		
		/**
		 * put_basics() Update basic information about a video
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
		 * delete_base() Delete Video
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