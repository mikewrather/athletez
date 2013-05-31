<?php defined('SYSPATH') or die('No direct script access.');

/**
 * College API View class
 *
 * Date: Auto-generated on May 30th, 2013 3:28 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_College extends Api_Viewclass
	{
		/**
		 * get_search() Search for a list of colleges based on several filtering criteria
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
		
	}