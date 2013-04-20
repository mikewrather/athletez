<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:57 PM
 */

class Model_Sportorg_Games_Match extends ORM
{
	
	protected $_table_name = 'game_matches';
	

	protected $_belongs_to = array(
		'game' => array(
			'model' => 'Sportorg_Games_Base',
			'foreign_key' => 'games_id'
		)
	);

	protected $_has_many = array(
		'players' => array(
			'model' => 'Sportorg_Games_Matchplayer',
			'foreign_key' => 'game_matches_id'
		),
	);

	public function rules(){
		return array(
			'games_id' => array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),
		);
	}

	public function name()
	{
		return 'name';
	}

	public function getBasics()
	{
		$playerArr = array();
		foreach($this->players->find_all() as $player){
			$playerArr[$player->id] = $player->getBasics();
		}
		return array(
			"id" => $this->id,
			"games_id" => $this->games_id,
			"match_num" => $this->match_num,
			"game" => $this->game->getBasics(),
			"players" =>$this->game
		);
	}
	
	public function updateGamematch($match_num)
	{
		// match_num 
		// Change the Match Num for this match
		if ( isset($match_num))
		{
			$this->match_num = $match_num;
		}
		return $this;
	}
	public function deletePlayers()
	{		
		$players = $this->players->find();	
					
		return $players->delete();
	}
	
	public function getPlayers( $positions_id = "" )
	{
		$players = $this->players;
		$result = null;
		if ( isset($positions_id) && inval($positions_id) > 0)
		{
			$result = $players->join('users_teams_link')->on('users_teams_link.users_id', '=', 'sportorg_games_matchplayer.users_id')
							->join('utl_position_link')->on('utl_position_link.users_teams_link_id', '=', 'users_teams_link.id')
							->join('positions')->on('positions.id','=', 'utl_position_link.positions_id')
							->where('positions.id', '=', $positions_id);		 			 
		} else {
			$result = $players;		
		}
		 
		return $result;
	}
}