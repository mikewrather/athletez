<?php defined('SYSPATH') or die('No direct script access.');

/**
 * User API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_User extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about the user.
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about the user.";
		
		}
		
		/**
		 * action_get_teams() 
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "";
		
		}
		
		/**
		 * action_get_sports() 
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "";
		
		}
		
		/**
		 * action_get_orgs() 
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "";
		
		}
		
		/**
		 * action_get_related() 
		 *
		 */
		public function action_get_related()
		{
			$this->payloadDesc = "";
		
		}
		
		/**
		 * action_get_videos() 
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "";
		
		}
		
		/**
		 * action_get_images() 
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "";
		
		}
		
		/**
		 * action_get_commentsof() 
		 *
		 */
		public function action_get_commentsof()
		{
			$this->payloadDesc = "";
		
		}
		
		/**
		 * action_get_commentson() 
		 *
		 */
		public function action_get_commentson()
		{
			$this->payloadDesc = "";
		
		}
		
		/**
		 * action_get_fitnessbasics() 
		 *
		 */
		public function action_get_fitnessbasics()
		{
			$this->payloadDesc = "";
		
		}
		
		/**
		 * action_get_primaryvideo() 
		 *
		 */
		public function action_get_primaryvideo()
		{
			$this->payloadDesc = "";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}