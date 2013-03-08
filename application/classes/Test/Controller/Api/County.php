<?php defined('SYSPATH') or die('No direct script access.');

/**
 * County API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_County extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Location_County'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on a county
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a county";
		
		}
		
		/**
		 * action_get_cities() All cities within a given county
		 *
		 */
		public function action_get_cities()
		{
			$this->payloadDesc = "All cities within a given county";
		
		}
		
		/**
		 * action_get_orgs() All organizations within a given county
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a given county";
		
		}
		
		/**
		 * action_get_games() All games that take place within a county
		 *
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "All games that take place within a county";
		
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