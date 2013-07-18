<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Gamematchplayer API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Gamematchplayer extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Games_Matchplayer'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a player in a match
		 * via /api/gamematchplayer/basics/{game_match_players_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a player in a match";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel; 
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a player to a Game Match
		 * via /api/gamematchplayer/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a player to a Game Match";
			$game_matches_id = (int)trim($this->request->post('game_matches_id'));

			if (!Valid::game_match_id_exist($game_matches_id)){
				$error_array = array(
					"error" => "Game match doesn't exist",
					"desc" => "Game match doesn't exist"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$gameMatchModel = ORM::factory('Sportorg_Games_Match', $game_matches_id);

			if(!$this->user->can('GameMatches', array('action'=>'addPlayer', 'obj' => $gameMatchModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to modify",
					"desc" => "In order to modify this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}



			if((int)trim($this->request->post('users_id')) > 0)
			{
				$args['users_id'] = $this->request->post('users_id');
			}

			if((int)trim($this->request->post('points_awarded')))
			{
				$args['points_awarded'] = $this->request->post('points_awarded');
			}
			//$users_id = (int)trim($this->request->post('users_id'));
			//$points_awarded = (int)trim($this->request->post('points_awarded'));

			//convert match_won to a boolean
			$match_winner = trim($this->request->post('match_won'));
			if ($match_winner != ""){
				$match_winner = Util::convert_to_boolean($match_winner);
			}
			$args['match_winner'] = $match_winner;

			$args['game_matches_id'] = $game_matches_id;

			$result_time = trim($this->request->post('result_time'));
			$args['result_time'] = $result_time;
			$result = $this->mainModel->addPlayer($args);

			if(get_class($result) == get_class($this))
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
		 * action_put_basics() Update basic information about a player in a match
		 * via /api/gamematchplayer/basics/{game_match_players_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basic information about a player in a match";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(!$this->user->can('GameMatches', array('action'=>'modify', 'obj' => $this->mainModel->game_matches))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to modify",
					"desc" => "In order to modify this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}
				
			if((int)trim($this->put('points_awarded')) > 0)
			{
				$points_awarded = (int)trim($this->put('points_awarded'));
			}

			// match_winner 
			// Update whether this player is the match winner
				
			if(trim($this->put('match_winner')) != "")
			{
				//convert match_winner to a boolean
				$match_winner = strtolower(trim($this->put('match_winner')));
				if (!in_array($match_winner, array('true', 'false'))){
					$match_winner = 2;//means not in 0,1
				}else{
					if ($match_winner == 'true'){
						$match_winner = 1;
					}else{
						$match_winner = 0;
					}
				}
			}

			$args['id']  = $this->mainModel->id;

			$args['points_awarded'] = $points_awarded;
			$args['match_winner'] = $match_winner;
			$result =  $this->mainModel->updateGameMatchPlayer($args);

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
		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}