<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Media API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Media extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Media_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about some media
		 * via /api/media/basics/{media_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about some media";

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

		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information about some media
		 * via /api/media/basics/{media_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about some media";

		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of Media
				
			if(trim($this->put('name')) != "")
			{
				$name = trim($this->put('name'));
			}

			// sports_id 
			// Change the sport ID associated with this media
				
			if((int)trim($this->put('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->put('sports_id'));
			}

			// subject_type_id 
			// Change the subject type ID of this Media
				
			if((int)trim($this->put('subject_type_id')) > 0)
			{
				$subject_type_id = (int)trim($this->put('subject_type_id'));
			}

			// subject_id 
			// Change the subject ID of this media
				
			if((int)trim($this->put('subject_id')) > 0)
			{
				$subject_id = (int)trim($this->put('subject_id'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Media
		 * via /api/media/base/{media_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Media";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$this->mainModel->delete_with_deps();
		}
		
	}