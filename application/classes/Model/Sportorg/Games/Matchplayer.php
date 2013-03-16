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
			'model' => 'User',
			'foreign_key' => 'users_id'
		),
		'gamematch' => array(
			'model' => 'Sportorg_Game_Match',
			'foreign_key' => 'game_matches_id'
		)
	);

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"points_awarded" => $this->points_awarded,			
			"result_time" => $this->result_time,
			"gamematch" => $this->team->getBasics(),
			"user" => $this->user->gamematch(),
			"match_winnder" => $this->match_winner
		);
	}
}