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
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}
		
		/**
		 * action_get_datagroups() Returns all Resume Data Groups for a given Resume Data Profile
		 * via /api/resumedataprofile/datagroups/{resume_data_profiles_id}
		 *
		 */
		public function action_get_datagroups()
		{
			$this->payloadDesc = "Returns all Resume Data Groups for a given Resume Data Profile";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			} 
			return $this->mainModel->getDatagroups(); 
		}
		
		/**
		 * action_get_sports() Returns all sports for a given Resume Data Profile
		 * via /api/resumedataprofile/sports/{resume_data_profiles_id}
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "Returns all sports for a given Resume Data Profile";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			} 
			return $this->mainModel->getSports(); 
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
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

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
			if ( $this->mainModel->check_sports_link_exist($args)) 
			    $result = $this->mainModel->addLinksport($args); 
                
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
            else
            {
                $error_array = array(
                    "error" => "This sport link already exists",
                    "param_name" => "sports_id",
                    "param_desc" => "The sport to link the Resume Data Profile to"
                );

                // Set whether it is a fatal error
                $is_fatal = true;

                // Call method to throw an error
                $this->addError($error_array,$is_fatal);
            }              
		}
		
		/**
		 * action_post_linkrdg() Link to a Resume Data Group
		 * via /api/resumedataprofile/linkrdg/{resume_data_profiles_id}
		 *
		 */
		public function action_post_linkrdg()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

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
		    if ( $this->mainModel->check_rdg_rdp_link_exist($args))
            {
                $result = $this->mainModel->addRdg($args);                                         
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
            }else
            {
                 $error_array = array(
                    "error" => "This rdg link already exists",
                    "param_name" => "resume_data_groups_id",
                    "param_desc" => "The Resume Data Group to link to this Profile"
                );

                // Set whether it is a fatal error
                $is_fatal = true;

                // Call method to throw an error
                $this->addError($error_array,$is_fatal);
            }      
		}
		
		/**
		 * action_post_add() Add a new Resume Data Profile
		 * via /api/resumedataprofile/add/{0}
		 *
		 */
		public function action_post_add()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

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
                $temp = explode(',',$sports);
                $sports_array = array();
                foreach($temp as $sports_id)
                {    
                    array_push($sports_array, $sports_id);
                }    	
                $args['sports_array'] = $sports_array;			
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
			 
			 
			$result = $this->mainModel->addRdp($args);
           
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
		 * action_put_basics() Updates basic info for a given Resume Data Profile
		 * via /api/resumedataprofile/basics/{resume_data_profiles_id}
		 *
		 */
		public function action_put_basics()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Updates basic info for a given Resume Data Profile";

		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Resume Data Group
				
			if(trim($this->put('name')) != "")
			{
				$name = trim(urldecode($this->put('name')));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$result = $this->mainModel->updateResumedataprofile($name);
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
		 * action_delete_base() Delete Resume Data Profile
		 * via /api/resumedataprofile/base/{resume_data_profiles_id}
		 *
		 */
		public function action_delete_base()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Delete Resume Data Profile";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$this->mainModel->delete_with_deps();
		}
		
	}