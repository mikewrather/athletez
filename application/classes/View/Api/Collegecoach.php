<?php defined('SYSPATH') or die('No direct script access.');

/**
 * College_coach API View class
 *
 * Date: Auto-generated on May 30th, 2013 3:28 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Collegecoach extends Api_Viewclass
	{

		public function post_send_email()
		{
			$retArr = array();

			$retArr = $this->obj->result;

			return $retArr;
		}
		
	}