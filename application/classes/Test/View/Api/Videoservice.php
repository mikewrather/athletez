<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Videoservice API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Videoservice extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic info about a given video service.
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
		 * videos() Returns a list of videos produced by a video service
		 *
		 * @retun array
		 */
		public function videos()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}