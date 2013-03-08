<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Location API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Location extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Returns basic info about this location
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
		 * games() Returns all games that have taken place at a certain location
		 *
		 * @retun array
		 */
		public function games()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}