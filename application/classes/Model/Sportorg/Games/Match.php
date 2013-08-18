<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:57 PM
 */

class Model_Sportorg_Games_Match extends ORM
{
	
	protected $_table_name = 'game_matches';

	public $error_message_path = 'models/sportorg/games';

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
			'match_num' => array(
				array('not_empty')
			),
			'games_id' => array(
				array('not_empty'),
				array('games_id_exist')
			),
		);
	}

	public function name()
	{
		return 'name';
	}

	public function getBasics($settings = array())
	{
		$playerArr = null;
		foreach($this->players->find_all() as $player){
			$playerArr[] = $player->getBasics();
		}
		return array(
			"id" => $this->id,
			"games_id" => $this->games_id,
			"match_num" => $this->match_num,
			"game" => $this->game->getBasics(),
			"players" => $playerArr
		);
	}

	public function addGamematch($args = array())
	{
		extract($args);
		if ( isset($games_id))
		{
			$this->games_id = $games_id;
		}

		if ( isset($match_num))
		{
			$this->match_num = $match_num;
		}

		try{
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public function updateGamematch($args = array())
	{
		extract($args);
		if ( isset($id))
		{
			$this->id = $id;
		}

		if ( isset($match_num))
		{
			$this->match_num = $match_num;
		}
		try{
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public function deletePlayers($args = array())
	{
		extract($args);
		$match_players = ORM::factory('Sportorg_Games_Matchplayer');
		$match_players->where('game_matches_id', '=', $id);
		$result = $match_players->where('users_id', '=', $users_id)->find();
		if (!$result->id){
			return false;
		}else{

			$match_players = ORM::factory('Sportorg_Games_Matchplayer', $result->id);
			$match_players->delete_with_deps();
			return true;
		}
	}
	
	public function getPlayers( $positions_id = "" )
	{
		$players = $this->players;
		$result = null;
		if ( isset($positions_id) && intval($positions_id) > 0)
		{
			$result = $players->join('users_teams_link')->on('users_teams_link.users_id', '=', 'sportorg_games_matchplayer.users_id')
							->join('utl_position_link')->on('utl_position_link.users_teams_link_id', '=', 'users_teams_link.id')
							->join('positions')->on('positions.id','=', 'utl_position_link.positions_id')
							->where('positions.id', '=', $positions_id);
			$classes_arr['User_Teamslink'] = 'users_teams_link';
			$classes_arr['User_Teamslink_Positionlink'] = 'utl_position_link';
			$classes_arr['Sportorg_Position'] = 'positions';
		} else {
			$result = $players;		
		}
		//exclude itself
		$classes_arr['Sportorg_Games_Matchplayer'] = 'sportorg_games_matchplayer';
		$result = ORM::_sql_exclude_deleted($classes_arr, $result);
		return $result;
	}
}