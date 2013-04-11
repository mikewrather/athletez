<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Statval API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Statval extends Api_Viewclass
	{



	
		/**
		 * post_add() Add a new User Value for a Statistic
		 *
		 * @retun array
		 */
		public function post_add()
		{
			$retArr = array();
 		  
			$retArr = $this->obj->getBasics();
			return $retArr;
		}
		
	}