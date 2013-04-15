<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Season API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Season extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Seasons_Base'));
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
		 * via /api/season/teams/{seasons_id}
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "Gets all the teams for a given season narrowed by passed in parameters";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// complevels_id 
			// Filter teams for a certain season to only show those for a specific competition level
				
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$arguments["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			// orgs_id 
			// Filter teams for a certain season to only show those for a specific organization
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$arguments["orgs_id"] = (int)trim($this->request->query('orgs_id'));
			}

			// sports_id 
			// Filter teams for a certain season to only show those for a specific sport
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			// divisions_id 
			// Filter teams for a certain season to only show those for a specific division
				
			if((int)trim($this->request->query('divisions_id')) > 0)
			{
				$arguments["divisions_id"] = (int)trim($this->request->query('divisions_id'));
			}

			// leagues_id 
			// Filter teams for a certain season to only show those for a specific league
				
			if((int)trim($this->request->query('leagues_id')) > 0)
			{
				$arguments["leagues_id"] = (int)trim($this->request->query('leagues_id'));
			}

			// sections_id 
			// Filter teams for a certain season to only show those for a specific section
				
			if((int)trim($this->request->query('sections_id')) > 0)
			{
				$arguments["sections_id"] = (int)trim($this->request->query('sections_id'));
			}

			// states_id 
			// Filter teams for a certain season to only show those for a specific state
				
			if((int)trim($this->request->query('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->query('states_id'));
			}


		}
		
		/**
		 * action_get_basics() Basic information about a season
		 * via /api/season/basics/{seasons_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a season";
			$arguments = array();
		

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new season
		 * via /api/season/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new season";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Name of the season to add.
				
			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}

			// season_profiles_id 
			// The ID of the season profile this season belongs to
				
			if((int)trim($this->request->post('season_profiles_id')) > 0)
			{
				$arguments["season_profiles_id"] = (int)trim($this->request->post('season_profiles_id'));
			}


		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update the basic information about a season
		 * via /api/season/basics/{seasons_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update the basic information about a season";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Season
				
			if(trim($this->put('name')) != "")
			{
				$arguments["name"] = trim($this->put('name'));
			}

			// seasons_profiles_id 
			// Change the Season Profile this season belongs to
				
			if((int)trim($this->put('seasons_profiles_id')) > 0)
			{
				$arguments["seasons_profiles_id"] = (int)trim($this->put('seasons_profiles_id'));
			}


		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete a Season
		 * via /api/season/base/{seasons_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a Season";
			$arguments = array();
		

		}
		
	}