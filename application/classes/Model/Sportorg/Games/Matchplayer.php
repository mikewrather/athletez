<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:58 PM
 */

class Model_Sportorg_Games_Matchplayer extends ORM
{
	
	protected $_table_name = 'game_match_players';

	public $error_message_path = 'models/sportorg/games';

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

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'users_obj' => 'user',
			//'game_matches_obj' => 'game_match'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function getBasics($settings = array())
	{
//		return array(
//			"id" => $this->id,
//			"users_id" => $this->users_id,
//			"game_matches_id" => $this->game_matches_id,
//			"points_awarded" => $this->points_awarded,
//			"result_time" => $this->result_time,
//			//TODO, add by Jeffrey.Need upadate after align with Mike "game_matches" => $this->game_matches->getBasics(),
//			//"user" => $this->user->getBasics(),
//			"match_winner" => $this->match_winner
//		);

		return parent::getBasics($settings);
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
				array('users_id_exist')
			),
			/*
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
			*/
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

	}

	public function addPlayer($args = array()){
		extract($args);
		if (isset($points_awarded)){
			$this->points_awarded = $points_awarded;
		}

		if (isset($match_winner)){
			$this->match_winner = $match_winner;
		}

		if (isset($points_awarded)){
			$this->points_awarded = $points_awarded;
		}

		if (isset($users_id)){
			$this->users_id = $users_id;
		}

		if (isset($game_matches_id)){
			$this->game_matches_id = $game_matches_id;
		}

		if (isset($result_time)){
			$this->result_time = $result_time;
		}

		try{
			$this->save();
			return $this;
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

}