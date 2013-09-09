<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Queuedvideo API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Queuedvideo extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic info about this queued video
		 *
		 * @retun array
		 */
		public function get_basics()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		public function get_process()
		{
			return $this->obj;
		}
		
	}