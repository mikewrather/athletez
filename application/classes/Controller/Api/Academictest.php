<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Academictest API controller class
 *
 * Date: Auto-generated on Jun 10th, 2013 4:49 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Academictest extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Academics_Tests'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_topics() Get All topics for a given Academic Test
		 * via /api/academictest/topics/{academic_tests_id}
		 *
		 */
		public function action_get_topics()
		{
			$this->payloadDesc = "Get All topics for a given Academic Test";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// test_id 
			// The ID of the test you want to retrieve topics for.
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$arguments["test_id"] = $this->mainModel->id;

			$topics = ORM::factory("Academics_Tests_Topics");
			return $topics->getAllTopics($arguments);
		}
		
		/**
		 * action_get_listall() Get All Academic Tests
		 * via /api/academictest/listall/{academic_tests_id}
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Get All Academic Tests";
			$arguments = array();

			if($this->request->query('standardized') != "")
			{
				//convert standardized to a boolean
				$arguments["standardized"] = Util::convert_to_boolean($this->request->query('standardized'));
				if ($arguments["standardized"] === null){
					$error_array = array(
						"error" => "True/false required",
						"desc" => "Invalid test type value"
					);
					$this->modelNotSetError($error_array);
				}
			}else{
				$arguments["standardized"] = 1;
			}

			if($this->request->query('ap') != "")
			{
				//convert ap to a boolean
				$arguments["ap"] = Util::convert_to_boolean($this->request->query('ap'));
				if ($arguments["ap"] === null){
					$error_array = array(
						"error" => "True/false required",
						"desc" => "Invalid test type value"
					);
					$this->modelNotSetError($error_array);
				}
			}else{
				$arguments["ap"] = 1;
			}
			return $this->mainModel->getListall($arguments);
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}