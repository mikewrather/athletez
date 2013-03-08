<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Videoservice API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Videoservice extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Media_Videoservice'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info about a given video service.
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info about a given video service.";
		
		}
		
		/**
		 * action_get_videos() Returns a list of videos produced by a video service
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Returns a list of videos produced by a video service";
		
			if($this->request->query('sports_id') > 0)
			{

			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}