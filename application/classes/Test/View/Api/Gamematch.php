<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Gamematch API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Gamematch extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic info for a game match
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
		 * players() All players within a given match
		 *
		 * @retun array
		 */
		public function players()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}