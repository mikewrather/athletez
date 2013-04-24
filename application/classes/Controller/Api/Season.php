<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Season API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
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
			$args = array();
		     // CHECK FOR PARAMETERS:
			// complevels_id 
			// Filter teams for a certain season to only show those for a specific competition level
				
			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$args['complevels_id'] = (int)trim($this->request->query('complevels_id'));
			}

			// orgs_id 
			// Filter teams for a certain season to only show those for a specific organization
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$args['orgs_id'] = (int)trim($this->request->query('orgs_id'));
			}

			// sports_id 
			// Filter teams for a certain season to only show those for a specific sport
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->request->query('sports_id'));
			}

			// divisions_id 
			// Filter teams for a certain season to only show those for a specific division
				
			if((int)trim($this->request->query('divisions_id')) > 0)
			{
				$args['divisions_id'] = (int)trim($this->request->query('divisions_id'));
			}

			// leagues_id 
			// Filter teams for a certain season to only show those for a specific league
				
			if((int)trim($this->request->query('leagues_id')) > 0)
			{
				$args['leagues_id'] = (int)trim($this->request->query('leagues_id'));
			}

			// sections_id 
			// Filter teams for a certain season to only show those for a specific section
				
			if((int)trim($this->request->query('sections_id')) > 0)
			{
				$args['sections_id'] = (int)trim($this->request->query('sections_id'));
			}

			// states_id 
			// Filter teams for a certain season to only show those for a specific state
				
			if((int)trim($this->request->query('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->request->query('states_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			return $this->mainModel->getTeams($args);
		}
		
		/**
		 * action_get_basics() Basic information about a season
		 * via /api/season/basics/{seasons_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a season";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel; 
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

		     // CHECK FOR PARAMETERS:
			// name 
			// Name of the season to add
			$new_season = ORM::factory('Sportorg_Seasons_Base');
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			$season_profiles_id = trim($this->request->post('season_profiles_id'));
			$new_season->name = $name;
			$new_season->season_profiles_id = $season_profiles_id;

			//add validation & save logic here
			$season_validate = Validation::factory($new_season->as_array())
				->rule('name', 'not_empty')
				->rule('season_profiles_id', 'not_empty')
				->rule('season_profiles_id', 'not_equals', array(':value', 0));

			if (!$season_validate->check()){
				$validate_errors_arr = $season_validate->errors('models/sportorg/seasons/base');
				$error_array = array(
					"error" => implode('\n', $validate_errors_arr),
					"param_name" => "name",
					"param_desc" => "Name of the Season to add"
				);
				// Set whether it is a fatal error
				$is_fatal = true;
				$this->addError($error_array,$is_fatal);
				return $new_season;
			}
			//validate already pass
			$new_season->save();
			return $new_season;
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

		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Season
				
			if(trim($this->put('name')) != "")
			{
				$name = trim($this->put('name'));
			}

			// seasons_profiles_id 
			// Change the Season Profile this season belongs to
				
			if((int)trim($this->put('seasons_profiles_id')) > 0)
			{
				$seasons_profiles_id = (int)trim($this->put('seasons_profiles_id'));
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

		
		}
		
	}