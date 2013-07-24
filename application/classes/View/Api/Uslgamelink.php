<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Uslgamelink API View class
 *
 * Date: Auto-generated on Jul 24th, 2013 2:52 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Uslgamelink extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * post_add() link a user's user_sport_link entry and a game via usl_game_link
		 *
		 * @retun array
		 */
		public function post_add()
		{
			$retArr = $this->obj->getBasics();
			return $retArr;
		}
		
	}