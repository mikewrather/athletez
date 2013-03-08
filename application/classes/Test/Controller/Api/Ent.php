<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Ent API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
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
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on an entity";
		
		}
		
		/**
		 * action_get_comments() Get comments on a specific subject
		 *
		 */
		public function action_get_comments()
		{
			$this->payloadDesc = "Get comments on a specific subject";
		
		}
		
		/**
		 * action_get_votes() Get votes on a specific subject
		 *
		 */
		public function action_get_votes()
		{
			$this->payloadDesc = "Get votes on a specific subject";
		
		}
		
		/**
		 * action_get_followers() Get followers on a specific subject
		 *
		 */
		public function action_get_followers()
		{
			$this->payloadDesc = "Get followers on a specific subject";
		
		}
		
		/**
		 * action_get_tags() Get tags for a specific subject
		 *
		 */
		public function action_get_tags()
		{
			$this->payloadDesc = "Get tags for a specific subject";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}