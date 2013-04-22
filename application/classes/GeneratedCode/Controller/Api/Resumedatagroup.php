<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedatagroup API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Resumedatagroup extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Resume_Data_Group'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Retrives basic information for a resume data group
		 * via /api/resumedatagroup/basics/{resume_data_groups_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Retrives basic information for a resume data group";
			$arguments = array();
		

		}
		
		/**
		 * action_get_resumedata() Returns a list of the resume data for a given group
		 * via /api/resumedatagroup/resumedata/{resume_data_groups_id}
		 *
		 */
		public function action_get_resumedata()
		{
			$this->payloadDesc = "Returns a list of the resume data for a given group";
			$arguments = array();
		

		}
		
		/**
		 * action_get_profiles() Returns all Resume Data Profiles for which this Resume Data Group exists
		 * via /api/resumedatagroup/profiles/{resume_data_groups_id}
		 *
		 */
		public function action_get_profiles()
		{
			$this->payloadDesc = "Returns all Resume Data Profiles for which this Resume Data Group exists";
			$arguments = array();
		

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_addtordp() Link this RDG to an RDP
		 * via /api/resumedatagroup/addtordp/{resume_data_groups_id}
		 *
		 */
		public function action_post_addtordp()
		{
			$this->payloadDesc = "Link this RDG to an RDP";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// resume_data_profiles_id (REQUIRED)
			// The Resume Data Profile to link the Group
				
			if((int)trim($this->request->post('resume_data_profiles_id')) > 0)
			{
				$arguments["resume_data_profiles_id"] = (int)trim($this->request->post('resume_data_profiles_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "resume_data_profiles_id",
					"param_desc" => "The Resume Data Profile to link the Group"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// name 
			// The name of the Resume Data Group
				
			if(trim($this->request->post('name')) != "")
			{
				$arguments["name"] = trim($this->request->post('name'));
			}


		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Updates basic information for a resume data group
		 * via /api/resumedatagroup/basics/{resume_data_groups_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Updates basic information for a resume data group";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Resume Data Group
				
			if(trim($this->put('name')) != "")
			{
				$arguments["name"] = trim($this->put('name'));
			}

			// description 
			// Change the description of the Resume Data Group
				
			if(trim($this->put('description')) != "")
			{
				$arguments["description"] = trim($this->put('description'));
			}


		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Resume Data Group
		 * via /api/resumedatagroup/base/{resume_data_groups_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Resume Data Group";
			$arguments = array();
		

		}
		
	}