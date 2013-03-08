<?php defined('SYSPATH') or die('No direct script access.');

/**
 * League API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_League extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basics on a League
		 *
		 * @retun array
		 */
		public function basics()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * orgs() All organizations within a League
		 *
		 * @retun array
		 */
		public function orgs()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}