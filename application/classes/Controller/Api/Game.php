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
			return $video_model->getTagedVideos($this->mainModel);
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
			return $image_model->getTagedImages($this->mainModel);
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
				$arguments["orderby"] = trim($this->request->query('orderby'));
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

			$args = array(
				'game_datetime' => $game_datetime,
				'locations_id' => $locations_id
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
				"error" => "This function can be realized in team's add_game action",
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

		     // CHECK FOR PARAMETERS:
			// match_num 
			// A number or unique identifier for the match (can be 1st, Last, or any string)
				
			if(trim($this->request->post('match_num')) != "")
			{
				$args['match_num'] = trim($this->request->post('match_num'));
			}

			if(!$this->mainModel->id)
			{
				$this->modelNotSetError();
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

			$args = array(
				'id' => $this->mainModel->id,
				'game_datetime' => $game_datetime,
				'locations_id' => $locations_id
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

			return $this->mainModel->delete();
		}
		
	}