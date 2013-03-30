<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedataprofile API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
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
			$args = array();
		     // CHECK FOR PARAMETERS:
			// sports_id (REQUIRED)
			// The sport to link the Resume Data Profile to
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->request->post('sports_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "sports_id",
					"param_desc" => "The sport to link the Resume Data Profile to"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			$args['resume_data_profiles_id'] = $this->mainModel->id;
			$rdp = ORM::factory('User_Resume_Data_Profile');
			$add_link_obj = $rdp->addLinksport($args);
			return $rdp->where('id','=',$this->mainModel->id);		 
		}
		
		/**
		 * action_post_linkrdg() Link to a Resume Data Group
		 * via /api/resumedataprofile/linkrdg/{resume_data_profiles_id}
		 *
		 */
		public function action_post_linkrdg()
		{
			$this->payloadDesc = "Link to a Resume Data Group";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// resume_data_groups_id (REQUIRED)
			// The Resume Data Group to link to this Profile
				
			if((int)trim($this->request->post('resume_data_groups_id')) > 0)
			{
				$args['resume_data_groups_id'] = (int)trim($this->request->post('resume_data_groups_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "resume_data_groups_id",
					"param_desc" => "The Resume Data Group to link to this Profile"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			$args['resume_data_profiles_id'] = $this->mainModel->id;
			$rdp = ORM::factory('User_Resume_Data_Profile');
			$add_link_obj = $rdp->addRdg($args);
			return $rdp->where('id','=',$this->mainModel->id);
			
		}
		
		/**
		 * action_post_add() Add a new Resume Data Profile
		 * via /api/resumedataprofile/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Resume Data Profile";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the Resume Data Profile to add
				
			if(trim($this->request->post('name')) != "")
			{
				$args['name'] = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "name",
					"param_desc" => "The name of the Resume Data Profile to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// sports (REQUIRED)
			// An array of sports_id's in the form "sports" : [1,2,4,7]
				
			if(trim($this->request->post('sports')) != "")
			{
				$sports = trim($this->request->post('sports'));				
				$args['sports_array'] = $sports; 
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "sports",
					"param_desc" => "An array of sports_id's in the form sports : [1,2,4,7]"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			 
			$rdp = ORM::factory('User_Resume_Data_Profile');
			return $rdp->addRdp($args);
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
				
			if(trim($this->put('name')) != "")
			{
				$name = trim($this->put('name'));
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