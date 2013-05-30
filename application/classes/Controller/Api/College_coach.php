<?php defined('SYSPATH') or die('No direct script access.');

/**
 * College_coach API controller class
 *
 * Date: Auto-generated on May 30th, 2013 3:28 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_College_coach extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('College_Coach'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_send_email() This will email a list of college coaches a link to an athletic resume.
		 * via /api/college_coach/send_email/{college_coaches_id}
		 *
		 */
		public function action_post_send_email()
		{
			$this->payloadDesc = "This will email a list of college coaches a link to an athletic resume.";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// coaches (REQUIRED)
			// This is an array of coach IDs to send emails to.
				
			if(isset($this->request->post('coaches')))
			{
				$arguments["coaches"] = $this->request->post('coaches');
				foreach($arguments["coaches"] as $coaches_key =>$coaches_val)
				{
					// Access each item in the array through the $coaches_val variable
				}
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "coaches",
					"param_desc" => "This is an array of coach IDs to send emails to."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// users_id 
			// This is only provided when an administrator is sending a resume on behalf of an athlete.  Otherwise it will use user from Authentication object.
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$arguments["users_id"] = (int)trim($this->request->post('users_id'));
			}

			// sports_id 
			// This will dictate which athletic resume the user is sending.  If not provided it will default to the sport that coach is associated with.
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->post('sports_id'));
			}


		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}