<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Team API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Team extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Team'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on a given team
		 * via /api/team/basics/{teams_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on a given team";

		
		}
		
		/**
		 * action_get_games() Get all games for a given team
		 * via /api/team/games/{teams_id}
		 *
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "Get all games for a given team";

		         // CHECK FOR PARAMETERS:
			// games_before 
			// Filter games associated with a given team to only show those before a given date
				
			if($this->request->post('games_before') != "")
			{
				// Format as date
				$games_before = date("Y-m-d H:i:s",strtotime($this->request->post('games_before')));
			}

			// games_after 
			// Filter games associated with a given team to only show those before a given date
				
			if($this->request->post('games_after') != "")
			{
				// Format as date
				$games_after = date("Y-m-d H:i:s",strtotime($this->request->post('games_after')));
			}

			// is_winner 
			// Filter games associated with a given team to only show those where the team either won or lost the game
				
			if((int)trim($this->request->post('is_winner')) > 0)
			{
				$is_winner = (int)trim($this->request->post('is_winner'));
			}

		}
		
		/**
		 * action_get_roster() Get the players for a given team
		 * via /api/team/roster/{teams_id}
		 *
		 */
		public function action_get_roster()
		{
			$this->payloadDesc = "Get the players for a given team";

		         // CHECK FOR PARAMETERS:
			// positions_id 
			// Filter the roster of a given team to only show those players for a certain position
				
			if((int)trim($this->request->post('positions_id')) > 0)
			{
				$positions_id = (int)trim($this->request->post('positions_id'));
			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		/**
		 * action_post_add() Add a new team
		 * via /api/team/add/{0}
		 *
		 */
		public function action_post_add()
		{
			$this->payloadDesc = "Add a new team";

		         // CHECK FOR PARAMETERS:
			// org_sport_link_id 
			// ID of the linking row for Organization / Sport (Optional alternative to providing sport / org separately)
				
			if((int)trim($this->request->post('org_sport_link_id')) > 0)
			{
				$org_sport_link_id = (int)trim($this->request->post('org_sport_link_id'));
			}

			// orgs_id 
			// Organization ID (If Org_Sport_Link not provided)
				
			if((int)trim($this->request->post('orgs_id')) > 0)
			{
				$orgs_id = (int)trim($this->request->post('orgs_id'));
			}

			// sports_id 
			// Sport ID (If Org_Sport_Link not provided)
				
			if((int)trim($this->request->post('sports_id')) > 0)
			{
				$sports_id = (int)trim($this->request->post('sports_id'));
			}

			// complevels_id 
			// Competition Level ID
				
			if((int)trim($this->request->post('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->request->post('complevels_id'));
			}

			// seasons_id 
			// Season ID
				
			if((int)trim($this->request->post('seasons_id')) > 0)
			{
				$seasons_id = (int)trim($this->request->post('seasons_id'));
			}

			// year 
			// The Year of the Season
				
			if(trim($this->request->post('year')) != "")
			{
				$year = trim($this->request->post('year'));
			}

			// mascot 
			// An optional mascot for the team
				
			if(trim($this->request->post('mascot')) != "")
			{
				$mascot = trim($this->request->post('mascot'));
			}

			// unique_ident 
			// This is an optional identifier for organizations that have multiple teams with all other criteria the same.
				
			if(trim($this->request->post('unique_ident')) != "")
			{
				$unique_ident = trim($this->request->post('unique_ident'));
			}

		}
		
		/**
		 * action_post_game() Add a new game to a team's schedule
		 * via /api/team/game/{teams_id}
		 *
		 */
		public function action_post_game()
		{
			$this->payloadDesc = "Add a new game to a team's schedule";

		         // CHECK FOR PARAMETERS:
			// games_id 
			// If this is provided, the system will assume the game already exists and simply create the linking row.  If not provided the game will be created.
				
			if((int)trim($this->request->post('games_id')) > 0)
			{
				$games_id = (int)trim($this->request->post('games_id'));
			}

			// game_datetime 
			// The date/time of the game.
				
			if($this->request->post('game_datetime') != "")
			{
				// Format as date
				$game_datetime = date("Y-m-d H:i:s",strtotime($this->request->post('game_datetime')));
			}

			// locations_id 
			// ID of the location
				
			if((int)trim($this->request->post('locations_id')) > 0)
			{
				$locations_id = (int)trim($this->request->post('locations_id'));
			}

			// home_team 
			// True if this team is the home team for the game.
				
			if($this->request->post('home_team') != "")
			{
				//convert home_team to a boolean
				$home_team = (bool)$this->request->post('home_team');
			}

			// tournaments_id 
			// Optional tournaments ID if this game belongs to a tournament.
				
			if((int)trim($this->request->post('tournaments_id')) > 0)
			{
				$tournaments_id = (int)trim($this->request->post('tournaments_id'));
			}

		}
		
		/**
		 * action_post_player() Add a new player to the roster
		 * via /api/team/player/{teams_id}
		 *
		 */
		public function action_post_player()
		{
			$this->payloadDesc = "Add a new player to the roster";

		         // CHECK FOR PARAMETERS:
			// users_id 
			// Adds a Link between this user and this team
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->post('users_id'));
			}

		}
		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update Basic info on a given team
		 * via /api/team/basics/{teams_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update Basic info on a given team";

		         // CHECK FOR PARAMETERS:
			// complevels_id 
			// Competition Level ID
				
			if((int)trim($this->request->body('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->request->body('complevels_id'));
			}

			// seasons_id 
			// Update the Season ID
				
			if((int)trim($this->request->body('seasons_id')) > 0)
			{
				$seasons_id = (int)trim($this->request->body('seasons_id'));
			}

			// year 
			// Change the year of this team
				
			if(trim($this->request->body('year')) != "")
			{
				$year = trim($this->request->body('year'));
			}

			// mascot 
			// Change the mascot of this team
				
			if(trim($this->request->body('mascot')) != "")
			{
				$mascot = trim($this->request->body('mascot'));
			}

			// unique_ident 
			// Change the Unique Identifier for this team
				
			if(trim($this->request->body('unique_ident')) != "")
			{
				$unique_ident = trim($this->request->body('unique_ident'));
			}

		}
		
		/**
		 * action_put_gamelink() Update the link between teams and games which contains score information
		 * via /api/team/gamelink/{teams_id}/games_id
		 *
		 */
		public function action_put_gamelink()
		{
			$this->payloadDesc = "Update the link between teams and games which contains score information";

		         // CHECK FOR PARAMETERS:
			// points_scored 
			// Change the number of points scored for this team in this game
				
			if((int)trim($this->request->body('points_scored')) > 0)
			{
				$points_scored = (int)trim($this->request->body('points_scored'));
			}

			// points_against 
			// Change the number of points scored against this team / game
				
			if((int)trim($this->request->body('points_against')) > 0)
			{
				$points_against = (int)trim($this->request->body('points_against'));
			}

			// isWinner 
			// Update whether this team won this game
				
			if($this->request->body('isWinner') != "")
			{
				//convert isWinner to a boolean
				$isWinner = (bool)$this->request->body('isWinner');
			}

			// is_home_team 
			// Update whether this is the home team for this game
				
			if($this->request->body('is_home_team') != "")
			{
				//convert is_home_team to a boolean
				$is_home_team = (bool)$this->request->body('is_home_team');
			}

		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete a team
		 * via /api/team/base/{teams_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a team";

		
		}
		
		/**
		 * action_delete_gamelink() Delete a team from a game
		 * via /api/team/gamelink/{teams_id}/games_id
		 *
		 */
		public function action_delete_gamelink()
		{
			$this->payloadDesc = "Delete a team from a game";

		
		}
		
	}