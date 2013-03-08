<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Statcontext API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
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
		 * action_get_basics() Basic info on a Statistics Context
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a Statistics Context";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}