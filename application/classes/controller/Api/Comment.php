<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Comment API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Comment extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Site_Comment'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on a specific comment
		 * via /api/comment/basics/{comments_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a specific comment";

		
		}
		
		/**
		 * action_get_subject() Returns the subject with which the comment is associated.
		 * via /api/comment/subject/{comments_id}
		 *
		 */
		public function action_get_subject()
		{
			$this->payloadDesc = "Returns the subject with which the comment is associated.";

		
		}
		
		/**
		 * action_get_user() Return the user responsible for a comment
		 * via /api/comment/user/{comments_id}
		 *
		 */
		public function action_get_user()
		{
			$this->payloadDesc = "Return the user responsible for a comment";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new comment
		 * via /api/comment/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new comment";

		         // CHECK FOR PARAMETERS:
			// comment (REQUIRED)
			// The text of the comment
				
			if(trim($this->request->post('comment')) != "")
			{
				$comment = trim($this->request->post('comment'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// subject_type_id (REQUIRED)
			// The ID of the subject type / entity type of the comment's subject (this is a row from the enttypes table) 
				
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
			
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic info on a specific comment
		 * via /api/comment/basics/{comments_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic info on a specific comment";

		         // CHECK FOR PARAMETERS:
			// comment 
			// Update the comment
				
			if(trim($this->request->body('comment')) != "")
			{
				$comment = trim($this->request->body('comment'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Comment
		 * via /api/comment/base/{comments_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Comment";

		
		}
		
	}