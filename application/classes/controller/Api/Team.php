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
				
			if($this->request->query('games_before') != "")
			{
				// Format as date
				$games_before = date("Y-m-d H:i:s",strtotime($this->request->query('games_before')));
			}

			// games_after 
			// Filter games associated with a given team to only show those before a given date
				
			if($this->request->query('games_after') != "")
			{
				// Format as date
				$games_after = date("Y-m-d H:i:s",strtotime($this->request->query('games_after')));
			}

			// is_winner 
			// Filter games associated with a given team to only show those where the team either won or lost the game
				
			if((int)trim($this->request->query('is_winner')) > 0)
			{
				$is_winner = (int)trim($this->request->query('is_winner'));
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
				
			if((int)trim($this->request->query('positions_id')) > 0)
			{
				$positions_id = (int)trim($this->request->query('positions_id'));
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

			//Jeffrey add save&validation logic here
			$team_obj = ORM::factory("Sportorg_Team");
			$team_obj->org_sport_link_id = $org_sport_link_id;
			//$team_obj->orgs_id = $orgs_id;
			//$team_obj->sports_id = $sports_id;
			$team_obj->complevels_id = $complevels_id;
			$team_obj->seasons_id = $seasons_id;
			$team_obj->year = $year;
			$team_obj->mascot = $mascot;
			$team_obj->unique_ident = $unique_ident;
			try
			{
				//check org_sport_link_id, org_id and sport_id are required when org_sport_link_id is null
				if ($org_sport_link_id == ""){
					$check_org_sport = Validation::factory($team_obj->as_array())
						->rule('org_id', 'Model_Sportorg_Team::not_equals', array(':value', 0))
						->rule('sports_id', 'Model_Sportorg_Team::not_equals', array(':value', 0));
					if ($check_org_sport->check()){
						//check org_sport in db.
						$org_sport_link_model = ORM::factory("Sportorg_Orgsportlink");
						$result = $org_sport_link_model->getOrgSportId($orgs_id, $sports_id);
						if(!$result->loaded())
						{
							unset($org_sport_link_model);
							$org_sport_link_model = ORM::factory("Sportorg_Orgsportlink");
							//Insert new row to org_sport_link
							$org_sport_link_model->orgs_id = $orgs_id;
							$org_sport_link_model->sports_id = $sports_id;
							$org_sport_link_model->save();
							$org_sport_pk = $org_sport_link_model->pk();
							$team_obj->org_sport_link_id = $org_sport_pk;
						}else{
							$team_obj->org_sport_link_id = $result->id;
						}

						$team_obj->save();
					}else{
						$err_exception = new ErrorException("Validation error");
						throw $err_exception;
						return $team_obj;
					}
				}else{
					$check_org_sport_id_legal = Validation::factory($team_obj->as_array())
						->rule('org_sport_link_id', 'Model_Sportorg_Team::check_org_sport_id_exist');
					if (!$check_org_sport_id_legal->check()){
						$err_exception = new ErrorException("org_sport_link_id does not exist");
						throw $err_exception;
						return $team_obj;
					}
					$team_obj->save();
				}
			} catch(ErrorException $e)
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save team info",
					"desc" => $e->getMessage()
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}catch (ORM_Validation_Exception $e){
				// Create Array for Error Data
				$error_array = array(
					"error" => "Unable to save team info",
					"desc" => $e->getMessage()
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
			}
			return $team_obj;

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
				
			if((int)trim($this->put('complevels_id')) > 0)
			{
				$complevels_id = (int)trim($this->put('complevels_id'));
			}

			// seasons_id 
			// Update the Season ID
				
			if((int)trim($this->put('seasons_id')) > 0)
			{
				$seasons_id = (int)trim($this->put('seasons_id'));
			}

			// year 
			// Change the year of this team
				
			if(trim($this->put('year')) != "")
			{
				$year = trim($this->put('year'));
			}

			// mascot 
			// Change the mascot of this team
				
			if(trim($this->put('mascot')) != "")
			{
				$mascot = trim($this->put('mascot'));
			}

			// unique_ident 
			// Change the Unique Identifier for this team
				
			if(trim($this->put('unique_ident')) != "")
			{
				$unique_ident = trim($this->put('unique_ident'));
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
				
			if((int)trim($this->put('points_scored')) > 0)
			{
				$points_scored = (int)trim($this->put('points_scored'));
			}

			// points_against 
			// Change the number of points scored against this team / game
				
			if((int)trim($this->put('points_against')) > 0)
			{
				$points_against = (int)trim($this->put('points_against'));
			}

			// isWinner 
			// Update whether this team won this game
				
			if($this->put('isWinner') != "")
			{
				//convert isWinner to a boolean
				$isWinner = (bool)$this->put('isWinner');
			}

			// is_home_team 
			// Update whether this is the home team for this game
				
			if($this->put('is_home_team') != "")
			{
				//convert is_home_team to a boolean
				$is_home_team = (bool)$this->put('is_home_team');
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