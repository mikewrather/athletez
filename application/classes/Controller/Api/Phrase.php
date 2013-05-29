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
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "languages_id",
					"param_desc" => "This is the language that we want to get the phrases in."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			

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
			$this->payloadDesc = "Add a new phrase";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// phrase 
			// This is the text to be added.
				
			if(trim($this->request->post('phrase')) != "")
			{
				$arguments["phrase"] = trim($this->request->post('phrase'));
			}

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
			$this->payloadDesc = "Add a translation for a given phrase.";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// phrases_id (REQUIRED)
			// This is the ID of the phrase we are adding the translation for.
				
			if((int)trim($this->request->post('phrases_id')) > 0)
			{
				$arguments["phrases_id"] = (int)trim($this->request->post('phrases_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "phrases_id",
					"param_desc" => "This is the ID of the phrase we are adding the translation for."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// translation (REQUIRED)
			// This is the translated text
				
			if(trim($this->request->post('translation')) != "")
			{
				$arguments["translation"] = trim($this->request->post('translation'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "translation",
					"param_desc" => "This is the translated text"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// languages_id (REQUIRED)
			// This is the language of the translated text.
				
			if((int)trim($this->request->post('languages_id')) > 0)
			{
				$arguments["languages_id"] = (int)trim($this->request->post('languages_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "languages_id",
					"param_desc" => "This is the language of the translated text."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
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
			$this->payloadDesc = "Update the basic info for a row in the phrases table.";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// phrase (REQUIRED)
			// This is the updated text
				
			if(trim($this->put('phrase')) != "")
			{
				$arguments["phrase"] = trim($this->put('phrase'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "phrase",
					"param_desc" => "This is the updated text"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}