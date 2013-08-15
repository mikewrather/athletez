<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Extends module class and sets table to roles
 *
 * Date: 3/29/13
 * Time: 7:24 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Rolesusers extends ORM
{
	protected $_table_name = 'roles_users';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'role' => array(
			'model' => 'Role',
			'foreign_key' => 'roles_id'
		)
	);

	public function rules(){
		return array();
	}

	function addRole($args = array()){
		extract($args);
		if(isset($roles_id))
		{
			$this->roles_id = $roles_id;
		}

		if(isset($users_id))
		{
			$this->users_id = $users_id;
		}

		try{
			$external_validate = Validation::factory($args);
			$external_validate->rule('users_id', 'roles_users_exist', array($users_id, $roles_id));
			if ($this->check($external_validate))
				$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}
}