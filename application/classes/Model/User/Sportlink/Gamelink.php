<?php defined('SYSPATH') or die('No direct script access.');
/**
 * USL Game Link links the user/sport link to specific game events
 *
 * Date: 2/17/13
 * Time: 2:22 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Sportlink_Gamelink extends ORM
{
	
	protected $_table_name = 'usl_game_link';

	public $error_message_path = 'models/user/sportlink';

	protected $_belongs_to = array(
		'usl' => array(
			'model' => 'User_Sportlink',
			'foreign_key' => 'user_sport_link_id'
		),
		'game' => array(
			'model' => 'Sportorg_Games_Base',
			'foreign_key' => 'games_id'
		)
	);

	public function rules(){
		return array(
			'result_time' => array(
				array('valid_time')
			),
			'result_place' => array(
				array('numeric')
			)
		);
	}

	public function addUslGamesLink($args = array()){
		extract($args);
		//$this->users_id = $users_id;
		$this->games_id = $games_id;

		if(!isset($sports_id)) $sports_id = $this->game->sports_id;
		$post_values = array('users_id' => $users_id, 'sports_id' => $sports_id);

		$this->result_place = $result_place;
		$this->bib_number = $bib_number;
		$this->result_time = $result_time;

		$usl_model = ORM::factory("User_Sportlink");
		$user_sport_link_id = $usl_model->getId($users_id, $sports_id,true);
		$this->user_sport_link_id = $user_sport_link_id;

		try
		{
			$external_validate = Validation::factory($post_values)
				->rule('users_id', 'users_id_exist')
				->rule('sports_id', 'sports_id_exist')
				->rule('sports_id', 'user_sport_link_exist', array($users_id, $sports_id));
			//if check pass,add org_id,sports_id to db,generate org_sport_id for use
			if ($this->check($external_validate))
			{
				$valid_array = array('games_id' => $games_id, 'user_sport_link_id' => $user_sport_link_id);
				$external_validate_games = Validation::factory($valid_array);
				$external_validate_games
					->rule('games_id', 'games_id_exist');
				//	->rule('user_sport_link_id', 'uslgamelink_link_not_exist', array($user_sport_link_id, $games_id));
				if ($this->check($external_validate_games))
				{
					$follow = ORM::factory('User_Followers');
					$follow->addFollower(ORM::factory('User_Base',$users_id),ORM::factory('Sportorg_Games_Base',$games_id),false,"you're participating in this event.");

					if(Valid::uslgamelink_link_not_exist($user_sport_link_id, $games_id)) $this->save();
					else
					{
						return ORM::factory('User_Sportlink_Gamelink')
							->where('user_sport_link_id','=',$user_sport_link_id)
							->where('games_id','=',$games_id)
							->find();
					}

					return $this;
				}

			}

		} catch (ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public function getBasics($settings = array())
	{
		return array(
			"id" => $this->id,
			"usl" => $this->usl->getBasics(),
			"game" => $this->game->getBasics(),
			"result_time" => $this->result_time,
			//"isWinner" => $this->isWinner,
			"games_id" => $this->games_id,
			"user_sport_link_id" => $this->user_sport_link_id
		);
	}

	public function name(){
		return null;
	}

}