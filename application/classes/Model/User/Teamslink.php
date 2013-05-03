<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 1:02 PM
 */

class Model_User_Teamslink extends ORM
{
	protected $_table_name = 'users_teams_link';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'team' => array(
			'model' => 'Sportorg_Team',
			'foreign_key' => 'teams_id'
		)
	);

	protected $_has_many = array(
		'positions' => array(
			'model' => 'Sportorg_Position',
			'through' => 'utl_position_link',
			'foreign_key' => 'users_teams_link_id',
			'far_key' => 'positions_id'
		)
	);

	public function rules(){
		return array
		(
			'teams_id'=>array(
				array('not_empty'),
				array('teams_id_exist')
			),

			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist')
			),
		);
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"user" => $this->user->getBasics(),
			"team" => $this->team->getBasics(),
			"teams_id" => $this->teams_id,
			"users_id" => $this->users_id
		);
	}

	public function getPositionByUserteamslinkid($user_teams_link_id){
		$utpl = ORM::factory("User_Teamslink_Positionlink");
		$model = $utpl->where('users_teams_link_id', '=', $user_teams_link_id)->find();
		if ($model->loaded()){
			return $model->position->name;
		}
		return null;
	}

	public function check_user_teams_link_exist($user_id, $teams_id, &$return_id = ""){
		$teams_link_obj = ORM::factory('User_Teamslink')->where('teams_id','=',$teams_id)->and_where('users_id', '=', $user_id);
		$teams_link  = $teams_link_obj->find();
		if ($teams_link->loaded()){
			$return_id = $teams_link->id;
			return true;
		}
		return false;
	}

	public function addPlayer($args = array()){
		extract($args);
		if (isset($teams_id))
			$this->teams_id = $teams_id;
		if (isset($users_id))
			$this->users_id = $users_id;
		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
		return $this;
	}

}