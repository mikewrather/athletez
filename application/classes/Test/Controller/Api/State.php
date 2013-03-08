<?php defined('SYSPATH') or die('No direct script access.');

/**
 * State API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_State extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Location_State'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on a given state
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a given state";
		
		}
		
		/**
		 * action_get_counties() All counties within the state
		 *
		 */
		public function action_get_counties()
		{
			$this->payloadDesc = "All counties within the state";
		
		}
		
		/**
		 * action_get_divisions() All divisions within a state
		 *
		 */
		public function action_get_divisions()
		{
			$this->payloadDesc = "All divisions within a state";
		
		}
		
		/**
		 * action_get_sections() All sections within a state
		 *
		 */
		public function action_get_sections()
		{
			$this->payloadDesc = "All sections within a state";
		
		}
		
		/**
		 * action_get_leagues() All leagues within a given state
		 *
		 */
		public function action_get_leagues()
		{
			$this->payloadDesc = "All leagues within a given state";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}