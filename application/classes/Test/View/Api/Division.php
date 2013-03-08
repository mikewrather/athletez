<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Division API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Division extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information about a division
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
		 * orgs() Returns all organizations within with a certain division
		 *
		 * @retun array
		 */
		public function orgs()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}