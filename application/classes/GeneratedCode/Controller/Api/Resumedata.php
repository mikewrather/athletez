<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedata API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
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
		 * via /api/resumedata/basics/{resume_data_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Return the basics about a given peice of resume data";
			$arguments = array();
		

		}
		
		/**
		 * action_get_listall() Return a list of all resume data narrowed by supplied parameters
		 * via /api/resumedata/listall/{resume_data_id}
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Return a list of all resume data narrowed by supplied parameters";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// resume_data_groups_id 
			// Filter resume data list to show only those entries for a certain data group
				
			if((int)trim($this->request->query('resume_data_groups_id')) > 0)
			{
				$arguments["resume_data_groups_id"] = (int)trim($this->request->query('resume_data_groups_id'));
			}

			// resume_data_profiles 
			// Filter resume data list to show only those entries for a certain data profile
				
			if((int)trim($this->request->query('resume_data_profiles')) > 0)
			{
				$arguments["resume_data_profiles"] = (int)trim($this->request->query('resume_data_profiles'));
			}


		}
		
		/**
		 * action_get_vals() Retrieves the values for a peice of resume data narrowed by supplied parameters, most noteably userID
		 * via /api/resumedata/vals/{resume_data_id}
		 *
		 */
		public function action_get_vals()
		{
			$this->payloadDesc = "Retrieves the values for a peice of resume data narrowed by supplied parameters, most noteably userID";
			$arguments = array();
		

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update the basics about a given peice of resume data
		 * via /api/resumedata/basics/{resume_data_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update the basics about a given peice of resume data";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the Resume Data
				
			if(trim($this->put('name')) != "")
			{
				$arguments["name"] = trim($this->put('name'));
			}

			// resume_data_type 
			// Change the data type of the resume data
				
			if(trim($this->put('resume_data_type')) != "")
			{
				$arguments["resume_data_type"] = trim($this->put('resume_data_type'));
			}

			// resume_data_groups_id 
			// Change the name of the Group this Resume Data Belongs In
				
			if((int)trim($this->put('resume_data_groups_id')) > 0)
			{
				$arguments["resume_data_groups_id"] = (int)trim($this->put('resume_data_groups_id'));
			}


		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Resume Data
		 * via /api/resumedata/base/{resume_data_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Resume Data";
			$arguments = array();
		

		}
		
	}