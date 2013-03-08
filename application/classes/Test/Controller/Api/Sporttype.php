<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Sporttype API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
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
		 * action_get_basics() Basic information  about a sport type
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information  about a sport type";
		
		}
		
		/**
		 * action_get_sports() All sports of this type
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "All sports of this type";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}