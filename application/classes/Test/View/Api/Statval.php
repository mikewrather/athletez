<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Statval API View class
 *
 * Date: Auto-generated on Apr 11th, 2013 12:30 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Statval extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * post_add() Add a new User Value for a Statistic
		 *
		 * @retun array
		 */
		public function post_add()
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