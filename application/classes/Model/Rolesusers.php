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
		if(isset($role_id))
		{
			$this->role_id = $role_id;
		}

		if(isset($user_id))
		{
			$this->user_id = $user_id;
		}

		try{
			$external_validate = Validation::factory($args);
			$external_validate->rule('user_id', 'roles_users_exist', array($user_id, $role_id));
			if ($this->check($external_validate))
				$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}
}