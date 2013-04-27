<?php defined('SYSPATH') or die('No direct script access.');

class Policy_OrgContent extends Policy
{

	public function execute(Model_ACL_User $user, array $extra = NULL)
	{
		//TODO,added by Jeffrey, Here to get all the operation rules from DB,like user A can do (add, modify, delete,read.etc)
		if($user->has('roles', ORM::factory('Role', array('name' => 'moderator')))){
		//if($user->has('roles', 3)){
			return true;
		}
		return false;
	}
}