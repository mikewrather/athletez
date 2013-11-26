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
			 $args['id'] = $this->mainModel->id;
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

			$org_id = $this->mainModel->id;
			 
			return $this->mainModel->getDivision($org_id);
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

			$args['id'] = $this->mainModel->id;
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$args["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			return $this->mainModel->getComplevels($args);
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

			$args['id'] = $this->mainModel->id;
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$args["sports_id"] = (int)trim($this->request->query('sports_id'));
			}
			// complevels_id
			// Complevels ID

			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$args["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			return $this->mainModel->getSeasons($args);
		}

		/**
		 * action_get_seasonteams() List of all seasons this organization plays
		 * via /api/org/seasons/{orgs_id}
		 *
		 */
		public function action_get_seasonteams()
		{
			$this->payloadDesc = "List of all seasons this organization plays";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$args['id'] = $this->mainModel->id;
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$args["sports_id"] = (int)trim($this->request->query('sports_id'));
			}
			// complevels_id
			// Complevels ID

			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$args["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			return $this->mainModel->getSeasonTeams($args);
		}

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
				$arguments["sports_club"] = Util::convert_to_boolean($this->request->query('sports_club'));
				if ($arguments["sports_club"] == null){
					$error_array = array(
						"error" => "True/false required",
						"desc" => "Invalid sports club value"
					);
					$this->modelNotSetError($error_array);
				}
			}

			// states_id (REQUIRED)
			// This will be necessary to narrow the list because there are so many organizations.

			if((int)trim($this->request->query('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->query('states_id'));
				if (!Valid::states_id_exist($arguments["states_id"])){
					$error_array = array(
						"error" => "States id invalid",
						"desc" => "States ID doesn't exist"
					);
					$this->modelNotSetError($error_array);
					return false;
				}
			}
/*			else // THIS WAS A REQUIRED PARAMETER
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
*/
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

			if(trim($this->request->query('org_name')) != "")
			{
				$arguments["name"] = trim($this->request->query('org_name'));
			}

			if(trim($this->request->query('searchtext')) != "")
			{
				$arguments["name"] = trim($this->request->query('searchtext'));
			}

			//get results here.
			$result = $this->mainModel->get_search($arguments);

			return $result;
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

			$args['id'] = $this->mainModel->id;
			return $this->mainModel->getSection($args);
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
			//Must logged user can do action
			if (!$this->is_logged_user()){
				return $this->throw_authentication_error();
			}

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
				$arguments["sports_club"] =$this->request->post('sports_club');
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

			if((int)trim($this->request->post('locations_id')) > 0)
			{
				$arguments["locations_id"] = (int)trim($this->request->post('locations_id'));
			}
			elseif((int)trim($this->request->post('location_id')) > 0)
			{
				$arguments["locations_id"] = (int)trim($this->request->post('location_id'));
			}

			if((int)trim($this->request->post('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->post('states_id'));
			}

			$new_org = ORM::factory('Sportorg_Org');
			$result = $new_org->addOrg($arguments);

			//Check for success / error
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
			}
		}
		
		/**
		 * action_post_addsport() Add a new sport association for the organization
		 * via /api/org/addsport/{orgs_id}
		 *
		 */
		public function action_post_addsport()
		{
			//Must logged user can do action
			if (!$this->is_logged_user()){
				return $this->throw_authentication_error();
			}

			$this->payloadDesc = "Add a new sport association for the organization";

		     // CHECK FOR PARAMETERS:
			// sports_id 
			// Add a Sport to this Organization

			$this_org = ORM::factory('Sportorg_Org',$this->myID);

			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
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
			if (Model_Sportorg_Org::orgs_sports_id_exist($this->mainModel->id, $sports_id)){
				//report error
				$error_array = array(
					"error" => "Sports already exist",
					"desc" => "Sports already exist"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$this_org->addSport($sports_id);
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
			//Must logged user can do action
			if (!$this->is_logged_user()){
				return $this->throw_authentication_error();
			}

			if(!$this->user->can('Orgcontent', array('action'=>'modify'))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to modify",
					"desc" => "In order to modify this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$this->payloadDesc = "Update Basic information about the organization";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the organization
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim($this->put('name'));
			}

			// signle_sport
			// Change whether this is a one-sport organization

			if($this->put('sports_club') != "")
			{
				//convert signle_sport to a boolean
				$args['sports_club'] = Util::convert_to_boolean($this->put('sports_club'));

			}
			// leagues_id
			// Change the league this organization belongs to

			if((int)trim($this->put('leagues_id')) > 0)
			{
				$args['leagues_id'] = (int)trim($this->put('leagues_id'));
			}

			// divisions_id
			// Change the division this organization belong to

			if((int)trim($this->put('divisions_id')) > 0)
			{
				$args['divisions_id'] = (int)trim($this->put('divisions_id'));
			}

			// season_profiles_id
			// Change the Season Profile this organization uses

			if((int)trim($this->put('season_profiles_id')) > 0)
			{
				$args['season_profiles_id'] = (int)trim($this->put('season_profiles_id'));
			}

			// complevel_profiles_id
			// Change the Competition Level Profile

			if((int)trim($this->put('complevel_profiles_id')) > 0)
			{
				$args['complevel_profiles_id'] = (int)trim($this->put('complevel_profiles_id'));
			}

			if((int)trim($this->put('locations_id')) > 0)
			{
				$args['locations_id'] = (int)trim($this->put('locations_id'));
			}

			if((int)trim($this->put('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->put('states_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$result =  $this->mainModel->updateOrg($args);
			//Check for success / error
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
			}
			
		}
		
		/**
		 * action_put_division() Change the Division for an Organization
		 * via /api/org/division/{orgs_id}
		 *
		 */
		public function action_put_division()
		{
			if(!$this->user->can('Orgcontent', array('action'=>'modify'))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to modify",
					"desc" => "In order to modify this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$this->payloadDesc = "Change the Division for an Organization";

		     // CHECK FOR PARAMETERS:
			// divisions_id 
			// Change the Division ID
				
			if((int)trim($this->put('divisions_id')) > 0)
			{
				$divisions_id = (int)trim($this->put('divisions_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$result =  $this->mainModel->updateDivision($divisions_id);
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
			}
		}
		
		/**
		 * action_put_complevelprofile() Change the Competition Level Profiles for the Organization
		 * via /api/org/complevelprofile/{orgs_id}
		 *
		 */
		public function action_put_complevelprofile()
		{

			if(!$this->user->can('Orgcontent', array('action'=>'modify'))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to modify",
					"desc" => "In order to modify this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$this->payloadDesc = "Change the Competition Level Profiles for the Organization";

		     // CHECK FOR PARAMETERS:
			// complevel_profiles_id 
			// Change The Competition Level ID of the Organization ID
				
			if((int)trim($this->put('complevel_profiles_id')) > 0)
			{
				$complevel_profiles_id = (int)trim($this->put('complevel_profiles_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$result = $this->mainModel->updateComplevelprofile($complevel_profiles_id);
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
			}
		}
		
		/**
		 * action_put_seasonprofile() Change the Season Profiles for the Organization
		 * via /api/org/seasonprofile/{orgs_id}
		 *
		 */
		public function action_put_seasonprofile()
		{
			if(!$this->user->can('Orgcontent', array('action'=>'modify'))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to modify",
					"desc" => "In order to modify this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$this->payloadDesc = "Change the Season Profiles for the Organization";

		     // CHECK FOR PARAMETERS:
			// season_profiles_id 
			// Change the Season Profiles ID
				
			if((int)trim($this->put('season_profiles_id')) > 0)
			{
				$season_profiles_id = (int)trim($this->put('season_profiles_id'));
			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$result = $this->mainModel->updateSeasonProfile($season_profiles_id);
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
			}
		}
		
		/**
		 * action_put_sport() Update the org / sport association (for future use)
		 * via /api/org/sport/{orgs_id}
		 *
		 */
		public function action_put_sport()
		{
			if(!$this->user->can('Orgcontent', array('action'=>'modify'))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to modify",
					"desc" => "In order to modify this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$this->payloadDesc = "Update the org / sport association (for future use)";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// sports_id
			// Sports ID

			if((int)trim($this->put('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->put('sports_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$result = $this->mainModel->updateOrgSportLink($this->mainModel->id, $arguments["sports_id"]);
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
			}
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
			if(!$this->user->can('Orgcontent', array('action'=>'delete'))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to delete",
					"desc" => "In order to delete this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$this->payloadDesc = "Delete an Organization";
			$this->mainModel->delete_with_deps();
			return $this->mainModel;

		}
		
		/**
		 * action_delete_sport() Delete the org / sport association
		 * via /api/org/sport/{orgs_id}
		 *
		 */
		public function action_delete_sport()
		{
			if(!$this->user->can('Orgcontent', array('action'=>'delete'))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to delete",
					"desc" => "In order to delete this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}
			$this->payloadDesc = "Delete the org / sport association";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if((int)trim($this->delete('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->delete('sports_id'));
			}

			if (!isset($arguments["sports_id"])){
				$error_array = array(
					"error" => "Sports ID required",
					"desc" => "Sports ID required"
				);
				$this->modelNotSetError($error_array);
			}
			$this->mainModel->deleteSport($this->mainModel->id, $arguments["sports_id"]);
		}
		
	}