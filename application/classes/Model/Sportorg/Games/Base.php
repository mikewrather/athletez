<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:56 PM
 */

class Model_Sportorg_Games_Base extends ORM
{
	
	protected $_table_name = 'games';
	public $error_message_path = 'models/sportorg/games';
	protected $_belongs_to = array
	(
		'location' => array(
			'model' => 'Location_Base',
			'foreign_key' => 'locations_id'
		),
	);
	
	protected $_has_many = array
	(
		'matches' => array(
			'model' => 'Sportorg_Games_Match',
			'foreign_key' => 'games_id'
		),
		'teams' => array(
			'model' => 'Sportorg_Team',
			'through' => 'games_teams_link',
			'foreign_key' => 'games_id',
			'far_key' => 'teams_id'
		),
		'uslgamelink' => array(
			'model' => 'User_Sportlink_Gamelink',
			'foreign_key' => 'games_id'
		)
	);

	public function rules(){

		return array
		(

			// gameDay (date)
			'gameDay'=>array(
				//array('not_empty'),
			),

			// gameTime (time)
			'gameTime'=>array(
				//array('not_empty'),
			),

			// locations_id (int)
			'locations_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),
		);
	}

	public function addGame($args = array()){
		extract($args);

		if (isset($id) && $id != ""){
			$this->id = $id;
		}

		if (isset($locations_id))
			$this->locations_id = $locations_id;

		try {
			$external_validate = Validation::factory(array('game_datetime' => $game_datetime));
			$external_validate->rule("game_datetime", 'not_empty');
			$external_validate->rule("game_datetime", 'correct_date_format');
			if ($this->check($external_validate)){
				$arr = explode(' ', $game_datetime);
				$gameDay = $arr[0];
				$gameTime = $arr[1];
				$this->gameDay = $gameDay;
				//$args['gameDay'] = $gameDay;
				$this->gameTime = $gameTime;
			}

			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"locations_id" => $this->locations_id,
			"location" => $this->location->getBasics(),
			"gameDay" => $this->gameDay,
			"gameTime" => $this->gameTime,
			"teams" => $this->teams,
		);
	}

	public function name()
	{
		$name = "";
		$teams = $this->teams->find_all();
		foreach($teams as $team)
		{
			$name .= $team->name().", ";
		}
		return rtrim($name,', ');
	}

	public function getTeams(){
		$teams = $this->teams;
		return $teams;
	}

	public function getLocation(){
		$location = $this->location;
		return $location;
	}

	public function getMatches(){
		$matches = $this->matches;
		return $matches;
	}
}