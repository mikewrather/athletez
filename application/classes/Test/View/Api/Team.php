<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Team API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Team extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic info on a given team
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
		 * games() Get all games for a given team
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
		 * roster() Get the players for a given team
		 *
		 * @retun array
		 */
		public function roster()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}