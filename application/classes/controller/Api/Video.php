<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Video API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
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
		 * via /api/video/basics/{videos_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a video";

		
		}
		
		/**
		 * action_get_types() Return all formats this video is available in
		 * via /api/video/types/{videos_id}
		 *
		 */
		public function action_get_types()
		{
			$this->payloadDesc = "Return all formats this video is available in";

		         // CHECK FOR PARAMETERS:
			// is_high_def 
			// Show either high def or non-HD video types
				
			if((int)trim($this->request->post('is_high_def')) > 0)
			{
				$is_high_def = (int)trim($this->request->post('is_high_def'));
			}

		}
		
		/**
		 * action_get_meta() Retrives all metadata for a certain video.
		 * via /api/video/meta/{videos_id}
		 *
		 */
		public function action_get_meta()
		{
			$this->payloadDesc = "Retrives all metadata for a certain video.";

		         // CHECK FOR PARAMETERS:
			// video_types_id 
			// Get only video metadata for a specific video type
				
			if((int)trim($this->request->post('video_types_id')) > 0)
			{
				$video_types_id = (int)trim($this->request->post('video_types_id'));
			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Post a new Video
		 * via /api/video/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Post a new Video";

		         // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the video clip
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// sports_id 
			// The ID of the sport this video is associated with
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

			// video_services_id 
			// An optional video service that is responsible for this video
				
			if((int)trim($this->request->post('video_services_id')) > 0)
			{
				$video_services_id = (int)trim($this->request->post('video_services_id'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information about a video
		 * via /api/video/basics/{videos_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about a video";

		         // CHECK FOR PARAMETERS:
			// video_services_id 
			// Change the video service this video belongs to
				
			if((int)trim($this->request->body('video_services_id')) > 0)
			{
				$video_services_id = (int)trim($this->request->body('video_services_id'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Video
		 * via /api/video/base/{videos_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Video";

		
		}
		
	}