<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Comment API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Comment extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic info on a specific comment
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
		 * subject() Returns the subject with which the comment is associated.
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
		 * user() Return the user responsible for a comment
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