<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Sporttype API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Sporttype extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Type'));
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
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Update basic info on a Statistics Context";

		     // CHECK FOR PARAMETERS:
			// name 
			// Change the name of the sport type
				
			if(trim($this->put('name')) != "")
			{
				$name = trim($this->put('name'));
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
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}
			$this->payloadDesc = "Delete  Statistics Context";
		}
		
	}