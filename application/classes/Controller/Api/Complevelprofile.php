<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Complevelprofile API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
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

		
		}
		
		/**
		 * action_get_complevels() List the competition levels for this profile
		 * via /api/complevelprofile/complevels/{complevel_profiles_id}
		 *
		 */
		public function action_get_complevels()
		{
			$this->payloadDesc = "List the competition levels for this profile";

		
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

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the competition level profile
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
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

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the Competition Level we are adding to this profile
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
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

		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Competition Level Profile
				
			if(trim($this->put('name')) != "")
			{
				$name = trim($this->put('name'));
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

		
		}
		
	}