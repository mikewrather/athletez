<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Section API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Section extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information about a Section
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
		 * divisions() Returns all divisions within a given section
		 *
		 * @retun array
		 */
		public function divisions()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * leagues() Returns all leagues within a given section
		 *
		 * @retun array
		 */
		public function leagues()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}