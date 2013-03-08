<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedatagroup API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Resumedatagroup extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Resume_Data_Group'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Retrives basic information for a resume data group
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Retrives basic information for a resume data group";
		
		}
		
		/**
		 * action_get_resumedata() Returns a list of the resume data for a given group
		 *
		 */
		public function action_get_resumedata()
		{
			$this->payloadDesc = "Returns a list of the resume data for a given group";
		
		}
		
		/**
		 * action_get_profiles() Returns all Resume Data Profiles for which this Resume Data Group exists
		 *
		 */
		public function action_get_profiles()
		{
			$this->payloadDesc = "Returns all Resume Data Profiles for which this Resume Data Group exists";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}