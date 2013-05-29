<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Stattab API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Stattab extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basics on the Statistics Tab
		 *
		 * @retun array
		 */
		public function get_basics()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_childtabs() Returns all child tabs within a given statistics tab
		 *
		 * @retun array
		 */
		public function get_childtabs()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}

			return $retArr;
		}
		
		/**
		 * get_stats() Returns all stats within a given stattab
		 *
		 * @retun array
		 */
		public function get_stats()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}

			return $retArr;
		}
		
		/**
		 * get_positions() Returns positions for which this is the default tab
		 *
		 * @retun array
		 */
		public function get_positions()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_basics() Update basics on the Statistics Tab
		 *
		 * @retun array
		 */
		public function put_basics()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_base() Delete  Statistics Tab
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			$retArr = array();

			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
	}