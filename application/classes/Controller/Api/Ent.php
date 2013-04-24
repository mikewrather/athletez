<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Ent API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Ent extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Site_Entdir'));
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

		
		}
		
		/**
		 * action_get_comments() Get comments on a specific subject
		 * via /api/ent/comments/{subject_type_id}/subject_id
		 *
		 */
		public function action_get_comments()
		{
			$this->payloadDesc = "Get comments on a specific subject";

		
		}
		
		/**
		 * action_get_votes() Get votes on a specific subject
		 * via /api/ent/votes/{subject_type_id}/subject_id
		 *
		 */
		public function action_get_votes()
		{
			$this->payloadDesc = "Get votes on a specific subject";

		
		}
		
		/**
		 * action_get_followers() Get followers on a specific subject
		 * via /api/ent/followers/{subject_type_id}/subject_id
		 *
		 */
		public function action_get_followers()
		{
			$this->payloadDesc = "Get followers on a specific subject";

		
		}
		
		/**
		 * action_get_tags() Get tags for a specific subject
		 * via /api/ent/tags/{subject_type_id}/subject_id
		 *
		 */
		public function action_get_tags()
		{
			$this->payloadDesc = "Get tags for a specific subject";

		
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

			$comment_obj = ORM::factory('Site_Comment');
			$comment_obj->subject_enttypes_id = $this->myID;
			$comment_obj->subject_id = $this->myID2;
			$comment_obj->users_id = $this->user->id;

		    // CHECK FOR PARAMETERS:
			// comment (REQUIRED)
			// The comment to post about the specified subject
				
			if(trim($this->request->post('comment')) != "")
			{
				$comment = trim($this->request->post('comment'));
				$comment_obj->comment = $comment;
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
			}

			// Error Checking on save()
			try
			{
				$comment_obj->save();
			}
			catch(ErrorException $e)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save comment",
					"desc" => $e->getMessage()
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
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

		
		}
		
		/**
		 * action_post_follow() Follow a Subject
		 * via /api/ent/follow/{subject_type_id}/subject_id
		 *
		 */
		public function action_post_follow()
		{
			$this->payloadDesc = "Follow a Subject";

		
		}
		
		/**
		 * action_post_tag() Tag a Subject
		 * via /api/ent/tag/{subject_type_id}/subject_id
		 *
		 */
		public function action_post_tag()
		{
			$this->payloadDesc = "Tag a Subject";

		     // CHECK FOR PARAMETERS:
			// users_id 
			// If specified, this is the user that will be tagged to the subject.  If not specified, the logged in user will be used.
				
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

		
	}