<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Org API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Org extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information about the organization
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
		 * complevels() List of possible competition levels for this organization
		 *
		 * @retun array
		 */
		public function complevels()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * division() Division that the organization belongs to
		 *
		 * @retun array
		 */
		public function division()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * league() League that the organization belongs to
		 *
		 * @retun array
		 */
		public function league()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * seasons() List of all seasons this organization plays
		 *
		 * @retun array
		 */
		public function seasons()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * section() If applicable, returns the section that the organization exists in.
		 *
		 * @retun array
		 */
		public function section()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * sports() All sports associated with a given organization
		 *
		 * @retun array
		 */
		public function sports()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * teams() List of all teams within the organization
		 *
		 * @retun array
		 */
		public function teams()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}