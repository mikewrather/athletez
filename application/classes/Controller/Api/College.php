<?php defined('SYSPATH') or die('No direct script access.');

/**
 * College API controller class
 *
 * Date: Auto-generated on May 30th, 2013 3:28 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_College extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('College_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_search() Search for a list of colleges based on several filtering criteria
		 * via /api/college/search/{colleges_id}
		 *
		 */
		public function action_get_search()
		{
			$this->payloadDesc = "Search for a list of colleges based on several filtering criteria";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// sports_id (REQUIRED)
			// This is the ID of the sport you are searching for a coach for.
				
			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "sports_id",
					"param_desc" => "This is the ID of the sport you are searching for a coach for."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// regions 
			// This is an array of region IDs either comma separated or coming back from an array of checkboxes
				
			if(isset($this->request->query('regions')))
			{
				$arguments["regions"] = $this->request->query('regions');
				foreach($arguments["regions"] as $regions_key =>$regions_val)
				{
					// Access each item in the array through the $regions_val variable
				}
			}

			// divisions 
			// This is an array of division IDs either comma separated or coming back from an array of checkboxes
				
			if(isset($this->request->query('divisions')))
			{
				$arguments["divisions"] = $this->request->query('divisions');
				foreach($arguments["divisions"] as $divisions_key =>$divisions_val)
				{
					// Access each item in the array through the $divisions_val variable
				}
			}

			// academics 
			// This is an array of Academic Levels (1-6) either comma separated or coming back from an array of checkboxes
				
			if(isset($this->request->query('academics')))
			{
				$arguments["academics"] = $this->request->query('academics');
				foreach($arguments["academics"] as $academics_key =>$academics_val)
				{
					// Access each item in the array through the $academics_val variable
				}
			}

			// public (REQUIRED)
			// Preference to search for public institutions
				
			if($this->request->query('public') != "")
			{
				//convert public to a boolean
				$arguments["public"] = (bool)$this->request->query('public');
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "public",
					"param_desc" => "Preference to search for public institutions"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// private (REQUIRED)
			// Preference to search for private institutions
				
			if($this->request->query('private') != "")
			{
				//convert private to a boolean
				$arguments["private"] = (bool)$this->request->query('private');
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "private",
					"param_desc" => "Preference to search for private institutions"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}
			
			// states_id 
			// If provided will narrow the list of colleges to a single state
				
			if((int)trim($this->request->query('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->query('states_id'));
			}


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