<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Team API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
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

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel; 
		}
		
		/**
		 * action_get_games() Get all games for a given team
		 * via /api/team/games/{teams_id}
		 *
		 */
		public function action_get_games()
		{
			$this->payloadDesc = "Get all games for a given team";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// games_before 
			// Filter games associated with a given team to only show those before a given date
				
			if($this->request->query('games_before') != "")
			{
				// Format as date
				$args['games_before'] = date("Y-m-d H:i:s",strtotime($this->request->query('games_before')));
			}

			// games_after 
			// Filter games associated with a given team to only show those before a given date
				
			if($this->request->query('games_after') != "")
			{
				// Format as date
				$args['games_after'] = date("Y-m-d H:i:s",strtotime($this->request->query('games_after')));
			}

			// is_winner 
			// Filter games associated with a given team to only show those where the team either won or lost the game
				
			if( trim($this->request->query('is_winner')) != "")
			{
				$args['isWinner'] = Util::convert_to_boolean(trim($this->request->query('is_winner')));
			}
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			
			return $this->mainModel->getGames($args);
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
			$args = array();	
			if((int)trim($this->request->query('positions_id')) > 0)
			{
				$args['positions_id'] = (int)trim($this->request->query('positions_id'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getRoster($args);
		}

		/**
		 * action_get_search() Search for a team
		 * via /api/team/search/{teams_id}
		 *
		 */
		public function action_get_search()
		{
			$this->payloadDesc = "Search for a team";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// sports_id
			// Narrow team list based on sport

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			// complevels_id
			// Narrow user list to teams of a specific comp level

			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$arguments["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			// orderby
			// Default will be to order by votes.

			if(trim($this->request->query('orderby')) != "")
			{
				$arguments["orderby"] = trim($this->request->query('orderby'));
			}

			// searchtext
			// A string to search name of a team

			if(trim($this->request->query('searchtext')) != "")
			{
				$arguments["searchtext"] = trim($this->request->query('searchtext'));
			}

			// zipcode
			// This will search the location of the team's ORG

			if((int)trim($this->request->query('zipcode')) > 0)
			{
				$arguments["zipcode"] = (int)trim($this->request->query('zipcode'));
			}

			// loc_name
			// This will search the org's location's city, county and state.

			if(trim($this->request->query('loc_name')) != "")
			{
				$arguments["loc_name"] = trim($this->request->query('loc_name'));
			}

			$teams_model = ORM::factory("Sportorg_Team");

			return $teams_model->getSearch($arguments);
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

			$org_sport_link_id = (int)trim($this->request->post('org_sport_link_id'));

			// orgs_id
			// Organization ID (If Org_Sport_Link not provided)

			$orgs_id = (int)trim($this->request->post('orgs_id'));

			// sports_id
			// Sport ID (If Org_Sport_Link not provided)

			$sports_id = (int)trim($this->request->post('sports_id'));

			// complevels_id
			// Competition Level ID

			$complevels_id = (int)trim($this->request->post('complevels_id'));

			// seasons_id
			// Season ID

			$seasons_id = (int)trim($this->request->post('seasons_id'));


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

			//Add save&validation logic here

			$args['org_sport_link_id'] = $org_sport_link_id;
			$args['orgs_id'] = $orgs_id;
			$args['sports_id'] = $sports_id;
			$args['complevels_id'] = $complevels_id;
			$args['seasons_id'] = $seasons_id;
			$args['year'] = $year;
			$args['mascot'] = $mascot;
			$args['unique_ident'] = $unique_ident;

			$result =  $this->mainModel->addTeam($args);

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
		
		/**
		 * action_post_game() Add a new game to a team's schedule
		 * via /api/team/game/{teams_id}
		 *
		 */
		public function action_post_game()
		{
			$this->payloadDesc = "Add a new game to a team\'s schedule";

		     // CHECK FOR PARAMETERS:
			// games_id 
			// If this is provided, the system will assume the game already exists and simply create the linking row.  If not provided the game will be created.
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

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
				
			if(trim($this->request->post('home_team') != ""))
			{
				//convert home_team to a boolean
				$home_team = Util::convert_to_boolean(trim($this->request->post('home_team')));
			}

			$args = array(
				'teams_id' => $this->mainModel->id,
				'games_id' => $games_id,
				'game_datetime' => $game_datetime,
				'locations_id' => $locations_id,
				'is_home_team' => $home_team,
			);

			$result = $this->mainModel->addGame($args);

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
		
		/**
		 * action_post_player() Add a new player to the roster
		 * via /api/team/player/{teams_id}
		 *
		 */
		public function action_post_player()
		{
			$this->payloadDesc = "Add a new player to the roster";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$team_users_link = ORM::factory("User_Teamslink");

		     // CHECK FOR PARAMETERS:
			// users_id 
			// Adds a Link between this user and this team
				
			if((int)trim($this->request->post('users_id')) > 0)
			{
				$users_id = (int)trim($this->request->post('users_id'));
			}

			$args = array(
				'users_id' => $users_id,
				'teams_id' => $this->mainModel->id,
			);
			$result =  $team_users_link->addPlayer($args);

			//Check for success / error
			if(get_class($result) == get_class($team_users_link))
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
		 * action_put_basics() Update Basic info on a given team
		 * via /api/team/basics/{teams_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update Basic info on a given team";
			$args = array();

			$args['complevels_id'] = (int)trim($this->put('complevels_id'));

			$args['seasons_id'] = (int)trim($this->put('seasons_id'));

			// year 
			// Change the year of this team
				
			if(trim($this->put('year')) != "")
			{
				$args['year'] = trim($this->put('year'));
			}

			// mascot 
			// Change the mascot of this team
				
			if(trim($this->put('mascot')) != "")
			{
				$args['mascot'] = trim($this->put('mascot'));
			}

			// unique_ident 
			// Change the Unique Identifier for this team
				
			if(trim($this->put('unique_ident')) != "")
			{
				$args['unique_ident'] = trim($this->put('unique_ident'));
			}
			
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$args['id']  = $this->mainModel->id;

			$result =  $this->mainModel->updateTeam($args);

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
		
		/**
		 * action_put_gamelink() Update the link between teams and games which contains score information
		 * via /api/team/gamelink/{teams_id}/games_id
		 *
		 */
		public function action_put_gamelink()
		{
			$this->payloadDesc = "Update the link between teams and games which contains score information";
			$args = array();
		     // CHECK FOR PARAMETERS:
			// points_scored 
			// Change the number of points scored for this team in this game
				
			if((int)trim($this->put('points_scored')) > 0)
			{
				$args['points_scored'] = (int)trim($this->put('points_scored'));
			}

			// points_against 
			// Change the number of points scored against this team / game
				
			if((int)trim($this->put('points_against')) > 0)
			{
				$args['points_against'] = (int)trim($this->put('points_against'));
			}

			// isWinner 
			// Update whether this team won this game
				
			if($this->put('isWinner') != "")
			{
				//convert isWinner to a boolean
				$args['isWinner'] = Util::convert_to_boolean($this->put('isWinner'));
			}

			// is_home_team 
			// Update whether this is the home team for this game
				
			if($this->put('is_home_team') != "")
			{
				//convert is_home_team to a boolean
				$args['is_home_team'] = Util::convert_to_boolean($this->put('is_home_team'));
			}

			if((int)trim($this->put('games_id')) > 0)
			{
				$args["games_id"] = (int)trim($this->put('games_id'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$args['teams_id'] = $this->mainModel->id;

			if (Valid::gamesteams_combine_primary_key_exist($args['teams_id'], $args['games_id'])){
				$error_array = array(
					"error" => "Game doesn't exist in the team",
					"desc" => "Game doesn't exist in the team"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$result = $this->mainModel->updateGamelink($args);
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

		
		/**
		 * action_delete_base() Delete a team
		 * via /api/team/base/{teams_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a team";

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->delete();
		}
		
		/**
		 * action_delete_gamelink() Delete a team from a game
		 * via /api/team/gamelink/{teams_id}/games_id
		 *
		 */
		public function action_delete_gamelink()
		{
			$this->payloadDesc = "Delete a team from a game";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if((int)trim($this->delete('games_id')) > 0)
			{
				$games_id  = (int)trim($this->delete('games_id'));
			}else{
				$error_array = array(
					"error" => "Games id required",
					"desc" => "Games id required"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			return $this->mainModel->deleteGamelink($games_id);
		}
		
	}