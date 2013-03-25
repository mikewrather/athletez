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


			$games = $this->obj->execute();
		//	print_r($games);
			foreach($games as $game_array)
			{
				$game_obj = ORM::factory('Sportorg_Games_Base')->where('id','=',$game_array['id'])->find();
				$retArr[$game_obj->id] = $game_obj->getBasics();
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
			$retArr = $this->obj->getBasics();
			return $retArr;
		}
		
	}