<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Game API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Game extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Games_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about the game
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about the game";
		
		}
		
		/**
		 * action_get_teams() All teams competing in the game
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "All teams competing in the game";
		
		}
		
		/**
		 * action_get_location() Returns the location of a game
		 *
		 */
		public function action_get_location()
		{
			$this->payloadDesc = "Returns the location of a game";
		
		}
		
		/**
		 * action_get_matches() List of all matches within a given game
		 *
		 */
		public function action_get_matches()
		{
			$this->payloadDesc = "List of all matches within a given game";
		
		}
		
		/**
		 * action_get_videos() Get all videos tagged with a certain game
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Get all videos tagged with a certain game";
		
		}
		
		/**
		 * action_get_images() Get all images associated with a certain game
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "Get all images associated with a certain game";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}