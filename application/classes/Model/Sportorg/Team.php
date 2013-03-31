<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:49 PM
 */

class Model_Sportorg_Team extends ORM
{

	protected $_table_name = 'teams';


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
			'model' => 'Users',
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
//			'org_sport_link_id' => array(
//				array('not_empty')
//			),
//			'sports_id' => array(
//				array('not_empty')
//			),
			'seasons_id' => array(
				array('not_empty')
			),
			'complevels_id' => array(
				array('not_empty')
			),
			'year' => array(
				array('not_empty'),
				array('digit'),
				array('exact_length', array(':value', 4)),
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

	//Custom Validation
	public static function not_equals($value, $null_value)
	{
		if ($value == ""){
			return false;
		}
		return ($value != $null_value);
	}

	//Custom Validation
	public static function check_org_sport_id_exist($org_sport_id){
		$org_sport_link_model = ORM::factory("Sportorg_Orgsportlink");
		$org_sport_link_model->select("id")
			->where('id', '=', $org_sport_id)
			->find();
		if ($org_sport_link_model->loaded()){
			return true;
		}
		return false;
	}


}