<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Seasonprofile API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Seasonprofile extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Seasons_Profile'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info about the season profile
		 * via /api/seasonprofile/basics/{season_profiles_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info about the season profile";
			$arguments = array();
		

		}
		
		/**
		 * action_get_seasons() List of seasons in the season profile
		 * via /api/seasonprofile/seasons/{season_profiles_id}
		 *
		 */
		public function action_get_seasons()
		{
			$this->payloadDesc = "List of seasons in the season profile";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// orgs_id 
			// If provided, the season profile can be obtained through the org table instead of being provided explicitly in the URI.
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$arguments["orgs_id"] = (int)trim($this->request->query('orgs_id'));
			}


		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_addseason() Add a new season to a season profile
		 * via /api/seasonprofile/addseason/{season_profiles_id}
		 *
		 */
		public function action_post_addseason()
		{
			$this->payloadDesc = "Add a new season to a season profile";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Name of the Season to add.  This will create a new season entry.
				
			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}


		}
		
		/**
		 * action_post_add() Add a new season profile
		 * via /api/seasonprofile/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new season profile";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Name of the Season Profile to create
				
			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}


		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update Basic info about the season profile
		 * via /api/seasonprofile/basics/{season_profiles_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update Basic info about the season profile";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Season Profile
				
			if(trim($this->put('name')) != "")
			{
				$arguments["name"] = trim($this->put('name'));
			}


		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete a Season Profile
		 * via /api/seasonprofile/base/{season_profiles_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a Season Profile";
			$arguments = array();
		

		}
		
	}