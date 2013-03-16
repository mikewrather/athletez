<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedatagroup API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
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

		
		}
		
		/**
		 * action_get_resumedata() Returns a list of the resume data for a given group
		 * via /api/resumedatagroup/resumedata/{resume_data_groups_id}
		 *
		 */
		public function action_get_resumedata()
		{
			$this->payloadDesc = "Returns a list of the resume data for a given group";

		
		}
		
		/**
		 * action_get_profiles() Returns all Resume Data Profiles for which this Resume Data Group exists
		 * via /api/resumedatagroup/profiles/{resume_data_groups_id}
		 *
		 */
		public function action_get_profiles()
		{
			$this->payloadDesc = "Returns all Resume Data Profiles for which this Resume Data Group exists";

		
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

		         // CHECK FOR PARAMETERS:
			// resume_data_profiles_id (REQUIRED)
			// The Resume Data Profile to link the Group
				
			if((int)trim($this->request->post('resume_data_profiles_id')) > 0)
			{
				$resume_data_profiles_id = (int)trim($this->request->post('resume_data_profiles_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
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

		         // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Resume Data Group
				
			if(trim($this->request->body('name')) != "")
			{
				$name = trim($this->request->body('name'));
			}

			// description 
			// Change the description of the Resume Data Group
				
			if(trim($this->request->body('description')) != "")
			{
				$description = trim($this->request->body('description'));
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

		
		}
		
	}