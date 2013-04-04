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
			$game_match_player_obj = ORM::factory("Sportorg_Games_Matchplayer");

			$users_id = (int)trim($this->request->post('users_id'));

			$game_matches_id = (int)trim($this->request->post('game_matches_id'));

			$points_awarded = (int)trim($this->request->post('points_awarded'));

			//convert match_won to a boolean
			$match_winner = $this->request->post('match_won');

			$result_time = trim($this->request->post('result_time'));

			$game_match_player_obj->users_id = $users_id;
			$game_match_player_obj->game_matches_id = $game_matches_id;
			$game_match_player_obj->points_awarded = $points_awarded;
			$game_match_player_obj->match_winner = $match_winner;
			$game_match_player_obj->result_time = $result_time;
			if (strtolower($game_match_player_obj->match_winner) == 'true'){
				$game_match_player_obj->match_winner = 'true';
			}
			if (strtolower($game_match_player_obj->match_winner) == 'false'){
				$game_match_player_obj->match_winner = 'false';
			}
			try{
				$game_match_player_obj->save();
			}catch (ORM_Validation_Exception $e){
				$error_arrays = $e->errors('models/sportorg/games/sportorg_games_matchplayer');
				$external_errors = array();
				if (isset($error_arrays['_external'])){
					$external_errors = $error_arrays['_external'];
					$error_arrays = array();
				}
				$error_arrays = array_merge($error_arrays, $external_errors);
				$error_desc = implode("\n", $error_arrays);

				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save game match info",
					"desc" => $error_desc
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}
			return $game_match_player_obj;
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

		     // CHECK FOR PARAMETERS:
			// points_awarded 
			// Update the number of points awarded to this player during this match
				
			if((int)trim($this->put('points_awarded')) > 0)
			{
				$points_awarded = (int)trim($this->put('points_awarded'));
			}

			// match_winner 
			// Update whether this player is the match winner
				
			if($this->put('match_winner') != "")
			{
				//convert match_winner to a boolean
				$match_winner = (bool)$this->put('match_winner');
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}