<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Links the user/team linking table to positions
 *
 * Date: 2/18/13
 * Time: 3:01 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Teamslink_Positionlink extends ORM
{
	
	protected $_table_name = 'utl_position_link';



	protected $_belongs_to = array(
		'utl' => array(
			'model' => 'User_Teamslink',
			'foreign_key' => 'users_teams_link_id'
		),
		'position' => array(
			'model' => 'Sportorg_Position',
			'foreign_key' => 'positions_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function savePositionLink($args){
		extract($args);
		if (isset($users_teams_link_id)){
			$this->users_teams_link_id = $users_teams_link_id;
		}

		if (isset($positions_id)){
			$this->positions_id = $positions_id;
		}

		try{
			$external_validate = Validation::factory($args);
			$external_validate->rule('users_teams_link_id','utl_position_link_exist', array($users_teams_link_id, $positions_id));
			$external_validate->rule('positions_id', 'positions_id_exist');
			if ($this->check($external_validate)){
				$this->save();
			}
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"utl" => $this->utl->getBasics(),
			"position" => $this->position->getBasics(),
			"users_teams_link_id" => $this->users_teams_link_id,
			"positions_id" => $this->positions_id
		);
	}

}