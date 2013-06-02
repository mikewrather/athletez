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
			$this->action_post_addtag();
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