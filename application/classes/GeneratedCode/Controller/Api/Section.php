<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Section API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Section extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Section'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information  about a sport type
		 * via /api/section/basics/{sport_types_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information  about a sport type";
			$arguments = array();
		

		}
		
		/**
		 * action_get_sports() All sports of this type
		 * via /api/section/sports/{sport_types_id}
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "All sports of this type";
			$arguments = array();
		

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information  about a sport type
		 * via /api/section/basics/{sport_types_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information  about a sport type";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the section
				
			if(trim($this->put('name')) != "")
			{
				$arguments["name"] = trim($this->put('name'));
			}

			// states_id 
			// Change this section's state
				
			if((int)trim($this->put('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->put('states_id'));
			}


		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  sport type
		 * via /api/section/base/{sport_types_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  sport type";
			$arguments = array();
		

		}
		
	}