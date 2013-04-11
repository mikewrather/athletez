<?php defined('SYSPATH') or die('No direct script access.');

/**
 * League API controller class
 *
 * Date: Auto-generated on Apr 11th, 2013 12:30 am
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
			$arguments = array();
		

		}
		
		/**
		 * action_get_orgs() All organizations within a League
		 * via /api/league/orgs/{leagues_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a League";
			$arguments = array();
		

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
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the League to add
				
			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "name",
					"param_desc" => "Name of the League to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// sections_id 
			// The ID of the Section (if applicable)
				
			if((int)trim($this->request->post('sections_id')) > 0)
			{
				$arguments["sections_id"] = (int)trim($this->request->post('sections_id'));
			}

			// states_id (REQUIRED)
			// The ID of the state the League belongs to
				
			if((int)trim($this->request->post('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->post('states_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "states_id",
					"param_desc" => "The ID of the state the League belongs to"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			

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
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the league
				
			if(trim($this->put('name')) != "")
			{
				$arguments["name"] = trim($this->put('name'));
			}

			// states_id 
			// Change the state of this league
				
			if((int)trim($this->put('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->put('states_id'));
			}

			// sections_id 
			// Change the Section this league belongs to
				
			if((int)trim($this->put('sections_id')) > 0)
			{
				$arguments["sections_id"] = (int)trim($this->put('sections_id'));
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
			$arguments = array();
		

		}
		
	}