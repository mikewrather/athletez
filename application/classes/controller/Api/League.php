<?php defined('SYSPATH') or die('No direct script access.');

/**
 * League API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_League extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_League'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basics on a League
		 * via /api/league/basics/{leagues_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basics on a League";

		
		}
		
		/**
		 * action_get_orgs() All organizations within a League
		 * via /api/league/orgs/{leagues_id}
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a League";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new League
		 * via /api/league/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new League";

		         // CHECK FOR PARAMETERS:
			// name (REQUIRED)
			// Name of the League to add
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// sections_id 
			// The ID of the Section (if applicable)
				
			if((int)trim($this->request->post('sections_id')) > 0)
			{
				$sections_id = (int)trim($this->request->post('sections_id'));
			}

			// states_id (REQUIRED)
			// The ID of the state the League belongs to
				
			if((int)trim($this->request->post('states_id')) > 0)
			{
				$states_id = (int)trim($this->request->post('states_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basics on a League
		 * via /api/league/basics/{leagues_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basics on a League";

		         // CHECK FOR PARAMETERS:
			// name 
			// Update the name of the league
				
			if(trim($this->request->body('name')) != "")
			{
				$name = trim($this->request->body('name'));
			}

			// states_id 
			// Change the state of this league
				
			if((int)trim($this->request->body('states_id')) > 0)
			{
				$states_id = (int)trim($this->request->body('states_id'));
			}

			// sections_id 
			// Change the Section this league belongs to
				
			if((int)trim($this->request->body('sections_id')) > 0)
			{
				$sections_id = (int)trim($this->request->body('sections_id'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  League
		 * via /api/league/base/{leagues_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  League";

		
		}
		
	}