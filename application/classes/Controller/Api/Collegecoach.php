<?php defined('SYSPATH') or die('No direct script access.');

/**
 * College_coach API controller class
 *
 * Date: Auto-generated on May 30th, 2013 3:28 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Collegecoach extends Controller_Api_Base
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
		 * via /api/collegecoach/send_email/{college_coaches_id}
		 *
		 */
		public function action_post_send_email()
		{
			$this->payloadDesc = "This will email a list of college coaches a link to an athletic resume.";
			$arguments = array();

			if(trim($this->request->post('coaches')) != "")
			{
				$arguments["coaches"] = $this->request->post('coaches');
				if(!is_array($arguments["coaches"])){
					$arr = explode(',', $arguments["coaches"]);
					foreach($arr as $coach_id){
						if (!Valid::coaches_id_exist($coach_id)){
							$error_array = array(
								"error" => "Coaches doesn't exist",
								"desc" => "Coaches doesn't exist"
							);
							$this->modelNotSetError($error_array);
							return false;
						}
					}
					$arguments["coaches"] = $arr;
				}
			}else{
				$error_array = array(
					"error" => "Coaches can't empty",
					"desc" => "Coaches can't empty"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			if((int)trim($this->request->post('users_id')) > 0 && $this->is_admin)
			{
				$arguments["users_id"] = (int)trim($this->request->post('users_id'));
			}else{
				$arguments["users_id"] = $this->user->id;
			}

			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->post('sports_id'));
			}else{
				$error_array = array(
					"error" => "Sports id can't empty",
					"desc" => "Sports id can't empty"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$result = $this->mainModel->sendMail($arguments);
			if(get_class($result) == get_class(new stdClass()))
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

		
	}