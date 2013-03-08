<?php defined('SYSPATH') or die('No direct script access.');

/**
 * City API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_City extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information about a city
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
		 * games() All games that take place within a city
		 *
		 * @retun array
		 */
		public function games()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * locations() All locations within a given city
		 *
		 * @retun array
		 */
		public function locations()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * orgs() All organizations within a given city
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