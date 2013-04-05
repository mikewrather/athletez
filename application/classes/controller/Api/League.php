<?php defined('SYSPATH') or die('No direct script access.');

/**
 * League API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_League extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_League'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basics on a League
		 * via /api/league/basics/{leagues_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basics on a League";
			//Check for ID and end the call if there isn't one
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			return $this->mainModel;
		}
		
		/**
		 * action_get_orgs() All organizations within a League
		 * via /api/league/orgs/{leagues_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a League";
		
			//Check for ID and end the call if there isn't one
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel->getOrgs();
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new League
		 * via /api/league/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new League";

			$new_league = ORM::factory('Sportorg_League');
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}
			// sections_id
			// The ID of the Section (if applicable)

			$sections_id = (int)trim($this->request->post('sections_id'));
			$states_id = trim($this->request->post('states_id'));

			$new_league->name = $name;
			$new_league->sections_id = $sections_id;
			$new_league->states_id = $states_id;

			//add validation & save logic here
			$league_validate = Validation::factory($new_league->as_array())
				->rule('name', 'not_empty')
				->rule('sections_id', 'not_empty')
				->rule('sections_id', 'not_equals', array(':value', 0))
				->rule('states_id', 'not_empty')
				->rule('states_id', 'not_equals', array(':value', 0));

			if (!$league_validate->check()){
				$validate_errors = $league_validate->errors('models/sportorg/league');
				$error_array = array(
					"error" => implode('\n', $validate_errors),
					"param_name" => "name",
					"param_desc" => "Name of the League to add"
				);
				// Set whether it is a fatal error
				$is_fatal = true;
				$this->addError($error_array,$is_fatal);
				return $new_league;
			}
			//validate already pass
			$new_league->save();
			return $new_league;
			
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basics on a League
		 * via /api/league/basics/{leagues_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basics on a League";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the league
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim($this->put('name'));
			}

			// states_id 
			// Change the state of this league
				
			if((int)trim($this->put('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->put('states_id'));
			}

			// sections_id 
			// Change the Section this league belongs to
				
			if((int)trim($this->put('sections_id')) > 0)
			{
				$args['sections_id'] = (int)trim($this->put('sections_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			try
			{
				$update_obj = $this->mainModel->updateLeague($args);
				return $update_obj->save();					
			}catch(Exception $e)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save county",
					"desc" => $e->getMessage()
				);
				 
				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				 
				return $this;
			}
		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  League
		 * via /api/league/base/{leagues_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  League";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			return $this->mainModel->delete();
		}
		
	}