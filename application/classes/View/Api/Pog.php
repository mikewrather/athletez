<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Pog API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Pog extends Api_Viewclass
	{



	
		/**
		 * get_basics() Player of the Game basics
		 *
		 * @retun array
		 */
		public function get_basics()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
	}