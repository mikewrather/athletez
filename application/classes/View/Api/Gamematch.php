<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Gamematch API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Gamematch extends Api_Viewclass
	{
		/**
		 * get_basics() Basic info for a game match
		 *
		 * @retun array
		 */
		public function get_basics()
		{
			$retArr = array(); 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * get_players() All players within a given match
		 *
		 * @retun array
		 */
		public function get_players()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}
  
			return $retArr;
		}
		
		/**
		 * post_add() Add a new Game Match
		 *
		 * @retun array
		 */
		public function post_add()
		{
			$retArr = array();
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_addplayer() Add a new player to this match
		 *
		 * @retun array
		 */
		public function post_addplayer()
		{
			$retArr = array();
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_basics() Update Basic info for a game match
		 *
		 * @retun array
		 */
		public function put_basics()
		{
			$retArr = array();
 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * delete_base() Delete a Game Match
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			return null;
		}
		
		/**
		 * delete_player() Delete a player from the Game Match
		 *
		 * @retun array
		 */
		public function delete_player()
		{
			return null;
		}
		
	}