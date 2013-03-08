<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedatagroup API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Resumedatagroup extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Retrives basic information for a resume data group
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
		 * profiles() Returns all Resume Data Profiles for which this Resume Data Group exists
		 *
		 * @retun array
		 */
		public function profiles()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * resumedata() Returns a list of the resume data for a given group
		 *
		 * @retun array
		 */
		public function resumedata()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}