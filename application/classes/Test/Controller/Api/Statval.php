<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Statval API controller class
 *
 * Date: Auto-generated on Apr 11th, 2013 12:30 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Statval extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Stats_Vals'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new User Value for a Statistic
		 * via /api/statval/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new User Value for a Statistic";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// stats_id (REQUIRED)
			// The ID of the statistic
				
			if((int)trim($this->request->post('stats_id')) > 0)
			{
				$arguments["stats_id"] = (int)trim($this->request->post('stats_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "stats_id",
					"param_desc" => "The ID of the statistic"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// users_id (REQUIRED)
			// The ID of the user we are adding the value for
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$arguments["users_id"] = (int)trim($this->request->post('users_id'));
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
				return false;

			}
			
			// teams_id 
			// The Team that this statistic is associated with
				
			if((int)trim($this->request->post('teams_id')) > 0)
			{
				$arguments["teams_id"] = (int)trim($this->request->post('teams_id'));
			}

			// statval 
			// The user's value
				
			if(trim($this->request->post('statval')) != "")
			{
				$arguments["statval"] = trim($this->request->post('statval'));
			}

			// statdate 
			// The date that this statistic took place on
				
			if($this->request->post('statdate') != "")
			{
				// Format as date
				$arguments["statdate"] = date("Y-m-d H:i:s",strtotime($this->request->post('statdate')));
			}

			// games_id 
			// The game that this statistic refers to
				
			if((int)trim($this->request->post('games_id')) > 0)
			{
				$arguments["games_id"] = (int)trim($this->request->post('games_id'));
			}

			// stat_contexts_id 
			// The ID of the context for this statistic
				
			if((int)trim($this->request->post('stat_contexts_id')) > 0)
			{
				$arguments["stat_contexts_id"] = (int)trim($this->request->post('stat_contexts_id'));
			}


		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}