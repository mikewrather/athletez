<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Complevelprofile API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Complevelprofile extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Complevel_Profile'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about the competition level profile
		 * via /api/complevelprofile/basics/{complevel_profiles_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about the competition level profile";
			$arguments = array();
		

		}
		
		/**
		 * action_get_complevels() List the competition levels for this profile
		 * via /api/complevelprofile/complevels/{complevel_profiles_id}
		 *
		 */
		public function action_get_complevels()
		{
			$this->payloadDesc = "List the competition levels for this profile";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// orgs_id 
			// If this is provided, the complevel profile can be assertained using the org ID.  This means you can leave the complevel_profiles_id blank
				
			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$arguments["orgs_id"] = (int)trim($this->request->query('orgs_id'));
			}


		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new Competition Level Profile
		 * via /api/complevelprofile/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Competition Level Profile";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the competition level profile
				
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
					"param_desc" => "The name of the competition level profile"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			

		}
		
		/**
		 * action_post_addlevel() Add a new Competition Level for this Profile
		 * via /api/complevelprofile/addlevel/{complevel_profiles_id}
		 *
		 */
		public function action_post_addlevel()
		{
			$this->payloadDesc = "Add a new Competition Level for this Profile";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the Competition Level we are adding to this profile
				
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
					"param_desc" => "The name of the Competition Level we are adding to this profile"
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
		 * action_put_basics() Update Basic information about the competition level profile
		 * via /api/complevelprofile/basics/{complevel_profiles_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update Basic information about the competition level profile";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Competition Level Profile
				
			if(trim($this->put('name')) != "")
			{
				$arguments["name"] = trim($this->put('name'));
			}


		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Competition Level Profile
		 * via /api/complevelprofile/base/{complevel_profiles_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Competition Level Profile";
			$arguments = array();
		

		}
		
	}