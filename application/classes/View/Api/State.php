<?php defined('SYSPATH') or die('No direct script access.');

/**
 * State API View class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:33 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_State extends Api_Viewclass
	{



	
		/**
		 * get_basics() Basic info on a given state
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
		 * get_counties() All counties within the state
		 *
		 * @retun array
		 */
		public function get_counties()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}
 
			return $retArr;
		}
		
		/**
		 * get_divisions() All divisions within a state
		 *
		 * @retun array
		 */
		public function get_divisions()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			} 
			return $retArr;
		}
		
		/**
		 * get_sections() All sections within a state
		 *
		 * @retun array
		 */
		public function get_sections()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}
 
			return $retArr;
		}

		public function get_search()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}

			return $retArr;
		}

		/**
		 * get_leagues() All leagues within a given state
		 *
		 * @retun array
		 */
		public function get_leagues()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[$obj->id] = $obj->getBasics();
			}
 
			return $retArr;
		}
		
		/**
		 * post_add() Add a new State
		 *
		 * @retun array
		 */
		public function post_add()
		{
			$retArr = array(); 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_addcounty() Add a county within the state
		 *
		 * @retun array
		 */
		public function post_addcounty()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_division() Add a division within the state
		 *
		 * @retun array
		 */
		public function post_division()
		{
			$retArr = array(); 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_section() Add a section within the state
		 *
		 * @retun array
		 */
		public function post_section()
		{
			$retArr = array(); 
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * post_league() Add a league within the state
		 *
		 * @retun array
		 */
		public function post_league()
		{
			$retArr = array();
  
			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		/**
		 * put_basics() Update basic info on a given state
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
		 * delete_base() Delete  state
		 *
		 * @retun array
		 */
		public function delete_base()
		{
			$retArr = array();

			// Scaffolding Code For Array:
			$objs = $this->obj;
			return $retArr;
		}
		
	}