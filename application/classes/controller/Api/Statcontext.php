<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Statcontext API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Statcontext extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Stats_Context'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info for a given stat value field
		 * via /api/statcontext/basics/{statvals_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info for a given stat value field";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic info for a given stat value field
		 * via /api/statcontext/basics/{statvals_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic info for a given stat value field";

		
		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  a given stat value field
		 * via /api/statcontext/base/{statvals_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  a given stat value field";

		
		}
		
	}