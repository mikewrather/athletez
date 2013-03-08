<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Sporttype API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Sporttype extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information  about a sport type
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
		 * sports() All sports of this type
		 *
		 * @retun array
		 */
		public function sports()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}