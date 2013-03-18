<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Game API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Game extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Games_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about the game
		 * via /api/game/basics/{games_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about the game";

		
		}
		
		/**
		 * action_get_teams() All teams competing in the game
		 * via /api/game/teams/{games_id}
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "All teams competing in the game";

		
		}
		
		/**
		 * action_get_location() Returns the location of a game
		 * via /api/game/location/{games_id}
		 *
		 */
		public function action_get_location()
		{
			$this->payloadDesc = "Returns the location of a game";

		
		}
		
		/**
		 * action_get_matches() List of all matches within a given game
		 * via /api/game/matches/{games_id}
		 *
		 */
		public function action_get_matches()
		{
			$this->payloadDesc = "List of all matches within a given game";

		
		}
		
		/**
		 * action_get_videos() Get all videos tagged with a certain game
		 * via /api/game/videos/{games_id}
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Get all videos tagged with a certain game";

		
		}
		
		/**
		 * action_get_images() Get all images associated with a certain game
		 * via /api/game/images/{games_id}
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "Get all images associated with a certain game";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new game
		 * via /api/game/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new game";

		     // CHECK FOR PARAMETERS:
			// game_datetime 
			// The date / time of the Game
				
			if($this->request->post('game_datetime') != "")
			{
				// Format as date
				$game_datetime = date("Y-m-d H:i:s",strtotime($this->request->post('game_datetime')));
			}

			// locations_id 
			// Location of the game
				
			if((int)trim($this->request->post('locations_id')) > 0)
			{
				$locations_id = (int)trim($this->request->post('locations_id'));
			}

			// tournaments_id 
			// An optional tournament
				
			if((int)trim($this->request->post('tournaments_id')) > 0)
			{
				$tournaments_id = (int)trim($this->request->post('tournaments_id'));
			}

		}
		
		/**
		 * action_post_addteam() Add a new team to this game
		 * via /api/game/addteam/{games_id}
		 *
		 */
		public function action_post_addteam()
		{
			$this->payloadDesc = "Add a new team to this game";

		     // CHECK FOR PARAMETERS:
			// teams_id 
			// ID of the team to add
				
			if((int)trim($this->request->post('teams_id')) > 0)
			{
				$teams_id = (int)trim($this->request->post('teams_id'));
			}

			// home_team 
			// True if this is the home team at the game
				
			if($this->request->post('home_team') != "")
			{
				//convert home_team to a boolean
				$home_team = (bool)$this->request->post('home_team');
			}

			// isWinner 
			// This is set to false if the team lost or if the game has not yet taken place
				
			if($this->request->post('isWinner') != "")
			{
				//convert isWinner to a boolean
				$isWinner = (bool)$this->request->post('isWinner');
			}

			// points_scored 
			// Number of points scored
				
			if((int)trim($this->request->post('points_scored')) > 0)
			{
				$points_scored = (int)trim($this->request->post('points_scored'));
			}

			// points_agains 
			// Number of points scored against this team
				
			if((int)trim($this->request->post('points_agains')) > 0)
			{
				$points_agains = (int)trim($this->request->post('points_agains'));
			}

		}
		
		/**
		 * action_post_addmatch() Add a new match to this game
		 * via /api/game/addmatch/{games_id}
		 *
		 */
		public function action_post_addmatch()
		{
			$this->payloadDesc = "Add a new match to this game";

		     // CHECK FOR PARAMETERS:
			// match_num 
			// A number or unique identifier for the match (can be 1st, Last, or any string)
				
			if(trim($this->request->post('match_num')) != "")
			{
				$match_num = trim($this->request->post('match_num'));
			}

		}
		
		/**
		 * action_post_addvideo() Post a new video for this game
		 * via /api/game/addvideo/{games_id}
		 *
		 */
		public function action_post_addvideo()
		{
			$this->payloadDesc = "Post a new video for this game";

		     // CHECK FOR PARAMETERS:
			// name 
			// Video Title
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

		}
		
		/**
		 * action_post_addimage() Post a new image for this game
		 * via /api/game/addimage/{games_id}
		 *
		 */
		public function action_post_addimage()
		{
			$this->payloadDesc = "Post a new image for this game";

		     // CHECK FOR PARAMETERS:
			// name 
			// Image Tiutle
				
			if(trim($this->request->post('name')) != "")
			{
				$name = trim($this->request->post('name'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update Basic information about the game
		 * via /api/game/basics/{games_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update Basic information about the game";

		     // CHECK FOR PARAMETERS:
			// game_datetime 
			// Change the date / time this game takes place
				
			if($this->request->body('game_datetime') != "")
			{
				// Format as date
				$game_datetime = date("Y-m-d H:i:s",strtotime($this->request->body('game_datetime')));
			}

			// lodcations_id 
			// Change the location of this game
				
			if((int)trim($this->request->body('lodcations_id')) > 0)
			{
				$lodcations_id = (int)trim($this->request->body('lodcations_id'));
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete a Game
		 * via /api/game/base/{games_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a Game";

		
		}
		
	}