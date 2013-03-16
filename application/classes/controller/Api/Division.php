<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Division API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Division extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Division'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a division
		 * via /api/division/basics/{divisions_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a division";

		
		}
		
		/**
		 * action_get_orgs() Returns all organizations within with a certain division
		 * via /api/division/orgs/{divisions_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "Returns all organizations within with a certain division";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new Division
		 * via /api/division/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Division";

		         // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the Division to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// states_id (REQUIRED)
			// ID of the state this division belongs to
				
			if((int)trim($this->request->post('states_id')) > 0)
			{
				$states_id = (int)trim($this->request->post('states_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// sections_id 
			// The ID of the Section this division belongs to (if applicable)
				
			if((int)trim($this->request->post('sections_id')) > 0)
			{
				$sections_id = (int)trim($this->request->post('sections_id'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basic information about a division
		 * via /api/division/basics/{divisions_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about a division";

		         // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the division
				
			if(trim($this->request->body('name')) != "")
			{
				$name = trim($this->request->body('name'));
			}

			// states_id 
			// Change the state of this division
				
			if((int)trim($this->request->body('states_id')) > 0)
			{
				$states_id = (int)trim($this->request->body('states_id'));
			}

			// sections_id 
			// Change the Section this division belongs to
				
			if((int)trim($this->request->body('sections_id')) > 0)
			{
				$sections_id = (int)trim($this->request->body('sections_id'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  division
		 * via /api/division/base/{divisions_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  division";

		
		}
		
	}