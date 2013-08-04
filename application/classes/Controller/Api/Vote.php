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
			//Must logged user can do action
			if (!$this->is_logged_user()){
				return $this->throw_authentication_error();
			}

			$this->action_post_addvote();
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

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			if (!$this->mainModel->is_owner($this->user)){
				$error_array = array(
					"error" => "Permission denied",
					"desc" => "Permission denied"
				);
				$this->modelNotSetError($error_array);
			}

			$this->mainModel->delete_with_deps();
		}
		
	}