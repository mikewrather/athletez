<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Image API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Image extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic info about a given image
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
		 * get_search() Search for images
		 *
		 * @retun array
		 */
		public function get_search()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
//			print_r($objs);
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}

			return $retArr;
		}
		
		/**
		 * post_add() Post a new image
		 *
		 * @retun array
		 */
		public function post_add()
		{
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_base() Delete an Image
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			return null;
		}
		
	}