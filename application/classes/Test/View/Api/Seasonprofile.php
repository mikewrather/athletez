<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Seasonprofile API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Seasonprofile extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic info about the season profile
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
		 * seasons() List of seasons in the season profile
		 *
		 * @retun array
		 */
		public function seasons()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}