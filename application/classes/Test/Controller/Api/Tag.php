<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Tag API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
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
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information on a given tag";
		
		}
		
		/**
		 * action_get_user() Gets the user being tagged
		 *
		 */
		public function action_get_user()
		{
			$this->payloadDesc = "Gets the user being tagged";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}