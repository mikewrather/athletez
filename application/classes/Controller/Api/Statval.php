<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Statval API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Statval extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Stats_Vals'));
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
			$args = array();
		     // CHECK FOR PARAMETERS:
			// stats_id (REQUIRED)
			// The ID of the statistic
				
			if((int)trim($this->request->post('stats_id')) > 0)
			{
				$args['stats_id'] = (int)trim($this->request->post('stats_id'));
			}

			// users_id (REQUIRED)
			// The ID of the user we are adding the value for
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$args['users_id'] = (int)trim($this->request->post('users_id'));
			}

			// teams_id
			// The Team that this statistic is associated with
				
			if((int)trim($this->request->post('teams_id')) > 0)
			{
				$args['teams_id'] = (int)trim($this->request->post('teams_id'));
			}

			// statval 
			// The user's value
				
			if(trim($this->request->post('statval')) != "")
			{
				$args['statval'] = trim($this->request->post('statval'));
			}

			// statdate 
			// The date that this statistic took place on
				
			if($this->request->post('statdate') != "")
			{
				// Format as date
				$args['statdate'] = date("Y-m-d",strtotime($this->request->post('statdate')));
			}

			// games_id 
			// The game that this statistic refers to
				
			if((int)trim($this->request->post('games_id')) > 0)
			{
				$args['games_id'] = (int)trim($this->request->post('games_id'));
			}

			// stat_contexts_id 
			// The ID of the context for this statistic
				
			if((int)trim($this->request->post('stat_contexts_id')) > 0)
			{
				$args['stat_contexts_id'] = (int)trim($this->request->post('stat_contexts_id'));
			}
			 
			$result = $this->mainModel->addStatvals($args);
			//Check for success / error
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

			return $statvals;
		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}