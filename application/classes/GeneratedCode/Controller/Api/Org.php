<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Org API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Org extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Org'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about the organization
		 * via /api/org/basics/{orgs_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about the organization";
			$arguments = array();
		

		}
		
		/**
		 * action_get_teams() List of all teams within the organization
		 * via /api/org/teams/{orgs_id}
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "List of all teams within the organization";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// sports_id 
			// Will filter the list of teams to a given sport
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id 
			// Filter the teams list to a given competition level
				
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$arguments["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}


		}
		
		/**
		 * action_get_league() League that the organization belongs to
		 * via /api/org/league/{orgs_id}
		 *
		 */
		public function action_get_league()
		{
			$this->payloadDesc = "League that the organization belongs to";
			$arguments = array();
		

		}
		
		/**
		 * action_get_division() Division that the organization belongs to
		 * via /api/org/division/{orgs_id}
		 *
		 */
		public function action_get_division()
		{
			$this->payloadDesc = "Division that the organization belongs to";
			$arguments = array();
		

		}
		
		/**
		 * action_get_sports() All sports associated with a given organization
		 * via /api/org/sports/{orgs_id}
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "All sports associated with a given organization";
			$arguments = array();
		

		}
		
		/**
		 * action_get_complevels() List of possible competition levels for this organization
		 * via /api/org/complevels/{orgs_id}
		 *
		 */
		public function action_get_complevels()
		{
			$this->payloadDesc = "List of possible competition levels for this organization";
			$arguments = array();
		

		}
		
		/**
		 * action_get_seasons() List of all seasons this organization plays
		 * via /api/org/seasons/{orgs_id}
		 *
		 */
		public function action_get_seasons()
		{
			$this->payloadDesc = "List of all seasons this organization plays";
			$arguments = array();
		

		}
		
		/**
		 * action_get_section() If applicable, returns the section that the organization exists in.
		 * via /api/org/section/{orgs_id}
		 *
		 */
		public function action_get_section()
		{
			$this->payloadDesc = "If applicable, returns the section that the organization exists in.";
			$arguments = array();
		

		}
		
		/**
		 * action_get_search() Used to auto-narrow a list of organizations based on passed parameters and partial search strings.
		 * via /api/org/search/{orgs_id}
		 *
		 */
		public function action_get_search()
		{
			$this->payloadDesc = "Used to auto-narrow a list of organizations based on passed parameters and partial search strings.";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// sports_club 
			// If set to true only sports clubs will be returned.
				
			if($this->request->query('sports_club') != "")
			{
				//convert sports_club to a boolean
				$arguments["sports_club"] = (bool)$this->request->query('sports_club');
			}

			// states_id (REQUIRED)
			// This will be necessary to narrow the list because there are so many organizations.
				
			if((int)trim($this->request->query('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->query('states_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "states_id",
					"param_desc" => "This will be necessary to narrow the list because there are so many organizations."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// sports_id 
			// Only return orgs which are linked to this sport.
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			// cities_id 
			// Narrow organization by city.
				
			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$arguments["cities_id"] = (int)trim($this->request->query('cities_id'));
			}

			return $this->mainModel->get_search($arguments);


		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Create a new organization
		 * via /api/org/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Create a new organization";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// The name of the organization
				
			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}

			// sports_club 
			// This is a 1 or a 0 for true / false
				
			if($this->request->post('sports_club') != "")
			{
				//convert sports_club to a boolean
				$arguments["sports_club"] = (bool)$this->request->post('sports_club');
			}

			// season_profiles_id 
			// ID of the Season Profile this organization uses
				
			if((int)trim($this->request->post('season_profiles_id')) > 0)
			{
				$arguments["season_profiles_id"] = (int)trim($this->request->post('season_profiles_id'));
			}

			// complevel_profiles_id 
			// ID of the Competition Level Profile this organization uses
				
			if((int)trim($this->request->post('complevel_profiles_id')) > 0)
			{
				$arguments["complevel_profiles_id"] = (int)trim($this->request->post('complevel_profiles_id'));
			}

			// leagues_id 
			// ID of the League (If Applicable)
				
			if((int)trim($this->request->post('leagues_id')) > 0)
			{
				$arguments["leagues_id"] = (int)trim($this->request->post('leagues_id'));
			}

			// divisions_id 
			// ID of the Division (If Applicable)
				
			if((int)trim($this->request->post('divisions_id')) > 0)
			{
				$arguments["divisions_id"] = (int)trim($this->request->post('divisions_id'));
			}


		}
		
		/**
		 * action_post_addsport() Add a new sport association for the organization
		 * via /api/org/addsport/{orgs_id}
		 *
		 */
		public function action_post_addsport()
		{
			$this->payloadDesc = "Add a new sport association for the organization";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// sports_id 
			// Add a Sport to this Organization
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->post('sports_id'));
			}


		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update Basic information about the organization
		 * via /api/org/basics/{orgs_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update Basic information about the organization";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the organization
				
			if(trim($this->put('name')) != "")
			{
				$arguments["name"] = trim($this->put('name'));
			}

			// signle_sport 
			// Change whether this is a one-sport organization
				
			if($this->put('signle_sport') != "")
			{
				//convert signle_sport to a boolean
				$arguments["signle_sport"] = (bool)$this->put('signle_sport');
			}

			// leagues_id 
			// Change the league this organization belongs to
				
			if((int)trim($this->put('leagues_id')) > 0)
			{
				$arguments["leagues_id"] = (int)trim($this->put('leagues_id'));
			}

			// divisions_id 
			// Change the division this organization belong to
				
			if((int)trim($this->put('divisions_id')) > 0)
			{
				$arguments["divisions_id"] = (int)trim($this->put('divisions_id'));
			}

			// season_profiles_id 
			// Change the Season Profile this organization uses
				
			if((int)trim($this->put('season_profiles_id')) > 0)
			{
				$arguments["season_profiles_id"] = (int)trim($this->put('season_profiles_id'));
			}

			// complevel_profiles_id 
			// Change the Competition Level Profile
				
			if((int)trim($this->put('complevel_profiles_id')) > 0)
			{
				$arguments["complevel_profiles_id"] = (int)trim($this->put('complevel_profiles_id'));
			}


		}
		
		/**
		 * action_put_division() Change the Division for an Organization
		 * via /api/org/division/{orgs_id}
		 *
		 */
		public function action_put_division()
		{
			$this->payloadDesc = "Change the Division for an Organization";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// divisions_id 
			// Change the Division ID
				
			if((int)trim($this->put('divisions_id')) > 0)
			{
				$arguments["divisions_id"] = (int)trim($this->put('divisions_id'));
			}


		}
		
		/**
		 * action_put_complevelprofile() Change the Competition Level Profiles for the Organization
		 * via /api/org/complevelprofile/{orgs_id}
		 *
		 */
		public function action_put_complevelprofile()
		{
			$this->payloadDesc = "Change the Competition Level Profiles for the Organization";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// complevel_profiles_id 
			// Change The Competition Level ID of the Organization ID
				
			if((int)trim($this->put('complevel_profiles_id')) > 0)
			{
				$arguments["complevel_profiles_id"] = (int)trim($this->put('complevel_profiles_id'));
			}


		}
		
		/**
		 * action_put_seasonprofile() Change the Season Profiles for the Organization
		 * via /api/org/seasonprofile/{orgs_id}
		 *
		 */
		public function action_put_seasonprofile()
		{
			$this->payloadDesc = "Change the Season Profiles for the Organization";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// season_profiles_id 
			// Change the Season Profiles ID
				
			if((int)trim($this->put('season_profiles_id')) > 0)
			{
				$arguments["season_profiles_id"] = (int)trim($this->put('season_profiles_id'));
			}


		}
		
		/**
		 * action_put_sport() Update the org / sport association (for future use)
		 * via /api/org/sport/{orgs_id}
		 *
		 */
		public function action_put_sport()
		{
			$this->payloadDesc = "Update the org / sport association (for future use)";
			$arguments = array();
		

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete an Organization
		 * via /api/org/base/{orgs_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete an Organization";
			$arguments = array();
		

		}
		
		/**
		 * action_delete_sport() Delete the org / sport association
		 * via /api/org/sport/{orgs_id}
		 *
		 */
		public function action_delete_sport()
		{
			$this->payloadDesc = "Delete the org / sport association";
			$arguments = array();
		

		}
		
	}