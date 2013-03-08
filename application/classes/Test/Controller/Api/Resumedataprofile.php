<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedataprofile API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Resumedataprofile extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Resume_Data_Profile'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Returns basic info for a given Resume Data Profile
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Returns basic info for a given Resume Data Profile";
		
		}
		
		/**
		 * action_get_datagroups() Returns all Resume Data Groups for a given Resume Data Profile
		 *
		 */
		public function action_get_datagroups()
		{
			$this->payloadDesc = "Returns all Resume Data Groups for a given Resume Data Profile";
		
		}
		
		/**
		 * action_get_sports() Returns all sports for a given Resume Data Profile
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "Returns all sports for a given Resume Data Profile";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}