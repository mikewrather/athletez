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
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel; 
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
			$this->payloadDesc = "Add a new Resume Data Value for a User's Resume";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// resume_data_id (REQUIRED)
			// The ID of the resume data you are adding
				
			if((int)trim($this->request->post('resume_data_id')) > 0)
			{
				$args['resume_data_id'] = (int)trim($this->request->post('resume_data_id'));
			}

			if(trim($this->request->post('user_value')) != "")
			{
				$args['user_value'] = trim($this->request->post('user_value'));
			}

			if((int)trim($this->request->post('users_id')) > 0)
			{
				$args['users_id'] = (int)trim($this->request->post('users_id'));
			}else{
				$args['users_id'] = $this->user->id;
			}

			if(!$this->user->can('Assumeownership', array('owner' => $args['users_id']))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}
			
			$result = $this->mainModel->addResumeDataVal($args);
            //Check for success / error
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

			$user_value = $this->put('user_value');


			//permission check
			if(!$this->user->can('Assumeownership', array('owner' => $this->mainModel->owner()))){
				$this->throw_permission_error(Constant::NOT_OWNER);
			}
			
			$result = $this->mainModel->updateResumeDataVal($user_value);
			//Check for success / error
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
		 * action_delete_base() Delete a given data value for resume data
		 * via /api/resumedataval/base/{resume_data_vals_id}
		 *
		 */
		public function action_delete_base()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Delete a given data value for resume data";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$this->mainModel->delete_with_deps();
		}
		
	}