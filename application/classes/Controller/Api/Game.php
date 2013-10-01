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

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel;
		}
		
		/**
		 * action_get_teams() All teams competing in the game
		 * via /api/game/teams/{games_id}
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "All teams competing in the game";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getTeams();
		}

		public function action_get_comments(){
			$this->payloadDesc = "All comments in the game";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getComments();
		}
		
		/**
		 * action_get_location() Returns the location of a game
		 * via /api/game/location/{games_id}
		 *
		 */
		public function action_get_location()
		{
			$this->payloadDesc = "Returns the location of a game";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getLocation();
		}
		
		/**
		 * action_get_matches() List of all matches within a given game
		 * via /api/game/matches/{games_id}
		 *
		 */
		public function action_get_matches()
		{
			$this->payloadDesc = "List of all matches within a given game";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			return $this->mainModel->getMatches();
		}
		
		/**
		 * action_get_videos() Get all videos tagged with a certain game
		 * via /api/game/videos/{games_id}
		 *
		 */
		public function action_get_videos()
		{
			$this->payloadDesc = "Get all videos tagged with a certain game";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}
			$video_model = ORM::factory("Media_Video");
			return $video_model->getTaggedVideos($this->mainModel);
		}

		public function action_get_teamrosters(){
			$this->payloadDesc = "Get all team rosters";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			return $this->mainModel->getTeamRosters();
		}
		
		/**
		 * action_get_images() Get all images associated with a certain game
		 * via /api/game/images/{games_id}
		 *
		 */
		public function action_get_images()
		{
			$this->payloadDesc = "Get all images associated with a certain game";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			$image_model = ORM::factory("Media_Image");
			return $image_model->getTaggedImages($this->mainModel);
		}

		/**
		 * action_get_search() Search for a game based on several parameters
		 * via /api/game/search/{games_id}
		 *
		 */
		public function action_get_search()
		{
			$this->payloadDesc = "Search for a game based on several parameters";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// sports_id
			// Narrow user list based on sport

			if((int)trim($this->request->query('sports_id')) > 0)
			{
				$arguments["sports_id"] = (int)trim($this->request->query('sports_id'));
			}

			if((int)trim($this->request->query('teams_id')) > 0)
			{
				$arguments["teams_id"] = (int)trim($this->request->query('teams_id'));
			}

			// complevels_id
			// Narrow user list to users of a comp level

			if((int)trim($this->request->query('complevels_id')) > 0)
			{
				$arguments["complevels_id"] = (int)trim($this->request->query('complevels_id'));
			}

			// orderby
			// Default will be to order by time descending

			if(trim($this->request->query('orderby')) != "")
			{
				$legal_orderby = array('votes', 'followers', 'postTime');
				$arguments["orderby"] = trim($this->request->query('orderby'));
				if (!in_array($arguments["orderby"], $legal_orderby)){
					$error_array = array(
						"error" => "Invalid order by column",
						"desc" => "Currently only support 'votes', 'followers', 'postTime'"
					);
					$this->modelNotSetError($error_array);
				}
			}

			// searchtext
			// A string to search names of teams.

			if(trim($this->request->query('searchtext')) != "")
			{
				$arguments["searchtext"] = trim($this->request->query('searchtext'));
			}

			// loc_search
			// This will search the city, county, state of the game's location as well as the zipcode.

			if(trim($this->request->query('loc_search')) != "")
			{
				$arguments["loc_search"] = trim($this->request->query('loc_search'));
			}

			if((int)trim($this->request->query('states_id')) > 0)
			{
				$arguments["states_id"] = (int)trim($this->request->query('states_id'));
			}

			if((int)trim($this->request->query('cities_id')) > 0)
			{
				$arguments["cities_id"] = (int)trim($this->request->query('cities_id'));
			}

			if((int)trim($this->request->query('limit')) > 0)
			{
				$arguments["limit"] = (int)trim($this->request->query('limit'));
			}

			if((int)trim($this->request->query('offset')) > 0)
			{
				$arguments["offset"] = (int)trim($this->request->query('offset'));
			}

//			if((int)trim($this->request->query('teams_id')) > 0)
//			{
//				$arguments["teams_id"] = (int)trim($this->request->query('teams_id'));
//			}

			$game = ORM::factory('Sportorg_Games_Base');
			$result = $game->getSearch($arguments);

			return $result;
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
			/*
			For now, allow everyone can add game
			if(!$this->user->can('Games', array('action'=>'create', 'obj' => $this->mainModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to create",
					"desc" => "In order to create this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}*/

			$this->payloadDesc = "Add a new game";

		     // CHECK FOR PARAMETERS:
			// game_datetime 
			// The date / time of the Game
				
			if($this->request->post('game_datetime') != "")
			{
				// Format as date
				$game_datetime = $this->request->post('game_datetime');//date("Y-m-d H:i:s",strtotime($this->request->post('game_datetime')));
			}

			// locations_id 
			// Location of the game
				
			if((int)trim($this->request->post('locations_id')) > 0)
			{
				$locations_id = (int)trim($this->request->post('locations_id'));
			}

			if( trim($this->request->post('event_name')) != "")
			{
				$event_name = trim($this->request->post('event_name'));
			}

			$args = array(
				'game_datetime' => $game_datetime,
				'locations_id' => $locations_id,
				'event_name' => $event_name
			);

			$result =  $this->mainModel->addGame($args);

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
		 * action_post_addteam() Add a new team to this game
		 * via /api/game/addteam/{games_id}
		 *
		 */
		public function action_post_addteam()
		{
			$this->payloadDesc = "Add a new team to this game";

			$error_array = array(
				"error" => "Duplicate now, this function can be realized in team's add_game action",
				"desc" => "This function can be realized in team's add_game action"
			);
			$this->modelNotSetError($error_array);
			return false;
		}
		
		/**
		 * action_post_addmatch() Add a new match to this game
		 * via /api/game/addmatch/{games_id}
		 *
		 */
		public function action_post_addmatch()
		{
			$this->payloadDesc = "Add a new match to this game";

			if(trim($this->request->post('match_num')) != "")
			{
				$args['match_num'] = trim($this->request->post('match_num'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(!$this->user->can('Games', array('action'=>'addMatch', 'obj' => $this->mainModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to add game match",
					"desc" => "In order to create this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$game_match_model = ORM::factory("Sportorg_Games_Match");

			$args['games_id'] = $this->mainModel->id;
			$result = $game_match_model->addGamematch($args);
			//Check for success / error
			if(get_class($result) == get_class($game_match_model))
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
		 * action_post_addvideo() Post a new video for this game
		 * via /api/game/addvideo/{games_id}
		 *

		public function action_post_addvideo()
		{
			$this->payloadDesc = "Post a new video for this game";

		     parent::action_post_addvideo();

		}
	*/
		/**
		 * action_post_addimage() Post a new image for this game
		 * via /api/game/addimage/{games_id}
		 *

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
		 */
		/**
		 *  action_post_addcomment is in parent class
		 */

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
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(!$this->user->can('Games', array('action'=>'modify', 'obj' => $this->mainModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to modify",
					"desc" => "In order to modify this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			if($this->put('game_datetime') != "")
			{
				// Format as date
				$game_datetime = date("Y-m-d H:i:s",strtotime(urldecode($this->put('game_datetime'))));
			}
			// lodcations_id
			// Change the location of this game
				
			if((int)trim($this->put('locations_id')) > 0)
			{
				$locations_id = (int)trim($this->put('locations_id'));
			}

			if(trim($this->put('event_name')) != "")
			{
				$event_name = urldecode(trim($this->put('event_name')));
			}

			$args = array(
				'id' => $this->mainModel->id,
				'game_datetime' => $game_datetime,
				'locations_id' => $locations_id,
				'event_name' => $event_name
			);

			$result =  $this->mainModel->addGame($args);

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
		 * action_put_score() Change the score for this game for a given team
		 * via /api/game/score/{games_id}
		 *
		 */
		public function action_put_score()
		{
			$this->payloadDesc = "Change the score for this game for a given team";
			$arguments = array();
			// CHECK FOR PARAMETERS:
			// teams_id (REQUIRED)
			// Required.  The teamID for the team you are changing the score of.

			if((int)trim($this->put('teams_id')) > 0)
			{
				$arguments["teams_id"] = (int)trim($this->put('teams_id'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "teams_id",
					"param_desc" => "Required.  The teamID for the team you are changing the score of."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			// score (REQUIRED)
			// The new score for this team in this game.

			if(trim($this->put('score')) != "")
			{
				$arguments["score"] = trim($this->put('score'));
			}

			else // THIS WAS A REQUIRED PARAMETER
			{
				// Create Array for Error Data
				$error_array = array(
					"error" => "Required Parameter Missing",
					"param_name" => "score",
					"param_desc" => "The new score for this team in this game."
				);

				// Set whether it is a fatal error
				$is_fatal = true;

				// Call method to throw an error
				$this->addError($error_array,$is_fatal);
				return false;

			}

			$result =  $this->mainModel->updateScore($arguments);

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
		 * action_delete_base() Delete a Game
		 * via /api/game/base/{games_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete a Game";
			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
				return false;
			}

			if(!$this->user->can('Games', array('action'=>'delete', 'obj' => $this->mainModel))){
				$error_array = array(
					"error" => "Sorry, You don't have permission to delete",
					"desc" => "In order to delete this action, please contact your adminstrator"
				);
				$this->modelNotSetError($error_array);
				return false;
			}

			$this->mainModel->delete_with_deps();
		}
		
	}