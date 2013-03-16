<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Videoservice API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
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
		 * via /api/videoservice/basics/{video_services_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info about a given video service.";

		
		}
		
		/**
		 * action_get_videos() Returns a list of videos produced by a video service
		 * via /api/videoservice/videos/{video_services_id}
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Returns a list of videos produced by a video service";

		         // CHECK FOR PARAMETERS:
			// sports_id 
			// Narrow video service video list to only those of a certain sport
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new video service
		 * via /api/videoservice/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new video service";

		         // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the video service
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Basic info about a given video service.
		 * via /api/videoservice/basics/{video_services_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Basic info about a given video service.";

		         // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the Video Service
				
			if(trim($this->request->body('name')) != "")
			{
				$name = trim($this->request->body('name'));
			}

			// website 
			// Update this Video Service's Website
				
			if(trim($this->request->body('website')) != "")
			{
				$website = trim($this->request->body('website'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete Video Service
		 * via /api/videoservice/base/{video_services_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete Video Service";

		
		}
		
	}