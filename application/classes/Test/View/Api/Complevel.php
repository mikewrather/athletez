<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Complevel API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Complevel extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic info on competion level
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
		 * listall() List of competition levels narrowed by criteria
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
		 * teams() List of teams for a given complevel narrowed by additional criteria
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