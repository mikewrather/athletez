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

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = trim($this->request->query('sports_id'));
			}

			if(trim($this->request->query('regions')) != "")
			{
				$arguments["regions"] = explode(',', $this->request->query('regions'));
//				foreach($arguments["regions"] as $regions_key =>$regions_val)
//				{
//					// Access each item in the array through the $regions_val variable
//				}
			}

			if(trim($this->request->query('divisions')) != "")
			{
				$arguments["divisions"] = explode(',', $this->request->query('divisions'));
//				foreach($arguments["divisions"] as $divisions_key =>$divisions_val)
//				{
//					// Access each item in the array through the $divisions_val variable
//				}
			}

			if(trim($this->request->query('academics')) != "")
			{
				$arguments["academics"] = explode(',', $this->request->query('academics'));
//				foreach($arguments["academics"] as $academics_key =>$academics_val)
//				{
//					// Access each item in the array through the $academics_val variable
//				}
			}

			if(trim($this->request->query('public')) != "")
			{
				//convert public to a boolean
				$arguments["public"] = Util::convert_to_boolean($this->request->query('public'));
			}
				
			if(trim($this->request->query('private')) != "")
			{
				//convert private to a boolean
				$arguments["private"] = Util::convert_to_boolean($this->request->query('private'));
			}
			
			if((int)trim($this->request->query('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->query('states_id'));
			}

			return $this->mainModel->getSearch($arguments);
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