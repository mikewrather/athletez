<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Complevel API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Complevel extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Complevel_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on competion level
		 * via /api/complevel/basics/{complevels_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on competion level";

		
		}
		
		/**
		 * action_get_teams() List of teams for a given complevel narrowed by additional criteria
		 * via /api/complevel/teams/{complevels_id}
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "List of teams for a given complevel narrowed by additional criteria";

		         // CHECK FOR PARAMETERS:
			// seasons_id 
			// Filter teams for a certain competition level to only show those for a specific season
				
			if((int)trim($this->request->post('seasons_id')) > 0)
			{
				$seasons_id = (int)trim($this->request->post('seasons_id'));
			}

			// orgs_id 
			// Filter teams for a certain competition level to only show those for a specific organization
				
			if((int)trim($this->request->post('orgs_id')) > 0)
			{
				$orgs_id = (int)trim($this->request->post('orgs_id'));
			}

			// sports_id 
			// Filter teams for a certain competition level to only show those for a specific sport
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

			// divisions_id 
			// Filter teams for a certain competition level to only show those for a specific division
				
			if((int)trim($this->request->post('divisions_id')) > 0)
			{
				$divisions_id = (int)trim($this->request->post('divisions_id'));
			}

			// leagues_id 
			// Filter teams for a certain competition level to only show those for a specific league
				
			if((int)trim($this->request->post('leagues_id')) > 0)
			{
				$leagues_id = (int)trim($this->request->post('leagues_id'));
			}

			// sections_id 
			// Filter teams for a certain competition level to only show those for a specific section
				
			if((int)trim($this->request->post('sections_id')) > 0)
			{
				$sections_id = (int)trim($this->request->post('sections_id'));
			}

			// states_id 
			// Filter teams for a certain competition level to only show those for a specific state
				
			if((int)trim($this->request->post('states_id')) > 0)
			{
				$states_id = (int)trim($this->request->post('states_id'));
			}

		}
		
		/**
		 * action_get_listall() List of competition levels narrowed by criteria
		 * via /api/complevel/listall/{complevels_id}
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "List of competition levels narrowed by criteria";

		         // CHECK FOR PARAMETERS:
			// complevel_profiles_id 
			// Narrow list of competition levels to those in a specific profile
				
			if((int)trim($this->request->post('complevel_profiles_id')) > 0)
			{
				$complevel_profiles_id = (int)trim($this->request->post('complevel_profiles_id'));
			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new Competition Level
		 * via /api/complevel/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Competition Level";

		         // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the new Competition Level
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// complevel_profiles_id (REQUIRED)
			// The Competition Level Profile the Complevel belongs to
				
			if((int)trim($this->request->post('complevel_profiles_id')) > 0)
			{
				$complevel_profiles_id = (int)trim($this->request->post('complevel_profiles_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic info on competion level
		 * via /api/complevel/basics/{complevels_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic info on competion level";

		         // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Competition Level
				
			if(trim($this->request->body('name')) != "")
			{
				$name = trim($this->request->body('name'));
			}

			// complevel_profiles_id 
			// Change the Competition Profile
				
			if((int)trim($this->request->body('complevel_profiles_id')) > 0)
			{
				$complevel_profiles_id = (int)trim($this->request->body('complevel_profiles_id'));
			}

			// min_age 
			// Change Minimum Age for this Comp Level
				
			if((int)trim($this->request->body('min_age')) > 0)
			{
				$min_age = (int)trim($this->request->body('min_age'));
			}

			// max_age 
			// Change Maximum Age for this Comp Level
				
			if((int)trim($this->request->body('max_age')) > 0)
			{
				$max_age = (int)trim($this->request->body('max_age'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Competition Level
		 * via /api/complevel/base/{complevels_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Competition Level";

		
		}
		
	}