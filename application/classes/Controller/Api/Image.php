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

		/**
		 * action_get_search() Search for images
		 * via /api/image/search/{images_id}
		 *
		 */
		public function action_get_search()
		{
			$this->payloadDesc = "Search for images";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// sports_id
			// Narrow list based on tagged user's sport affiliations

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id
			// Narrow user list to images with tagged users of a comp level

			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$arguments["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			// gradyear
			// This will have to search the grad year of all the players tagged in the image

			if(trim($this->request->query('gradyear')) != "")
			{
				$arguments["gradyear"] = trim($this->request->query('gradyear'));
			}

			// orderby
			// Default will be to order by votes.

			if(trim($this->request->query('orderby')) != "")
			{
				$arguments["orderby"] = trim($this->request->query('orderby'));
			}

			// positions_id
			// Search for images with tagged users who play a specific position

			if((int)trim($this->request->query('positions_id')) > 0)
			{
				$arguments["positions_id"] = (int)trim($this->request->query('positions_id'));
			}

			// searchtext
			// A string to search names of tagged athletes

			if(trim($this->request->query('searchtext')) != "")
			{
				$arguments["searchtext"] = trim($this->request->query('searchtext'));
			}

			$image_model = ORM::factory('Media_Image');
			return $image_model->getSearch($arguments);
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
				$args['name'] = trim($this->request->post('name'));
			}


			
			// sports_id 
			// The sport that this image is associated with
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$args['sports_id'] = (int)trim($this->request->post('sports_id'));
			}
//			else // THIS WAS A REQUIRED PARAMETER
//			{
//				$error_array = array(
//					"error" => "Required Parameter Missing",
//					"param_name" => "sports_id",
//					"param_desc" => "The sport this image is associated with"
//				);
//
//				$is_fatal = true;
//
//				$this->addError($error_array,$is_fatal);
//			}

			if(sizeof($_FILES) > 0)
			{
				$args['files'] = $_FILES;
			}

			print_r($_FILES);

			$result = $this->mainModel->addImage($args);
			if(get_class($result) == get_class($this->mainModel))
			{
				return $result;
			}
			elseif(get_class($result) == 'ORM_Validation_Exception')
			{
				//parse error and add to error array
				$this->processValidationError($result,$this->mainModel->error_message_path);
				return false;
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