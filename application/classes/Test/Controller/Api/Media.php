<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Media API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Media extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Media_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about some media
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about some media";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}