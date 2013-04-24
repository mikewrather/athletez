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