<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedataval API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Resumedataval extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Resume_Data_Vals'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a given data value for resume data
		 * via /api/resumedataval/basics/{resume_data_vals_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a given data value for resume data";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new Resume Data Value for a User's Resume
		 * via /api/resumedataval/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Resume Data Value for a User\'s Resume";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// resume_data_id (REQUIRED)
			// The ID of the resume data you are adding
				
			if((int)trim($this->request->post('resume_data_id')) > 0)
			{
				$args['resume_data_id'] = (int)trim($this->request->post('resume_data_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "resume_data_id",
					"param_desc" => "The ID of the resume data you are adding"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// user_value (REQUIRED)
			// The Value the user entered for this resume data
				
			if(trim($this->request->post('user_value')) != "")
			{
				$args['user_value'] = trim($this->request->post('user_value'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "user_value",
					"param_desc" => "The Value the user entered for this resume data"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// users_id 
			// This will default to the logged in user if left blank
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$args['users_id'] = (int)trim($this->request->post('users_id'));
			}
			
			$resume_data_val = ORM::factory('User_Resume_Data_Vals');
			return $resume_data_val->addResumeDataVal($args);

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information about a given data value for resume data
		 * via /api/resumedataval/basics/{resume_data_vals_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about a given data value for resume data";

		     // CHECK FOR PARAMETERS:
			// user_value 
			// Update the user's entered value for this peice of resume data
				
			if(trim($this->put('user_value')) != "")
			{
				$user_value = trim($this->put('user_value'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete a given data value for resume data
		 * via /api/resumedataval/base/{resume_data_vals_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a given data value for resume data";

		
		}
		
	}