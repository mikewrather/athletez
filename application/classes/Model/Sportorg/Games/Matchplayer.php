<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:58 PM
 */

class Model_Sportorg_Games_Matchplayer extends ORM
{
	
	protected $_table_name = 'game_match_players';

	public $error_message_path = 'models/sportorg/games/sportorg_games_matchplayer';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'game_matches' => array(
			'model' => 'Sportorg_Games_Match',
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
			"match_winner" => $this->match_winner
		);
	}
	
	public function name()
	{
		return null;
	}

	public function rules(){

		return array
		(
			// game_matches_id (int)
			'game_matches_id'=>array(
				array('not_empty'),
				array('digit'),
				array('game_match_id_exist')
			),

			// users_id (int)
			'users_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),

			// points_awarded (int)
			'points_awarded'=>array(
				array('digit'),
			),

			// result_time (varchar)
			'result_time'=>array(
				array('not_empty'),
			),

			// match_winner (tinyint)
			'match_winner'=>array(
				array('not_empty'),
				array('in_array', array(':value', array(0, 1))),
			),
		);
	}

	public function updateGameMatchPlayer($args = array()){
		extract($args);

		if(isset($points_awarded))
		{
			$this->points_awarded = $points_awarded;
		}

		if(isset($match_winner))
		{
			$this->match_winner = $match_winner;
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