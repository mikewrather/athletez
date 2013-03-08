<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedata API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Resumedata extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Resume_Data'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Return the basics about a given peice of resume data
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Return the basics about a given peice of resume data";
		
		}
		
		/**
		 * action_get_listall() Return a list of all resume data narrowed by supplied parameters
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Return a list of all resume data narrowed by supplied parameters";
		
			if($this->request->query('resume_data_groups_id') > 0)
			{

			}

			if($this->request->query('resume_data_profiles') > 0)
			{

			}

		}
		
		/**
		 * action_get_vals() Retrieves the values for a peice of resume data narrowed by supplied parameters, most noteably userID
		 *
		 */
		public function action_get_vals()
		{
			$this->payloadDesc = "Retrieves the values for a peice of resume data narrowed by supplied parameters, most noteably userID";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}