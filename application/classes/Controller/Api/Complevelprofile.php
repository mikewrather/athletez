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
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel;
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

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if((int)trim($this->request->query('orgs_id')) > 0)
			{
				$arguments["orgs_id"] = (int)trim($this->request->query('orgs_id'));
			}

			return $this->mainModel->getComplevels($arguments);
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
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Add a new Competition Level Profile";

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the competition level profile
			$args = array();
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			$args['name'] = $name;

			$result = $this->mainModel->addComplevelprofile($args);

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
		
		/**
		 * action_post_addlevel() Add a new Competition Level for this Profile
		 * via /api/complevelprofile/addlevel/{complevel_profiles_id}
		 *
		 */
		public function action_post_addlevel()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Add a new Competition Level for this Profile";

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the Competition Level we are adding to this profile
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$args['complevel_profiles_id'] = $this->mainModel->id;
			$args['name'] = $name;

			$complevel = ORM::factory("Sportorg_Complevel_Base");
			$result = $complevel->addComplevel($args);

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
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update Basic information about the competition level profile
		 * via /api/complevelprofile/basics/{complevel_profiles_id}
		 *
		 */
		public function action_put_basics()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Update Basic information about the competition level profile";

		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Competition Level Profile
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim(urldecode($this->put('name')));
			}
			$args['id'] = $this->mainModel->id;
			$result = $this->mainModel->addComplevelprofile($args);

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
		 * action_delete_base() Delete Competition Level Profile
		 * via /api/complevelprofile/base/{complevel_profiles_id}
		 *
		 */
		public function action_delete_base()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Delete Competition Level Profile";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$this->mainModel->delete_with_deps();
			return $this->mainModel;

		}
		
	}