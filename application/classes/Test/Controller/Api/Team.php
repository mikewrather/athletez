<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Team API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Team extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Team'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on a given team
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a given team";
		
		}
		
		/**
		 * action_get_games() Get all games for a given team
		 *
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "Get all games for a given team";
		
			if($this->request->query('games_before') != "")
			{

			}

			if($this->request->query('games_after') != "")
			{

			}

			if($this->request->query('is_winner') > 0)
			{

			}

		}
		
		/**
		 * action_get_roster() Get the players for a given team
		 *
		 */
		public function action_get_roster()
		{
			$this->payloadDesc = "Get the players for a given team";
		
			if($this->request->query('positions_id') > 0)
			{

			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}