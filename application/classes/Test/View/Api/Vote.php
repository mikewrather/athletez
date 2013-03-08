<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Vote API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Vote extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information on a given vote
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
		 * subject() Returns the subject for a given vote
		 *
		 * @retun array
		 */
		public function subject()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * user() Returns the user who voted
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