<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Statval API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Statval extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Stats_Val'));
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
		 * action_post_add() Add a new User Value for a Statistic
		 * via /api/statval/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new User Value for a Statistic";

		         // CHECK FOR PARAMETERS:
			// stats_id (REQUIRED)
			// The ID of the statistic
				
			if((int)trim($this->request->post('stats_id')) > 0)
			{
				$stats_id = (int)trim($this->request->post('stats_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// users_id (REQUIRED)
			// The ID of the user we are adding the value for
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->post('users_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			
			// teams_id 
			// The Team that this statistic is associated with
				
			if((int)trim($this->request->post('teams_id')) > 0)
			{
				$teams_id = (int)trim($this->request->post('teams_id'));
			}

			// statval 
			// The user's value
				
			if(trim($this->request->post('statval')) != "")
			{
				$statval = trim($this->request->post('statval'));
			}

			// statdate 
			// The date that this statistic took place on
				
			if($this->request->post('statdate') != "")
			{
				// Format as date
				$statdate = date("Y-m-d H:i:s",strtotime($this->request->post('statdate')));
			}

			// games_id 
			// The game that this statistic refers to
				
			if((int)trim($this->request->post('games_id')) > 0)
			{
				$games_id = (int)trim($this->request->post('games_id'));
			}

			// stat_contexts_id 
			// The ID of the context for this statistic
				
			if((int)trim($this->request->post('stat_contexts_id')) > 0)
			{
				$stat_contexts_id = (int)trim($this->request->post('stat_contexts_id'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}