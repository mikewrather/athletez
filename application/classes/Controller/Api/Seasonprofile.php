<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Seasonprofile API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Seasonprofile extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Seasons_Profile'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info about the season profile
		 * via /api/seasonprofile/basics/{season_profiles_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info about the season profile";

			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}
		
		/**
		 * action_get_seasons() List of seasons in the season profile
		 * via /api/seasonprofile/seasons/{season_profiles_id}
		 *
		 */
		public function action_get_seasons()
		{
			$this->payloadDesc = "List of seasons in the season profile";
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

			return $this->mainModel->getSeasons($arguments);
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_addseason() Add a new season to a season profile
		 * via /api/seasonprofile/addseason/{season_profiles_id}
		 *
		 */
		public function action_post_addseason()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Add a new season to a season profile";
            $args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Name of the Season to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}
            if(!$this->mainModel->id)
            {
                $this->modelNotSetError();
                return false;
            }
            
            $args['name'] = $name;
            $args['season_profiles_id'] = $this->mainModel->id;            
            $season_obj = ORM::factory('Sportorg_Seasons_Base');
            if($season_obj->check_season_exist($args))
            {
                unset($season_obj);
                $season_obj = ORM::factory('Sportorg_Seasons_Base');
                $result = $season_obj->addSeasons($args);    
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
                    "error" => "This season already exists",
                    "param_name" => "name",
                    "param_desc" => "This season already exists"
                );

                // Set whether it is a fatal error
                $is_fatal = true;

                // Call method to throw an error
                $this->addError($error_array,$is_fatal);
            }
		}
		
		/**
		 * action_post_add() Add a new season profile
		 * via /api/seasonprofile/add/{0}
		 *
		 */
		public function action_post_add()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Add a new season profile";

		     // CHECK FOR PARAMETERS:
			// name 
			// Name of the Season Profile to create
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}else{
				$error_array = array(
					"error" => "Name required",
					"param_name" => "name",
					"param_desc" => "Name required"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;
			}
			 
            
            if($this->mainModel->check_name_exist($name))
            {
                $result = $this->mainModel->addSeasonprofile($name);    
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
            } else
            {
                $error_array = array(
                    "error" => "This season profile already exists",
                    "param_name" => "name",
                    "param_desc" => "This season profile already exists"
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
		 * action_put_basics() Update Basic info about the season profile
		 * via /api/seasonprofile/basics/{season_profiles_id}
		 *
		 */
		public function action_put_basics()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Update Basic info about the season profile";

		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Season Profile
				
			if(trim($this->put('name')) != "")
			{
				$name = trim($this->put('name'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$result =  $this->mainModel->addSeasonprofile($name);
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
		 * action_delete_base() Delete a Season Profile
		 * via /api/seasonprofile/base/{season_profiles_id}
		 *
		 */
		public function action_delete_base()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Delete a Season Profile";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$this->mainModel->delete_with_deps();
			return $this->mainModel;
		}
		
	}