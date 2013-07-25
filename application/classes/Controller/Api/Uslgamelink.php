<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Uslgamelink API controller class
 *
 * Date: Auto-generated on Jul 24th, 2013 2:52 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Uslgamelink extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('User_Sportlink_Gamelink'));
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
		 * action_post_add() link a user's user_sport_link entry and a game via usl_game_link
		 * via /api/uslgamelink/add/{usl_game_link_id}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "link a user's user_sport_link entry and a game via usl_game_link";
			$arguments = array();
		     // CHECK FOR PARAMETERS:
			// games_id 
			// The ID of the event to add this user to.
				
			if((int)trim($this->request->post('games_id')) > 0)
			{
				$arguments["games_id"] = (int)trim($this->request->post('games_id'));
			}

			// sports_id 
			// The ID of the sport specified in user_sport_link
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->post('sports_id'));
			}

			if((int)trim($this->request->post('users_id')) > 0)
			{
				$arguments["users_id"] = (int)trim($this->request->post('users_id'));
			}

			$result = $this->mainModel->addUslGamesLink($arguments);

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
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}