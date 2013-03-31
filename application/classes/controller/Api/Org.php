<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Org API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
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
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			return $this->mainModel;
		
		}
		
		/**
		 * action_get_teams() List of all teams within the organization
		 * via /api/org/teams/{orgs_id}
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "List of all teams within the organization";
			
			$args = array();
		     // CHECK FOR PARAMETERS:
			// sports_id 
			// Will filter the list of teams to a given sport
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id 
			// Filter the teams list to a given competition level
				
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$args['complevels_id'] = (int)trim($this->request->query('complevels_id'));
			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			 
			return $this->mainModel->getTeams($args);
		}
		
		/**
		 * action_get_league() League that the organization belongs to
		 * via /api/org/league/{orgs_id}
		 *
		 */
		public function action_get_league()
		{
			$this->payloadDesc = "League that the organization belongs to";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			 
			return $this->mainModel->getLeague();
		}
		
		/**
		 * action_get_division() Division that the organization belongs to
		 * via /api/org/division/{orgs_id}
		 *
		 */
		public function action_get_division()
		{
			$this->payloadDesc = "Division that the organization belongs to";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			 
			return $this->mainModel->getDivisions();
		}
		
		/**
		 * action_get_sports() All sports associated with a given organization
		 * via /api/org/sports/{orgs_id}
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "All sports associated with a given organization";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			 
			return $this->mainModel->getSports();
		}
		
		/**
		 * action_get_complevels() List of possible competition levels for this organization
		 * via /api/org/complevels/{orgs_id}
		 *
		 */
		public function action_get_complevels()
		{
			$this->payloadDesc = "List of possible competition levels for this organization";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			 
			return $this->mainModel->getComplevels();
		}
		
		/**
		 * action_get_seasons() List of all seasons this organization plays
		 * via /api/org/seasons/{orgs_id}
		 *
		 */
		public function action_get_seasons()
		{
			$this->payloadDesc = "List of all seasons this organization plays";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			 
			return $this->mainModel->getSessons();
		}
		
		/**
		 * action_get_section() If applicable, returns the section that the organization exists in.
		 * via /api/org/section/{orgs_id}
		 *
		 */
		public function action_get_section()
		{
			$this->payloadDesc = "If applicable, returns the section that the organization exists in.";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			 
			return $this->mainModel->getSection();
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

		     // CHECK FOR PARAMETERS:
			// name 
			// The name of the organization

			$new_org = ORM::factory('Sportorg_Org');
				
			if(trim($this->request->post('name')) != '')
			{
				$name = trim($this->request->post('name'));
				$new_org->name = $name;
			}

			// singlesport 
			// This is a 1 or a 0 for true / false
				
			if($this->request->post('singlesport') != "")
			{
				//convert singlesport to a boolean
				$singlesport = $this->request->post('singlesport');
				$new_org->single_sport = $singlesport;
			}

			$season_profiles_id = trim($this->request->post('season_profiles_id'));
			$new_org->season_profiles_id = $season_profiles_id;

			$complevel_profiles_id = trim($this->request->post('complevel_profiles_id'));
			$new_org->complevel_profiles_id = $complevel_profiles_id;

			$leagues_id = trim($this->request->post('leagues_id'));
			$new_org->leagues_id = $leagues_id;

			$divisions_id = trim($this->request->post('divisions_id'));
			$new_org->divisions_id = $divisions_id;

			//add validation & save logics here
			$sport_validate = Validation::factory($new_org->as_array())
				->rule('name', 'not_empty')
				->rule('single_sport', 'not_empty')
				->rule('single_sport', 'in_array', array(':value', array(0, 1)))
				->rule('season_profiles_id', 'not_equals', array(':value', 0))
				->rule('complevel_profiles_id', 'not_equals', array(':value', 0))
				->rule('leagues_id', 'not_equals', array(':value', 0))
				->rule('divisions_id', 'not_equals', array(':value', 0));

			if (!$sport_validate->check()){
				$validate_errors = $sport_validate->errors('models/sportorg/org');
				$error_array = array(
					"error" => implode('\n', $validate_errors),
					"param_name" => "name",
					"param_desc" => "Name of the Org to add"
				);
				// Set whether it is a fatal error
				$is_fatal = true;
				$this->addError($error_array,$is_fatal);
				return $new_org;
			}


			$this->processObjectSave($new_org);

			return $new_org;

		}
		
		/**
		 * action_post_addsport() Add a new sport association for the organization
		 * via /api/org/addsport/{orgs_id}
		 *
		 */
		public function action_post_addsport()
		{
			$this->payloadDesc = "Add a new sport association for the organization";

		     // CHECK FOR PARAMETERS:
			// sports_id 
			// Add a Sport to this Organization

			$this_org = ORM::factory('Sportorg_Org',$this->myID);

			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
				$this_org->addSport($sports_id);
			}
			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "sports_id",
					"param_desc" => "The ID of the sport being associated with this organization"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}

			return $this_org;
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

		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the organization
				
			if(trim($this->put('name')) != "")
			{
				$name = trim($this->put('name'));
			}

			// signle_sport 
			// Change whether this is a one-sport organization
				
			if($this->put('signle_sport') != "")
			{
				//convert signle_sport to a boolean
				$signle_sport = (bool)$this->put('signle_sport');
			}

			// leagues_id 
			// Change the league this organization belongs to
				
			if((int)trim($this->put('leagues_id')) > 0)
			{
				$leagues_id = (int)trim($this->put('leagues_id'));
			}

			// divisions_id 
			// Change the division this organization belong to
				
			if((int)trim($this->put('divisions_id')) > 0)
			{
				$divisions_id = (int)trim($this->put('divisions_id'));
			}

			// season_profiles_id 
			// Change the Season Profile this organization uses
				
			if((int)trim($this->put('season_profiles_id')) > 0)
			{
				$season_profiles_id = (int)trim($this->put('season_profiles_id'));
			}

			// complevel_profiles_id 
			// Change the Competition Level Profile
				
			if((int)trim($this->put('complevel_profiles_id')) > 0)
			{
				$complevel_profiles_id = (int)trim($this->put('complevel_profiles_id'));
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

		     // CHECK FOR PARAMETERS:
			// divisions_id 
			// Change the Division ID
				
			if((int)trim($this->put('divisions_id')) > 0)
			{
				$divisions_id = (int)trim($this->put('divisions_id'));
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

		     // CHECK FOR PARAMETERS:
			// complevel_profiles_id 
			// Change The Competition Level ID of the Organization ID
				
			if((int)trim($this->put('complevel_profiles_id')) > 0)
			{
				$complevel_profiles_id = (int)trim($this->put('complevel_profiles_id'));
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

		     // CHECK FOR PARAMETERS:
			// season_profiles_id 
			// Change the Season Profiles ID
				
			if((int)trim($this->put('season_profiles_id')) > 0)
			{
				$season_profiles_id = (int)trim($this->put('season_profiles_id'));
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

		
		}
		
		/**
		 * action_delete_sport() Delete the org / sport association
		 * via /api/org/sport/{orgs_id}
		 *
		 */
		public function action_delete_sport()
		{
			$this->payloadDesc = "Delete the org / sport association";

		
		}
		
	}