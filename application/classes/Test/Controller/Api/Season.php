<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Season API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Season extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Season_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_teams() Gets all the teams for a given season narrowed by passed in parameters
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "Gets all the teams for a given season narrowed by passed in parameters";
		
			if($this->request->query('complevels_id') > 0)
			{

			}

			if($this->request->query('orgs_id') > 0)
			{

			}

			if($this->request->query('sports_id') > 0)
			{

			}

			if($this->request->query('divisions_id') > 0)
			{

			}

			if($this->request->query('leagues_id') > 0)
			{

			}

			if($this->request->query('sections_id') > 0)
			{

			}

			if($this->request->query('states_id') > 0)
			{

			}

		}
		
		/**
		 * action_get_basics() Basic information about a season
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a season";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}