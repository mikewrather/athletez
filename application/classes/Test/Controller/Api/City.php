<?php defined('SYSPATH') or die('No direct script access.');

/**
 * City API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_City extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Location_City'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a city
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a city";
		
		}
		
		/**
		 * action_get_locations() All locations within a given city
		 *
		 */
		public function action_get_locations()
		{
			$this->payloadDesc = "All locations within a given city";
		
			if($this->request->query('loc_type') > 0)
			{

			}

		}
		
		/**
		 * action_get_orgs() All organizations within a given city
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a given city";
		
		}
		
		/**
		 * action_get_games() All games that take place within a city
		 *
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "All games that take place within a city";
		
			if($this->request->query('games_before') != "")
			{

			}

			if($this->request->query('games_after') != "")
			{

			}

			if($this->request->query('sports_id') > 0)
			{

			}

			if($this->request->query('complevels_id') > 0)
			{

			}

			if($this->request->query('teams_id') > 0)
			{

			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}