<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Queuedvideo API View class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Queuedvideo extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * get_basics() Basic info about this queued video
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
		
	}