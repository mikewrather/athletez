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

		public function __construct($request,$response){
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
			$arguments = array();

			if((int)trim($this->request->post('games_id')) > 0)
			{
				$arguments["games_id"] = (int)trim($this->request->post('games_id'));
			}else{
				$error_array = array(
					"error" => "Games id required",
					"desc" => "Games id required"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			//check games_id is exist in system
			if (!Valid::games_id_exist($arguments["games_id"])){
				$error_array = array(
					"error" => "Games id doesn't exist",
					"desc" => "Games id doesn't exist"
				);
				$this->modelNotSetError($error_array);
				return false;
			}else{
				$mainModel = ORM::factory('Sportorg_Games_Base', $arguments["games_id"]);
			}

			// No mainModel->id in add function. we need to get it from games
			if(!$this->user->can('GameMatches', array('action'=>'create', 'obj' => $mainModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to create",
					"desc" => "In order to create this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			if(trim($this->request->post('match_num')) != "")
			{
				$arguments["match_num"] = trim($this->request->post('match_num'));
			}
			$result = $this->mainModel->addGamematch($arguments);
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
		
		/**
		 * action_post_addplayer() Add a new player to this match
		 * via /api/gamematch/addplayer/{game_matches_id}
		 *
		 */
		public function action_post_addplayer()
		{
			$this->payloadDesc = "Add a new player to this match";
			$arguments = array();


			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(!$this->user->can('GameMatches', array('action'=>'addPlayer', 'obj' => $this->mainModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to create",
					"desc" => "In order to create this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			if((int)trim($this->request->post('users_id')) > 0)
			{
				$arguments["users_id"] = (int)trim($this->request->post('users_id'));
			}

			if((int)trim($this->request->post('points_awarded')) > 0)
			{
				$arguments["points_awarded"] = (int)trim($this->request->post('points_awarded'));
			}

			// match_won
			// True if the player won the match in question

			if($this->request->post('match_won') != "")
			{
				//convert match_won to a boolean
				$arguments["match_winner"] = Util::convert_to_boolean($this->request->post('match_won'));
			}

			// result_time
			// Result time (if applicable)

			if(trim($this->request->post('result_time')) != "")
			{
				$arguments["result_time"] = trim($this->request->post('result_time'));
			}

			$arguments["game_matches_id"] = $this->mainModel->id;
			$matchplayer_model = ORM::factory("Sportorg_Games_Matchplayer");
			$result = $matchplayer_model->addPlayer($arguments);

			if(get_class($result) == get_class($matchplayer_model))
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
		 * action_put_basics() Update Basic info for a game match
		 * via /api/gamematch/basics/{game_matches_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update Basic info for a game match";
			$arguments = array();

			if(trim($this->put('match_num')) != "")
			{
				$arguments["match_num"] = urldecode(trim($this->put('match_num')));
			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$arguments["id"] = $this->mainModel->id;

			if(!$this->user->can('GameMatches', array('action'=>'modify', 'obj' => $this->mainModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to modify",
					"desc" => "In order to modify this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$result = $this->mainModel->updateGamematch($arguments);
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

			if(!$this->user->can('GameMatches', array('action'=>'delete', 'obj' => $this->mainModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to delete",
					"desc" => "In order to delete this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$this->mainModel->delete_with_deps();
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

			if((int)trim($this->delete('users_id')) > 0)
			{
				$arguments["users_id"] = (int)trim($this->delete('users_id'));
			}else{
				$error_array = array(
					"error" => "user is required",
					"desc" => "user is required"
				);
				$this->modelNotSetError($error_array);
				return false;
			}
			$arguments['id'] = $this->mainModel->id;
			if(!$this->user->can('GameMatches', array('action'=>'delete', 'obj' => $this->mainModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to delete",
					"desc" => "In order to delete this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			if (!$this->mainModel->deletePlayers($arguments)){
				$error_array = array(
					"error" => "Game match player doesn't exist",
					"desc" => "Game match player doesn't exist"
				);

				$this->modelNotSetError($error_array);
				return false;
			}
		}
		
	}