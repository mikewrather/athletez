<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Queuedvideo API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Queuedvideo extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Media_Queuedvideo'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info about this queued video
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info about this queued video";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}