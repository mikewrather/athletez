<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Game API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Game extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information about the game
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
		 * images() Get all images associated with a certain game
		 *
		 * @retun array
		 */
		public function images()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * location() Returns the location of a game
		 *
		 * @retun array
		 */
		public function location()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * matches() List of all matches within a given game
		 *
		 * @retun array
		 */
		public function matches()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * teams() All teams competing in the game
		 *
		 * @retun array
		 */
		public function teams()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * videos() Get all videos tagged with a certain game
		 *
		 * @retun array
		 */
		public function videos()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}