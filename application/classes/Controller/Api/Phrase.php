<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Phrase API controller class
 *
 * Date: Auto-generated on May 29th, 2013 3:36 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Phrase extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Site_Phrase'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_listall() This method pulls the entire phrases table (all non-deleted) and will store it on the front end for fast access.
		 * via /api/phrase/listall/{phrases_id}
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "This method pulls the entire phrases table (all non-deleted) and will store it on the front end for fast access.";
			$arguments = array();
			$arguments['deleted'] = 0;

			return $this->mainModel->getAll($arguments);
		}
		
		/**
		 * action_get_getphrase() Retrieve a single phrase by ID
		 * via /api/phrase/getphrase/{phrases_id}
		 *
		 */
		public function action_get_getphrase()
		{
			$this->payloadDesc = "Retrieve a single phrase by ID";
			$arguments = array();

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel;
		}
		
		/**
		 * action_get_alltranslation() This will take a language ID and return all of the phrases translated into a given language.  It is an analog of listall but for translated text.
		 * via /api/phrase/alltranslation/{phrases_id}
		 *
		 */
		public function action_get_alltranslation()
		{
			$this->payloadDesc = "This will take a language ID and return all of the phrases translated into a given language.  It is an analog of listall but for translated text.";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// languages_id (REQUIRED)
			// This is the language that we want to get the phrases in.
				
			if((int)trim($this->request->query('languages_id')) > 0)
			{
				$arguments["languages_id"] = (int)trim($this->request->query('languages_id'));
			}else{
				$error_array = array(
					"error" => "Language ID required",
					"desc" => "Language ID required"
				);
				$this->modelNotSetError($error_array);
				return false;
			}
			
			$tanslation = ORM::factory("Site_Phrases_Translation");
			$results = $tanslation->getAll($arguments);
			return $results;
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new phrase
		 * via /api/phrase/add/{phrases_id}
		 *
		 */
		public function action_post_add()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Add a new phrase";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// phrase 
			// This is the text to be added.
				
			if(trim($this->request->post('phrase')) != "")
			{
				$arguments["phrase"] = trim($this->request->post('phrase'));
			}
			//set default value
			$arguments['deleted'] = 0;
			$result = $this->mainModel->savePhrase($arguments);
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
		
		/**
		 * action_post_addtranslation() Add a translation for a given phrase.
		 * via /api/phrase/addtranslation/{phrases_id}
		 *
		 */
		public function action_post_addtranslation()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Add a translation for a given phrase.";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// phrases_id (REQUIRED)
			// This is the ID of the phrase we are adding the translation for.
				
			if((int)trim($this->request->post('phrases_id')) > 0)
			{
				$arguments["phrases_id"] = (int)trim($this->request->post('phrases_id'));
			}

			if(trim($this->request->post('translation')) != "")
			{
				$arguments["translation"] = trim($this->request->post('translation'));
			}

			if((int)trim($this->request->post('languages_id')) > 0)
			{
				$arguments["languages_id"] = (int)trim($this->request->post('languages_id'));
			}
			$phrase_transaction = ORM::factory("Site_Phrases_Translation");
			$result = $phrase_transaction->addTransaction($arguments);
			if(get_class($result) == get_class($phrase_transaction))
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

		
		/**
		 * action_put_basics() Update the basic info for a row in the phrases table.
		 * via /api/phrase/basics/{phrases_id}
		 *
		 */
		public function action_put_basics()
		{
			if (!$this->is_admin_user()){
				$this->throw_permission_error();
			}

			$this->payloadDesc = "Update the basic info for a row in the phrases table.";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// phrase (REQUIRED)
			// This is the updated text
				
			if(trim($this->put('phrase')) != "")
			{
				$arguments["phrase"] = trim($this->put('phrase'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$result = $this->mainModel->updatePhrase($arguments);
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
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}