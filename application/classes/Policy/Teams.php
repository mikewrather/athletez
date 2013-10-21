<?php defined('SYSPATH') or die('No direct script access.');

class Policy_Teams extends Policy
{

	public function execute(Model_ACL_User $user, array $extra = NULL)
	{
		$config = Kohana::$config->load('sysconfig');
		$roles = $config->get('role_name');
		$has_admin = $user->has('roles', ORM::factory('Role', array('name' => $roles['admin'])));
		$has_user = $user->has('roles', ORM::factory('Role', array('name' => $roles['user'])));
		//$has_coach = $user->has('roles', ORM::factory('Role', array('name' => $roles['coach'])));
		$has_moderator = $user->has('roles', ORM::factory('Role', array('name' => $roles['moderator'])));
		$obj = $extra['obj'];
		$is_follower = false;
		$is_team_member = false;

		$user_model = ORM::factory("User_Base");
		$is_follower = Ent::is_follower($obj);
		if ($is_follower){
			$is_follower = true;
		}

		if($user_model->is_member_of_team($user->id, $obj->id)){
			$is_team_member = true;
		}

		$have_permission = false;
		if(isset($extra["action"]))
		{
			switch($extra["action"])

			{
				case 'addGame':
					if($has_admin || $is_team_member || $has_user){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'read':
					break;
				case 'create':
//					if($has_admin || $is_team_member){
//						$have_permission = true;
//					}
//					return $have_permission;
					break;
				case 'modify':
					if($has_admin || $is_follower || $is_team_member || $has_user){
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
				case 'deleteGameLink':
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