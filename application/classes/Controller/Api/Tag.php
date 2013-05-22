<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Tag API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Tag extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Site_Tag'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information on a given tag
		 * via /api/tag/basics/{tags_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information on a given tag";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel;
		}
		
		/**
		 * action_get_user() Gets the user being tagged
		 * via /api/tag/user/{tags_id}
		 *

		public function action_get_user()
		{
			$this->payloadDesc = "Gets the user being tagged";

		
		}
		 */
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new tag
		 * via /api/tag/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new tag";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// subject_type_id (REQUIRED)
			// The ID of the subject type / entity type of the tag's subject (this is a row from the enttypes table)

			if((int)trim($this->request->post('subject_type_id')) > 0)
			{
				$arguments["subject_type_id"] = (int)trim($this->request->post('subject_type_id'));
			}

			if((int)trim($this->request->post('subject_id')) > 0)
			{
				$arguments["subject_id"] = (int)trim($this->request->post('subject_id'));
			}

			if((int)trim($this->request->post('users_id')) > 0)
			{
				$arguments["users_id"] = (int)trim($this->request->post('users_id'));
			}else{
				$arguments["users_id"] = $this->user->id;
			}

			if((int)trim($this->request->post('media_id')) > 0)
			{
				$arguments["media_id"] = (int)trim($this->request->post('media_id'));
			}

			$result = $this->mainModel->addTag($arguments);
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

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Tab
		 * via /api/tag/base/{tags_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Tag";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->delete();
		}
		
	}