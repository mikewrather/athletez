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

		     // CHECK FOR PARAMETERS:
			// users_id 
			// The ID of the player to add
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->post('users_id'));
			}

			// game_matches_id (REQUIRED)
			// The Game Match ID
				
			if((int)trim($this->request->post('game_matches_id')) > 0)
			{
				$game_matches_id = (int)trim($this->request->post('game_matches_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "game_matches_id",
					"param_desc" => "The Game Match ID"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

			}
			
			// points_awarded (REQUIRED)
			// Number of Points earned (if applicable)
				
			if((int)trim($this->request->post('points_awarded')) > 0)
			{
				$points_awarded = (int)trim($this->request->post('points_awarded'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "points_awarded",
					"param_desc" => "Number of Points earned (if applicable)"
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);

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