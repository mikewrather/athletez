<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Complevel API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
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
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		
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
				
			if((int)trim($this->request->query('seasons_id')) > 0)
			{
				$seasons_id = (int)trim($this->request->query('seasons_id'));
			}

			// orgs_id 
			// Filter teams for a certain competition level to only show those for a specific organization
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$orgs_id = (int)trim($this->request->query('orgs_id'));
			}

			// sports_id 
			// Filter teams for a certain competition level to only show those for a specific sport
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->query('sports_id'));
			}

			// divisions_id 
			// Filter teams for a certain competition level to only show those for a specific division
				
			if((int)trim($this->request->query('divisions_id')) > 0)
			{
				$divisions_id = (int)trim($this->request->query('divisions_id'));
			}

			// leagues_id 
			// Filter teams for a certain competition level to only show those for a specific league
				
			if((int)trim($this->request->query('leagues_id')) > 0)
			{
				$leagues_id = (int)trim($this->request->query('leagues_id'));
			}

			// sections_id 
			// Filter teams for a certain competition level to only show those for a specific section
				
			if((int)trim($this->request->query('sections_id')) > 0)
			{
				$sections_id = (int)trim($this->request->query('sections_id'));
			}

			// states_id 
			// Filter teams for a certain competition level to only show those for a specific state
				
			if((int)trim($this->request->query('states_id')) > 0)
			{
				$states_id = (int)trim($this->request->query('states_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$param = array(
				'complevels_id' => $this->mainModel->id,
				'seasons_id' => $seasons_id,
				'orgs_id' => $orgs_id,
				'sports_id' => $sports_id,
				'divisions_id' => $divisions_id,
				'leagues_id' => $leagues_id,
				'sections_id' => $sections_id,
				'states_id' => $states_id
			);

			return $this->mainModel->getTeams($param);
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
				
			if((int)trim($this->request->query('complevel_profiles_id')) > 0)
			{
				$complevel_profiles_id = (int)trim($this->request->query('complevel_profiles_id'));
			}
			$args = array('complevel_profiles_id' => $complevel_profiles_id);

			return $this->mainModel->getListAll($args);
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
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Add a new Competition Level";
			$args = array(); 
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the new Competition Level
				
			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}

			// complevel_profiles_id (REQUIRED)
			// The Competition Level Profile the Complevel belongs to
				
			if((int)trim($this->request->post('complevel_profiles_id')) > 0)
			{
				$args['complevel_profiles_id'] = (int)trim($this->request->post('complevel_profiles_id'));
			}

			if((int)trim($this->request->post('min_age')) > 0)
			{
				$args['min_age'] = (int)trim($this->request->post('min_age'));
			}

			if((int)trim($this->request->post('max_age')) > 0)
			{
				$args['max_age'] = (int)trim($this->request->post('max_age'));
			}


                $result = $this->mainModel->addComplevel($args);    
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
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Update basic info on competion level";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Competition Level
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim(urldecode($this->put('name')));
			}

			// complevel_profiles_id 
			// Change the Competition Profile
				
			if((int)trim($this->put('complevel_profiles_id')) > 0)
			{
				$args['complevel_profiles_id'] = (int)trim($this->put('complevel_profiles_id'));
			}

			// min_age 
			// Change Minimum Age for this Comp Level
				
			if((int)trim($this->put('min_age')) > 0)
			{
				$args['min_age'] = (int)trim($this->put('min_age'));
			}

			// max_age 
			// Change Maximum Age for this Comp Level
				
			if((int)trim($this->put('max_age')) > 0)
			{
				$args['max_age'] = (int)trim($this->put('max_age'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$result = $this->mainModel->updateComplevel($args);
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
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Delete Competition Level";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->delete();
		}
		
	}