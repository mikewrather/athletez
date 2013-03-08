<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Stat API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Stat extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information for a given stat
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
		 * listall() Lists all statistics (apply filters)
		 *
		 * @retun array
		 */
		public function listall()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}