<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Image API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Image extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Media_Image'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info about a given image
		 * via /api/image/basics/{images_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info about a given image";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Post a new image
		 * via /api/image/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Post a new image";

		     // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// The name of the image
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "name",
					"param_desc" => "The name of the image"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// sports_id 
			// The sport that this image is associated with
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete an Image
		 * via /api/image/base/{images_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete an Image";

		
		}
		
	}