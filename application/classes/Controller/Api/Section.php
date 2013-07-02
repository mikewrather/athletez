<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Section API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Section extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Section'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information  about a sport type
		 * via /api/section/basics/{sport_types_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information  about a sport type";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}
		
		/**
		 * action_get_sports() All sports of this type
		 * via /api/section/sports/{sport_types_id}
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "All sports of this type";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$args['section_id'] = $this->mainModel->id;

			return $this->mainModel->getSports($args);
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information  about a sport type
		 * via /api/section/basics/{sport_types_id}
		 *
		 */
		public function action_put_basics()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Update basic information  about a sport type";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the section
				
			if(trim($this->put('name')) != "")
			{
				$args['name'] = trim(urldecode($this->put('name')));
			}

			// states_id 
			// Change the state of this section
				
			if((int)trim($this->put('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->put('states_id'));
			}

			// states_id 
			// Change this section's state
				
			if((int)trim($this->put('states_id')) > 0)
			{
				$args['states_id'] = (int)trim($this->put('states_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$args['id'] = $this->mainModel->id;

			$result = $this->mainModel->updateSection($args);
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
		 * action_delete_base() Delete  sport type
		 * via /api/section/base/{sport_types_id}
		 *
		 */
		public function action_delete_base()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Delete sport type";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->deleteSection();
		}
		
	}