<?php defined('SYSPATH') or die('No direct script access.');

/**
 * State API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_State extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic info on a given state
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
		 * counties() All counties within the state
		 *
		 * @retun array
		 */
		public function counties()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * divisions() All divisions within a state
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
		 * leagues() All leagues within a given state
		 *
		 * @retun array
		 */
		public function leagues()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * sections() All sections within a state
		 *
		 * @retun array
		 */
		public function sections()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}