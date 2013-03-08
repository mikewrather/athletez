<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Complevelprofile API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Complevelprofile extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information about the competition level profile
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
		 * complevels() List the competition levels for this profile
		 *
		 * @retun array
		 */
		public function complevels()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}