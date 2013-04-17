<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:49 PM
 */

class Model_Sportorg_Team extends ORM
{

	protected $_table_name = 'teams';
	//protected $_table_columns = array('id','org_sport_link_id', 'complevels_id','seasons_id','year','mascot','unique_ident','orgs_id','sports_id');
	public $error_message_path = 'models/sportorg/seasons';

	protected $_belongs_to = array(
		'org_sport_link' => array(
			'model' => 'Sportorg_Orgsportlink',
			'foreign_key' => 'org_sport_link_id'
		),
		'complevel' => array(
			'model' => 'Sportorg_Complevel_Base',
			'foreign_key' => 'complevels_id'
		),
		'season' => array(
			'model' => 'Sportorg_Seasons_Base',
			'foreign_key' => 'seasons_id'
		)
	);

	protected $_has_many = array(
		// To get the games without any of the data in the linking table use this
		'games' => array(
			'model' => 'Sportorg_Games_Base',
			'through' => 'games_teams_link',
			'foreign_key' => 'teams_id',
			'far_key' => 'games_id'
		),
		// This is the link object where the score is kept
		'teamgames' => array(
			'model' => 'Sportorg_Games_Teamslink',
			'foreign_key' => 'teams_id',
		),
		'athletes' => array(
			'model' => 'User_Base',
			'through' => 'users_teams_link'
		),
		
		// StatVals
		'statvals' => array(
			'model' => 'Stats_Vals',
			'foreign_key' => 'teams_id',
		),
	);

	public function rules()
	{
		return array(
			'seasons_id' => array(
				array('not_equals', array(':value', 0))
			),
			'complevels_id' => array(
				array('not_equals', array(':value', 0))
			),
			'year' => array(
				array('not_empty'),
				array('digit'),
				array('exact_length', array(':value', 4)),
			),
			'mascot' => array(
				array('alpha')
			),
			'unique_ident' => array(
				array('alpha')
			)
		);
	}

	public function getOrg()
	{		
		return $this->org_sport_link->org;
	}
	
	public function getSeason()
	{
		return $this->season;
	}
	public function getSport()
	{
		return $this->org_sport_link->sport;
	}

	public function addTeam($post_values = array()){
		extract($post_values);
		if (isset($org_sport_link_id))
			$this->org_sport_link_id = $org_sport_link_id;

		if (isset($complevels_id))
			$this->complevels_id = $complevels_id;

		if (isset($seasons_id))
			$this->seasons_id = $seasons_id;

		if (isset($year))
			$this->year = $year;

		if (isset($mascot))
			$this->mascot = $mascot;

		if (isset($unique_ident))
			$this->unique_ident = $unique_ident;

		if (!isset($orgs_id))
			$post_values['orgs_id'] = 0;

		if (!isset($sports_id))
			$post_values['sports_id'] = 0;

		if ($org_sport_link_id == ""){
			$external_validate = Validation::factory($post_values)
				->rule('orgs_id', 'not_equals', array(':value', 0))
				->rule('sports_id', 'not_equals', array(':value', 0));
			//if check pass,add org_id,sports_id to db,generate org_sport_id for use
			if ($external_validate->check()){
				//check org_sport in db.
				$org_sport_link_model = ORM::factory("Sportorg_Orgsportlink");
				$result = $org_sport_link_model->getOrgSportId($orgs_id, $sports_id);
				if(!$result->loaded())
				{
					unset($org_sport_link_model);
					$org_sport_link_model = ORM::factory("Sportorg_Orgsportlink");
					//Insert new row to org_sport_link
					$org_sport_link_model->orgs_id = $orgs_id;//already extracted
					$org_sport_link_model->sports_id = $sports_id;//already extracted
					$org_sport_link_model->save();
					$org_sport_pk = $org_sport_link_model->pk();
					$this->org_sport_link_id = $org_sport_pk;
				}else{
					$this->org_sport_link_id = $result->id;
				}
			}
		}else{
			$external_validate = Validation::factory($this->as_array())
				->rule('org_sport_link_id', 'check_org_sport_id_exist');
		}

		try {
			$this->save($external_validate);
			return $this;
		} catch(ORM_Validation_Exception $e){
				return $e;
		}
	}

