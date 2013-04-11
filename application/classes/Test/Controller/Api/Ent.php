<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Ent API controller class
 *
 * Date: Auto-generated on Apr 11th, 2013 12:30 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Ent extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Site_Enttype'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on an entity
		 * via /api/ent/basics/{subject_type_id}/subject_id
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on an entity";
			$arguments = array();
		

		}
		
		/**
		 * action_get_comments() Get comments on a specific subject
		 * via /api/ent/comments/{subject_type_id}/subject_id
		 *
		 */
		public function action_get_comments()
		{
			$this->payloadDesc = "Get comments on a specific subject";
			$arguments = array();
		

		}
		
		/**
		 * action_get_votes() Get votes on a specific subject
		 * via /api/ent/votes/{subject_type_id}/subject_id
		 *
		 */
		public function action_get_votes()
		{
			$this->payloadDesc = "Get votes on a specific subject";
			$arguments = array();
		

		}
		
		/**
		 * action_get_followers() Get followers on a specific subject
		 * via /api/ent/followers/{subject_type_id}/subject_id
		 *
		 */
		public function action_get_followers()
		{
			$this->payloadDesc = "Get followers on a specific subject";
			$arguments = array();
		

		}
		
		/**
		 * action_get_tags() Get tags for a specific subject
		 * via /api/ent/tags/{subject_type_id}/subject_id
		 *
		 */
		public function action_get_tags()
		{
			$this->payloadDesc = "Get tags for a specific subject";
			$arguments = array();
		

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_comment() Post a new comment about a given subject
		 * via /api/ent/comment/{subject_type_id}/subject_id
		 *
		 */
		public function action_post_comment()
		{
			$this->payloadDesc = "Post a new comment about a given subject";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// comment (REQUIRED)
			// The comment to post about the specified subject
				
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
					"param_desc" => "The comment to post about the specified subject"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			

		}
		
		/**
		 * action_post_vote() Post a Vote on a specific subject
		 * via /api/ent/vote/{subject_type_id}/subject_id
		 *
		 */
		public function action_post_vote()
		{
			$this->payloadDesc = "Post a Vote on a specific subject";
			$arguments = array();
		

		}
		
		/**
		 * action_post_follow() Follow a Subject
		 * via /api/ent/follow/{subject_type_id}/subject_id
		 *
		 */
		public function action_post_follow()
		{
			$this->payloadDesc = "Follow a Subject";
			$arguments = array();
		

		}
		
		/**
		 * action_post_tag() Tag a Subject
		 * via /api/ent/tag/{subject_type_id}/subject_id
		 *
		 */
		public function action_post_tag()
		{
			$this->payloadDesc = "Tag a Subject";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// users_id 
			// If specified, this is the user that will be tagged to the subject.  If not specified, the logged in user will be used.
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$arguments["users_id"] = (int)trim($this->request->post('users_id'));
			}


		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}