<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Comment API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
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
			$arguments = array();
		

		}
		
		/**
		 * action_get_subject() Returns the subject with which the comment is associated.
		 * via /api/comment/subject/{comments_id}
		 *
		 */
		public function action_get_subject()
		{
			$this->payloadDesc = "Returns the subject with which the comment is associated.";
			$arguments = array();
		

		}
		
		/**
		 * action_get_user() Return the user responsible for a comment
		 * via /api/comment/user/{comments_id}
		 *
		 */
		public function action_get_user()
		{
			$this->payloadDesc = "Return the user responsible for a comment";
			$arguments = array();
		

		}
		
		/**
		 * action_get_getall() Get all comments for a given subject.   This does not require a comment ID and parameters are used to specify the subject instead.
		 * via /api/comment/getall/{comments_id}
		 *
		 */
		public function action_get_getall()
		{
			$this->payloadDesc = "Get all comments for a given subject.   This does not require a comment ID and parameters are used to specify the subject instead.";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// subject_enttypes_id (REQUIRED)
			// The Subject Type ID or Ent Type ID defines what type of entity this is
				
			if((int)trim($this->request->query('subject_enttypes_id')) > 0)
			{
				$arguments["subject_enttypes_id"] = (int)trim($this->request->query('subject_enttypes_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "subject_enttypes_id",
					"param_desc" => "The Subject Type ID or Ent Type ID defines what type of entity this is"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// subject_id (REQUIRED)
			// This is the ID that will specify a given row in a table defined separately by Subject Type ID.
				
			if((int)trim($this->request->query('subject_id')) > 0)
			{
				$arguments["subject_id"] = (int)trim($this->request->query('subject_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "subject_id",
					"param_desc" => "This is the ID that will specify a given row in a table defined separately by Subject Type ID."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			

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
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// comment (REQUIRED)
			// The text of the comment
				
			if(trim($this->request->post('comment')) != "")
			{
				$arguments["comment"] = trim($this->request->post('comment'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "comment",
					"param_desc" => "The text of the comment"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// subject_type_id (REQUIRED)
			// The ID of the subject type / entity type of the comment's subject (this is a row from the enttypes table) 
				
			if((int)trim($this->request->post('subject_type_id')) > 0)
			{
				$arguments["subject_type_id"] = (int)trim($this->request->post('subject_type_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "subject_type_id",
					"param_desc" => "The ID of the subject type / entity type of the comment's subject (this is a row from the enttypes table) "
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// subject_id (REQUIRED)
			// This is the ID of the subject whos type is specified in the enttypes table
				
			if((int)trim($this->request->post('subject_id')) > 0)
			{
				$arguments["subject_id"] = (int)trim($this->request->post('subject_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "subject_id",
					"param_desc" => "This is the ID of the subject whos type is specified in the enttypes table"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
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
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// comment 
			// Update the comment
				
			if(trim($this->put('comment')) != "")
			{
				$arguments["comment"] = trim($this->put('comment'));
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
			$arguments = array();
		

		}
		
	}