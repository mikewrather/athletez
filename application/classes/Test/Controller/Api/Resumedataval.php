<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Resumedataval API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Resumedataval extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Resume_Data_Vals'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a given data value for resume data
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a given data value for resume data";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}