<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Video API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Video extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Media_Video'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a video
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a video";
		
		}
		
		/**
		 * action_get_types() Return all formats this video is available in
		 *
		 */
		public function action_get_types()
		{
			$this->payloadDesc = "Return all formats this video is available in";
		
			if($this->request->query('is_high_def') > 0)
			{

			}

		}
		
		/**
		 * action_get_meta() Retrives all metadata for a certain video.
		 *
		 */
		public function action_get_meta()
		{
			$this->payloadDesc = "Retrives all metadata for a certain video.";
		
			if($this->request->query('video_types_id') > 0)
			{

			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}