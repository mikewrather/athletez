<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Statval API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Statval extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Stats_Val'));
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
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info for a given stat value field";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}