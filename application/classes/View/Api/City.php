<?php defined('SYSPATH') or die('No direct script access.');

/**
 * City API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_City extends Api_Viewclass
	{

	
		/**
		 * get_basics() Basic information about a city
		 *
		 * @retun array
		 */
		public function get_basics()
		{
			$retArr = $this->obj->getBasics();
			return $retArr;
		}
		
		/**
		 * get_locations() All locations within a given city
		 *
		 * @retun array
		 */
		public function get_locations()
		{
			$retArr = array();

			$locs = $this->obj->find_all();
			foreach($locs as $loc)
			{
				$retArr[$loc->id] = $loc->getBasics();
			}

			return $retArr;
		}
		
		/**
		 * get_orgs() All organizations within a given city
		 *
		 * @retun array
		 */
		public function get_orgs()
		{
			$retArr = array();

			$orgs = $this->obj->find_all();
			foreach($orgs as $org)
			{
				$retArr[$org->id] = $org->getBasics();
			}

			return $retArr;
		}
		
		/**
		 * get_games() All games that take place within a city
		 *
		 * @retun array
		 */
		public function get_games()
		{

			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->execute();
			print_r($objs);
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

			return $retArr;
		}
		
		/**
		 * post_add() Add a new city
		 *
		 * @retun array
		 */
		public function post_add()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
	}