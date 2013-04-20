<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Gamematch API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Gamematch extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);
			$a = ORM::factory("Sportorg_Games_Match");
			$this->setMainModel($a);
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info for a game match
		 * via /api/gamematch/basics/{game_matches_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info for a game match";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}
		
		/**
		 * action_get_players() All players within a given match
		 * via /api/gamematch/players/{game_matches_id}
		 *
		 */
		public function action_get_players()
		{
			$this->payloadDesc = "All players within a given match";

		     // CHECK FOR PARAMETERS:
			// positions_id 
			// Filter players for a certain game match to only show those for a specific position
				
			if((int)trim($this->request->query('positions_id')) > 0)
			{
				$positions_id = (int)trim($this->request->query('positions_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getPlayers($positions_id);

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new Game Match
		 * via /api/gamematch/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new Game Match";

		     // CHECK FOR PARAMETERS:
			// games_id 
			// ID of the game we're adding the match for
			$game_match_obj = ORM::factory("Sportorg_Games_Match");

			$games_id = (int)trim($this->request->post('games_id'));
			$match_num = trim($this->request->post('match_num'));

			$game_match_obj->games_id = $games_id;
			$game_match_obj->match_num = $match_num;
			try{
				$validate_game_match = $game_match_obj->validation();
				$validate_game_match->rule('match_num', "not_empty")
					->rule('match_num', 'match_num_unique_in_one_game', array(':value', $games_id));
				$game_match_obj->save($validate_game_match);
			}catch (ORM_Validation_Exception $e){
				$error_arrays = $e->errors("models/sportorg/games");
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
			return $game_match_obj;
		}
		
		/**
		 * action_post_addplayer() Add a new player to this match
		 * via /api/gamematch/addplayer/{game_matches_id}
		 *
		 */
		public function action_post_addplayer()
		{
			$this->payloadDesc = "Add a new player to this match";

		     // CHECK FOR PARAMETERS:
			// users_id (REQUIRED)
			// ID of the player to add
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->post('users_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "users_id",
					"param_desc" => "ID of the player to add"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// points_awarded 
			// Number of Points earned (if applicable)
				
			if((int)trim($this->request->post('points_awarded')) > 0)
			{
				$points_awarded = (int)trim($this->request->post('points_awarded'));
			}

			// match_won 
			// True if the player won the match in question
				
			if($this->request->post('match_won') != "")
			{
				//convert match_won to a boolean
				$match_won = (bool)$this->request->post('match_won');
			}

			// result_time 
			// Result time (if applicable)
				
			if(trim($this->request->post('result_time')) != "")
			{
				$result_time = trim($this->request->post('result_time'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update Basic info for a game match
		 * via /api/gamematch/basics/{game_matches_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update Basic info for a game match";

		     // CHECK FOR PARAMETERS:
			// match_num 
			// Change the Match Num for this match
				
			if(trim($this->put('match_num')) != "")
			{
				$match_num = trim($this->put('match_num'));
			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			try
			{
				$update_obj = $this->mainModel->updateGamematch($match_num);
				return $update_obj->save();					
			}catch(Exception $e)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save county",
					"desc" => $e->getMessage()
				);
				 
				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				 
				return $this;
			}
		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete a Game Match
		 * via /api/gamematch/base/{game_matches_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a Game Match";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->delete();
		}
		
		/**
		 * action_delete_player() Delete a player from the Game Match
		 * via /api/gamematch/player/{game_matches_id}/users_id
		 *
		 */
		public function action_delete_player()
		{
			$this->payloadDesc = "Delete a player from the Game Match";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			return $this->mainModel->deletePlayers();
		}
		
	}