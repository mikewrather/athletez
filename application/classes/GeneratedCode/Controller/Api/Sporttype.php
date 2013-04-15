<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Sporttype API controller class
 *
 * Date: Auto-generated on Apr 15th, 2013 1:09 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Sporttype extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Sporttype'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on a Statistics Context
		 * via /api/sporttype/basics/{stat_contexts_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a Statistics Context";
			$arguments = array();
		

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic info on a Statistics Context
		 * via /api/sporttype/basics/{stat_contexts_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic info on a Statistics Context";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the sport type
				
			if(trim($this->put('name')) != "")
			{
				$arguments["name"] = trim($this->put('name'));
			}


		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  Statistics Context
		 * via /api/sporttype/base/{stat_contexts_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  Statistics Context";
			$arguments = array();
		

		}
		
	}