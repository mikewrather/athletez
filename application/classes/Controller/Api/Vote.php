<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Vote API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Vote extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Site_Vote'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information on a given vote
		 * via /api/vote/basics/{votes_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information on a given vote";

		
		}
		
		/**
		 * action_get_subject() Returns the subject for a given vote
		 * via /api/vote/subject/{votes_id}
		 *
		 */
		public function action_get_subject()
		{
			$this->payloadDesc = "Returns the subject for a given vote";

		
		}
		
		/**
		 * action_get_user() Returns the user who voted
		 * via /api/vote/user/{votes_id}
		 *
		 */
		public function action_get_user()
		{
			$this->payloadDesc = "Returns the user who voted";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new Vote
		 * via /api/vote/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Vote";

		     // CHECK FOR PARAMETERS:
			// subject_type_id (REQUIRED)
			// The ID of the subject type / entity type of the vote's subject (this is a row from the enttypes table) 
				
			if((int)trim($this->request->post('subject_type_id')) > 0)
			{
				$subject_type_id = (int)trim($this->request->post('subject_type_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "subject_type_id",
					"param_desc" => "The ID of the subject type / entity type of the vote's subject (this is a row from the enttypes table) "
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// subject_id (REQUIRED)
			// This is the ID of the subject whos type is specified in the enttypes table
				
			if((int)trim($this->request->post('subject_id')) > 0)
			{
				$subject_id = (int)trim($this->request->post('subject_id'));
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

			}
			
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete a Vote
		 * via /api/vote/base/{votes_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a Vote";

		
		}
		
	}