<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedataprofile API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Resumedataprofile extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Resume_Data_Profile'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Returns basic info for a given Resume Data Profile
		 * via /api/resumedataprofile/basics/{resume_data_profiles_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Returns basic info for a given Resume Data Profile";

		
		}
		
		/**
		 * action_get_datagroups() Returns all Resume Data Groups for a given Resume Data Profile
		 * via /api/resumedataprofile/datagroups/{resume_data_profiles_id}
		 *
		 */
		public function action_get_datagroups()
		{
			$this->payloadDesc = "Returns all Resume Data Groups for a given Resume Data Profile";

		
		}
		
		/**
		 * action_get_sports() Returns all sports for a given Resume Data Profile
		 * via /api/resumedataprofile/sports/{resume_data_profiles_id}
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "Returns all sports for a given Resume Data Profile";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_linksport() Link this RDP to a Sport
		 * via /api/resumedataprofile/linksport/{resume_data_profiles_id}
		 *
		 */
		public function action_post_linksport()
		{
			$this->payloadDesc = "Link this RDP to a Sport";

		         // CHECK FOR PARAMETERS:
			// sports_id (REQUIRED)
			// The sport to link the Resume Data Profile to
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
		}
		
		/**
		 * action_post_linkrdg() Link to a Resume Data Group
		 * via /api/resumedataprofile/linkrdg/{resume_data_profiles_id}
		 *
		 */
		public function action_post_linkrdg()
		{
			$this->payloadDesc = "Link to a Resume Data Group";

		         // CHECK FOR PARAMETERS:
			// resume_data_groups_id (REQUIRED)
			// The Resume Data Group to link to this Profile
				
			if((int)trim($this->request->post('resume_data_groups_id')) > 0)
			{
				$resume_data_groups_id = (int)trim($this->request->post('resume_data_groups_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
		}
		
		/**
		 * action_post_add() Add a new Resume Data Profile
		 * via /api/resumedataprofile/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Resume Data Profile";

		         // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the Resume Data Profile to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// sports (REQUIRED)
			// An array of sports_id's in the form "sports" : [1,2,4,7]
				
			if(isset($this->request->post('sports')))
			{
				$sports_array = $this->request->post('sports');
				foreach($sports_array as $sports_key =>$sports_val)
				{
					// Access each item in the array through the $sports_val variable
				}
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
		 * action_put_basics() Updates basic info for a given Resume Data Profile
		 * via /api/resumedataprofile/basics/{resume_data_profiles_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Updates basic info for a given Resume Data Profile";

		         // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Resume Data Group
				
			if(trim($this->request->body('name')) != "")
			{
				$name = trim($this->request->body('name'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Resume Data Profile
		 * via /api/resumedataprofile/base/{resume_data_profiles_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Resume Data Profile";

		
		}
		
	}