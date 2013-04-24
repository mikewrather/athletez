<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Stat API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Stat extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Stats_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information for a given stat
		 * via /api/stat/basics/{stats_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information for a given stat";

		
		}
		
		/**
		 * action_get_listall() Lists all statistics (apply filters)
		 * via /api/stat/listall/{stats_id}
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Lists all statistics (apply filters)";

		     // CHECK FOR PARAMETERS:
			// get_top 
			// This will get the number of stats specified by the parameter
				
			if((int)trim($this->request->query('get_top')) > 0)
			{
				$get_top = (int)trim($this->request->query('get_top'));
			}

			// sports_id 
			// Narrow to show the stats for a specific sport
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->query('sports_id'));
			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_addval() Add a Stat value for a given statistic
		 * via /api/stat/addval/{stats_id}
		 *
		 */
		public function action_post_addval()
		{
			$this->payloadDesc = "Add a Stat value for a given statistic";

		     // CHECK FOR PARAMETERS:
			// users_id (REQUIRED)
			// The ID of the user we are adding the value for
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->post('users_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "users_id",
					"param_desc" => "The ID of the user we are adding the value for"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// teams_id 
			// The Team that this statistic is associated with
				
			if((int)trim($this->request->post('teams_id')) > 0)
			{
				$teams_id = (int)trim($this->request->post('teams_id'));
			}

			// statval 
			// The user's value
				
			if(trim($this->request->post('statval')) != "")
			{
				$statval = trim($this->request->post('statval'));
			}

			// statdate 
			// The date that this statistic took place on
				
			if($this->request->post('statdate') != "")
			{
				// Format as date
				$statdate = date("Y-m-d H:i:s",strtotime($this->request->post('statdate')));
			}

			// games_id 
			// The game that this statistic refers to
				
			if((int)trim($this->request->post('games_id')) > 0)
			{
				$games_id = (int)trim($this->request->post('games_id'));
			}

			// stat_contexts_id 
			// The ID of the context for this statistic
				
			if((int)trim($this->request->post('stat_contexts_id')) > 0)
			{
				$stat_contexts_id = (int)trim($this->request->post('stat_contexts_id'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information for a given stat
		 * via /api/stat/basics/{stats_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information for a given stat";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of this Statistic
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim(urldecode($this->put('name')));
			}

			// description 
			// Change the description of this Statistic
				
			if(trim($this->put('description')) != "")
			{
				$args['description'] = trim(urldecode($this->put('description')));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$result = $this->mainModel->updateStat($args);
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
		 * action_delete_base() Delete  a given stat
		 * via /api/stat/base/{stats_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  a given stat";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->delete();
		}
		
	}