	public function addGame($args = array()){
		extract($args);
		if (isset($game_datetime)){
			if ($game_datetime == ""){
			}else{
				$arr = explode(" " ,$game_datetime);
				$gameDay = $arr[0];
				$gameTime = $arr[1];
			}
		}
		$games_teams_link = ORM::factory("Sportorg_Games_Teamslink");
		try {
			if ($games_id == ""){
				$games_model = ORM::factory("Sportorg_Games_Base");
				$games_model->gameDay = $gameDay;
				$games_model->gameTime = $gameTime;
				$games_model->locations_id = $locations_id;
				$games_model->save();

				$new_games_id = $games_model->pk();
					$games_teams_link->teams_id = $teams_id;
					$games_teams_link->games_id = $new_games_id;
					$games_teams_link->is_home_team = $is_home_team;
					$games_teams_link->tournaments_id = $tournaments_id;
					$games_teams_link->save();

			}else{

				if (!$games_teams_link->check_combine_primary_key_exist($teams_id, $games_id)){
					unset($games_teams_link);
					$games_teams_link = ORM::factory("Sportorg_Games_Teamslink");
					$games_teams_link->teams_id = $teams_id;
					$games_teams_link->games_id = $games_id;
					$games_teams_link->is_home_team = $is_home_team;
					$games_teams_link->tournaments_id = $tournaments_id;
					$games_teams_link->save();
				}else{
					//Nothing to do
					echo "Duplicato now";
				}
			}
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}
		
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"org_sport_link" => $this->org_sport_link->getBasics(),
			"org_sport_link_id" => $this->org_sport_link_id,
			"complevel" => $this->complevel->getBasics(),
			"complevels_id" => $this->complevels_id,
			"season" => $this->season->getBasics(),
			"seasons_id" => $this->seasons_id,
			"year" => $this->year,
			"mascot" => $this->mascot,
			"unique_ident" => $this->unique_ident,
		);
	}

	public function name()
	{
		$title = "";
		$title .= $this->getOrg()->name;
		$title .= " ".$this->getSport()->name;
		$title .= " ".$this->season->name;
		$title .= " ".$this->year;
		return $title;
	}

	public function getLocation()
	{
		$org = $this->getOrg();
		return $org->location;
	}
	
	/**
	 * @param array $args is an array of parameters to filter the games we are selecting
	 * @return $games DB::select object
	 */
	public function getGames($args = array())
	{
		extract($args);
		$games = $this->games;
		// CHECK FOR PARAMETERS:
		// games_before
		// Filter games associated with a given city to only show those before a given date

		if(isset($games_before))
		{
			// Format as date
			$gameDay = date("Y-m-d",strtotime($games_before));
			$gameTime = date("H:i:s",strtotime($games_before));

			$games
				->and_where_open()
				->where('gameDay','<',$gameDay)
			//	->and_where('gameTime','<',$gameTime)
				->and_where_close();
		}
		
		
		// games_after
		// Filter games associated with a given city to only show those before a given date
		if(isset($games_after))
		{
			// Format as date
			$gameDay = date("Y-m-d",strtotime($games_after));
			$gameTime = date("H:i:s",strtotime($games_after));

			$games
				->and_where_open()
				->where('gameDay','>',$gameDay)
			//	->and_where('gameTime','>',$gameTime)
				->and_where_close();
		}
		
		// isWinner
		if(isset($isWinner))
		{
			$games->where('games_teams_link.isWinner', '=', $isWinner);
		}
		
		return $games;
	}
	
	public function getRoster($args = array())
	{
		extract($args);		
		// positions_id
		// Filter the roster of a given team to only show those players for a certain position
		if ( isset($positions_id) )
		{
			// get user_teams_link
			$user_teams_link_obj = ORM::factory('User_Teamslink')
				->join('teams')->on('teams.id', '=', 'user_teamslink.teams_id' )
				->join('utl_position_link')->on('utl_position_link.users_teams_link_id','=', 'user_teamslink.id')
					->where('teams.id', '=', $this->id )
					->and_where('utl_position_link.positions_id','=', $positions_id );
		} else {
			$user_teams_link_obj = ORM::factory('User_Teamslink')
				->join('teams')->on('teams.id', '=', 'user_teamslink.teams_id' )				
					->where('teams.id', '=', $this->id );
		}
		 
		return $user_teams_link_obj;
		
	}
	
	public function getSchedule($count = NULL, $past_games = false )
	{ 
		 if(!$this->loaded()) return false;
		 
		 // get game list		 
	 	 $game_list_obj = ORM::factory('Sportorg_Games_Base')
		 	->select('*', 'games_teams_link.*')				
			->join('games_teams_link')
				->on('games_teams_link.games_id','=','sportorg_games_base.id')		
			->where('games_teams_link.teams_id', '=', $this->id );
		
		$game_list_obj->where_open();
		$game_list_obj->where('sportorg_games_base.id','>','0'); //This is added to solve an error of AND () if no params are provided
		// if the user setted the number of games to return,
		if( isset($count))
		{
			$game_list_obj->limit($count);
		}
		
		// if the user wanted to get the past games,
		if( $past_games )
		{
			// Format as date
			$gameDay = date("Y-m-d");
			$game_list_obj
				->and_where_open()
				->where('gameDay','>',$gameDay)		
				->and_where_close();
		}		
		$game_list_obj->where_close();		
		return $game_list_obj->find_all();
	}

	public function deleteGamelink()
	{
		$game_link_obj = DB::delete('games_teams_link')->where('teams_id','=', $this->id)->execute();
		return $game_link_obj;
	}
	
	public function updateGamelink($args = array() )
	{
		extract($args);
		$game_link_obj = ORM::factory('Sportorg_Games_Teamslink')->where('teams_id','=', $this->id)->find();
			
			
		// points_scored 
		// Change the number of points scored for this team in this game
		if(isset($points_scored))
		{
			$game_link_obj->points_scored = $points_scored;
		}
		 
		// points_against 
		// Change the number of points scored against this team / game
		if(isset($points_against))
		{
			$game_link_obj->points_against = $points_against;
		}
		
		// isWinner 
		// Update whether this team won this game
		if(isset($isWinner))
		{
			$game_link_obj->isWinner = $isWinner;
		}
		
		// is_home_team 
		// Update whether this is the home team for this game
		if(isset($is_home_team))
		{
			$game_link_obj->is_home_team = $is_home_team;
		}	
		
		return $game_link_obj;


	}
	
	public function updateTeam($args = array())
	{
		extract($args);
		// complevels_id 
		// Competition Level ID
		if(isset($complevels_id))
		{
			$this->complevels_id = $complevels_id;
		}
		
		// seasons_id 
		// Update the Season ID
		if(isset($seasons_id))
		{
			$this->seasons_id = $seasons_id;
		}
			
		// year 
		// Change the year of this team
		if(isset($year))
		{
			$this->year = $year;
		}
	 	 
		// mascot 
		// Change the mascot of this team
		if(isset($mascot))
		{
			$this->mascot = $mascot;
		}
		
		// unique_ident 
		// Change the Unique Identifier for this team
		if(isset($unique_ident))
		{
			$this->unique_ident = $unique_ident;
		}

		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
		return $this;
	}
}