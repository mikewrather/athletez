<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedata API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Resumedata extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Return the basics about a given peice of resume data
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
		 * listall() Return a list of all resume data narrowed by supplied parameters
		 *
		 * @retun array
		 */
		public function listall()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * vals() Retrieves the values for a peice of resume data narrowed by supplied parameters, most noteably userID
		 *
		 * @retun array
		 */
		public function vals()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}