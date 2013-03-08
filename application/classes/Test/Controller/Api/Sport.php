<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Sport API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Sport extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Sport'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Provides basic information about a sport
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Provides basic information about a sport";
		
		}
		
		/**
		 * action_get_listall() Retrives a list of all sports narrowed by a number of optional criteria
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Retrives a list of all sports narrowed by a number of optional criteria";
		
		}
		
		/**
		 * action_get_positions() Lists all positions for a given sport
		 *
		 */
		public function action_get_positions()
		{
			$this->payloadDesc = "Lists all positions for a given sport";
		
		}
		
		/**
		 * action_get_type() Get the type of sport
		 *
		 */
		public function action_get_type()
		{
			$this->payloadDesc = "Get the type of sport";
		
		}
		
		/**
		 * action_get_videos() Videos associated with a given sport
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Videos associated with a given sport";
		
			if($this->request->query('users_id') > 0)
			{

			}

			if($this->request->query('seasons_id') > 0)
			{

			}

			if($this->request->query('complevels_id') > 0)
			{

			}

		}
		
		/**
		 * action_get_images() Images associated with a given sport
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "Images associated with a given sport";
		
			if($this->request->query('users_id') > 0)
			{

			}

			if($this->request->query('seasons_id') > 0)
			{

			}

			if($this->request->query('complevels_id') > 0)
			{

			}

		}
		
		/**
		 * action_get_resumedata() Retrieves resume data related to the sport
		 *
		 */
		public function action_get_resumedata()
		{
			$this->payloadDesc = "Retrieves resume data related to the sport";
		
			if($this->request->query('users_id') > 0)
			{

			}

		}
		
		/**
		 * action_get_statistics() Gets statistics associated with a given sport
		 *
		 */
		public function action_get_statistics()
		{
			$this->payloadDesc = "Gets statistics associated with a given sport";
		
		}
		
		/**
		 * action_get_stattabs() Gets the statistics tabs for a given sport
		 *
		 */
		public function action_get_stattabs()
		{
			$this->payloadDesc = "Gets the statistics tabs for a given sport";
		
		}
		
		/**
		 * action_get_users() Gets all users for a given sport
		 *
		 */
		public function action_get_users()
		{
			$this->payloadDesc = "Gets all users for a given sport";
		
			if($this->request->query('orgs_id') > 0)
			{

			}

			if($this->request->query('teams_id') > 0)
			{

			}

			if($this->request->query('seasons_id') > 0)
			{

			}

			if($this->request->query('positions_id') > 0)
			{

			}

			if($this->request->query('complevels_id') > 0)
			{

			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}