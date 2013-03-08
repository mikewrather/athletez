<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Tag API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Tag extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information on a given tag
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
		 * user() Gets the user being tagged
		 *
		 * @retun array
		 */
		public function user()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}