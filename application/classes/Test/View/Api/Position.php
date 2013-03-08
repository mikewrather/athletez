<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Position API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Position extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * defaultstattab() Gets the default statistics tab to select for a given position
		 *
		 * @retun array
		 */
		public function defaultstattab()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * images() Gets images for players of a given position
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
		 * listall() Lists available positions.
		 *
		 * @retun array
		 */
		public function listall()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * players() Retrives all players for a given position narrowed by other optional criteria
		 *
		 * @retun array
		 */
		public function players()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * sport() Gets the sport associated with a given position
		 *
		 * @retun array
		 */
		public function sport()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * videos() Gets videos for players of a given position
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