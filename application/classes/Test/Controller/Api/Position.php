<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Position API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Position extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Position'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_listall() Lists available positions.
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Lists available positions.";
		
			if($this->request->query('sports_id') > 0)
			{

			}

			if($this->request->query('users_id') > 0)
			{

			}

		}
		
		/**
		 * action_get_players() Retrives all players for a given position narrowed by other optional criteria
		 *
		 */
		public function action_get_players()
		{
			$this->payloadDesc = "Retrives all players for a given position narrowed by other optional criteria";
		
			if($this->request->query('orgs_id') > 0)
			{

			}

			if($this->request->query('cities_id') > 0)
			{

			}

		}
		
		/**
		 * action_get_defaultstattab() Gets the default statistics tab to select for a given position
		 *
		 */
		public function action_get_defaultstattab()
		{
			$this->payloadDesc = "Gets the default statistics tab to select for a given position";
		
		}
		
		/**
		 * action_get_sport() Gets the sport associated with a given position
		 *
		 */
		public function action_get_sport()
		{
			$this->payloadDesc = "Gets the sport associated with a given position";
		
		}
		
		/**
		 * action_get_images() Gets images for players of a given position
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "Gets images for players of a given position";
		
			if($this->request->query('orgs_id') > 0)
			{

			}

			if($this->request->query('cities_id') > 0)
			{

			}

		}
		
		/**
		 * action_get_videos() Gets videos for players of a given position
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Gets videos for players of a given position";
		
			if($this->request->query('orgs_id') > 0)
			{

			}

			if($this->request->query('cities_id') > 0)
			{

			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}