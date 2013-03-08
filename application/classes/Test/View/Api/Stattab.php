<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Stattab API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Stattab extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basics on the Statistics Tab
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
		 * childtabs() Returns all child tabs within a given statistics tab
		 *
		 * @retun array
		 */
		public function childtabs()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * positions() Returns positions for which this is the default tab
		 *
		 * @retun array
		 */
		public function positions()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * stats() Returns all stats within a given stattab
		 *
		 * @retun array
		 */
		public function stats()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}