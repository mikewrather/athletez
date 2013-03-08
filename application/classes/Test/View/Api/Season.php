<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Season API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Season extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information about a season
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
		 * teams() Gets all the teams for a given season narrowed by passed in parameters
		 *
		 * @retun array
		 */
		public function teams()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}