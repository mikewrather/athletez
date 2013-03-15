<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Tag API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
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

		
		}
		
		/**
		 * action_get_user() Gets the user being tagged
		 * via /api/tag/user/{tags_id}
		 *
		 */
		public function action_get_user()
		{
			$this->payloadDesc = "Gets the user being tagged";

		
		}
		
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

		         // CHECK FOR PARAMETERS:
			// subject_type_id (REQUIRED)
			// The ID of the subject type / entity type of the tag's subject (this is a row from the enttypes table) 
				
			if((int)trim($this->request->post('subject_type_id')) > 0)
			{
				$subject_type_id = (int)trim($this->request->post('subject_type_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// subject_id (REQUIRED)
			// This is the ID of the subject whos type is specified in the enttypes table
				
			if((int)trim($this->request->post('subject_id')) > 0)
			{
				$subject_id = (int)trim($this->request->post('subject_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// users_id 
			// User Being Tagged (If not set, the authenticated user will be used)
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->post('users_id'));
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
			$this->payloadDesc = "Delete Tab";

		
		}
		
	}