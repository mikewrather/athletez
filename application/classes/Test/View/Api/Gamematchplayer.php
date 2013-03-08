<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Gamematchplayer API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Gamematchplayer extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information about a player in a match
		 *
		 * @retun array
		 */
		public function basics()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}