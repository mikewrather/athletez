<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:58 PM
 */

class Model_Sportorg_Games_Matchplayer extends ORM
{
	
	protected $_table_name = 'game_match_players';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'game_matches' => array(
			'model' => 'Sportorg_Game_Match',
			'foreign_key' => 'game_matches_id'
		)
	);

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"users_id" => $this->users_id,
			"game_matches_id" => $this->game_matches_id,
			"points_awarded" => $this->points_awarded,			
			"result_time" => $this->result_time,
			"game_matches" => $this->game_matches->getBasics(),
			"user" => $this->user->getBasics(),
			"match_winnder" => $this->match_winner
		);
	}
}