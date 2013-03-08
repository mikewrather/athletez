<?php defined('SYSPATH') or die('No direct script access.');

/**
 * County API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_County extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic info on a county
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
		 * cities() All cities within a given county
		 *
		 * @retun array
		 */
		public function cities()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * games() All games that take place within a county
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
		 * orgs() All organizations within a given county
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