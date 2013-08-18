<?php defined('SYSPATH') or die('No direct script access.');
/**
 * USL or User Sport Link links up users with sports for sports that don't involve teams
 *
 * Date: 2/6/13
 * Time: 12:59 PM
 *
 * @author mike
 */

class Model_User_Sportlink extends ORM
{
	
	protected $_table_name = 'user_sport_link';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		)
	);

	protected $_has_many = array(
		'gamelinks' => array(
			'model' => 'User_Sporlink_Gamelink',
			'foreign_key' => 'user_sport_link_id'
		),
		'games' => array(
			'model' => 'Sportorg_Game_Base',
			'through' => 'usl_game_link',
			'foreign_key' => 'user_sport_link_id',
			'far_key' => 'games_id'
		)
	);
	public function getBasics($settings = array())
	{
		return array(
			"id" => $this->id,
			"user" => $this->user->getBasics(),
			"sport" => $this->sport->getBasics(),
			"sports_id" => $this->sports_id,
			"users_id" => $this->users_id,				
		);
	}

	function addSport($args = array()){
		extract($args);
		if(isset($sports_id)){
			$this->sports_id = $sports_id;
		}

		if(isset($users_id)){
			$this->users_id = $users_id;
		}

		try {

			$external_validate = Validation::factory($args);
			$external_validate->rule('users_id', 'users_sports_exist', array($users_id, $sports_id));
			$external_validate->rule('sports_id', 'sports_id_exist');
			if ($this->check($external_validate))
				$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getId($users_id, $sports_id){
		$usl_model = ORM::factory("User_Sportlink");
		$usl_model->select("id")
			->where('sports_id', '=', $sports_id)
			->and_where('users_id', '=', $users_id)
			->find();
		if ($usl_model->loaded()){
			return $usl_model->id;
		}
		return null;
	}

}