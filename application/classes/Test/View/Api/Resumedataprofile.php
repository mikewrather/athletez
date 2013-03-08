<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedataprofile API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Resumedataprofile extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Returns basic info for a given Resume Data Profile
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
		 * datagroups() Returns all Resume Data Groups for a given Resume Data Profile
		 *
		 * @retun array
		 */
		public function datagroups()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * sports() Returns all sports for a given Resume Data Profile
		 *
		 * @retun array
		 */
		public function sports()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}