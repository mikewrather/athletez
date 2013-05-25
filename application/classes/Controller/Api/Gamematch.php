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
			$arguments = array();

			if((int)trim($this->request->post('games_id')) > 0)
			{
				$arguments["games_id"] = (int)trim($this->request->post('games_id'));
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
			// CHECK FOR PARAMETERS:
			// users_id (REQUIRED)
			// ID of the player to add

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

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
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