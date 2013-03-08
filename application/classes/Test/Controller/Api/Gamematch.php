<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Gamematch API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Gamematch extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Games_Match'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info for a game match
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info for a game match";
		
		}
		
		/**
		 * action_get_players() All players within a given match
		 *
		 */
		public function action_get_players()
		{
			$this->payloadDesc = "All players within a given match";
		
			if($this->request->query('positions_id') > 0)
			{

			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}