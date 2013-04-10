<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Comment API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
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

			if(!$this->user)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "This action requires authentication"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}

			if(trim($this->request->post('comment')) != "")
			{
				$comment = trim($this->request->post('comment'));
			}

			// subject_type_id (REQUIRED)
			// The ID of the subject type / entity type of the comment's subject (this is a row from the enttypes table) 
				
			if((int)trim($this->request->post('subject_type_id')) > 0)
			{
				$subject_type_id = (int)trim($this->request->post('subject_type_id'));
			}

			// subject_id (REQUIRED)
			// This is the ID of the subject whos type is specified in the enttypes table
				
			if((int)trim($this->request->post('subject_id')) > 0)
			{
				$subject_id = (int)trim($this->request->post('subject_id'));
			}

			$args['comment'] = $comment;
			$args['subject_enttypes_id'] = $subject_type_id;
			$args['subject_id'] = $subject_id;
			$args['users_id'] = $this->user;

			$result =  $this->mainModel->addComment($args);

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
				
			if(trim($this->put('comment')) != "")
			{
				$comment = trim($this->put('comment'));
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