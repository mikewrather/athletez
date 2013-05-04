<?php defined('SYSPATH') or die('No direct script access.');

class Policy_Games extends Policy
{

	public function execute(Model_ACL_User $user, array $extra = NULL)
	{
		$config = Kohana::$config->load('sysconfig');
		$roles = $config->get('role_name');
		$has_admin = $user->has('roles', ORM::factory('Role', array('name' => $roles['admin'])));
		$has_user = $user->has('roles', ORM::factory('Role', array('name' => $roles['user'])));
		$has_coach = $user->has('roles', ORM::factory('Role', array('name' => $roles['coach'])));
		$has_moderator = $user->has('roles', ORM::factory('Role', array('name' => $roles['moderator'])));
		$have_permission = false;
		if(isset($extra["action"]))
		{
			switch($extra["action"])
			{
				case 'read':
					break;
				case 'create':
					if($has_admin || $has_user || $has_coach){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'modify':
					if($has_admin || $has_user || $has_coach){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'delete':
					if($has_admin || $has_moderator){
						$have_permission = true;
					}
					return $have_permission;
					break;
				default;
					return false;
					break;
			}
		}
		//default no policy check
		return true;
	}
}