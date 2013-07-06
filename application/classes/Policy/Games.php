<?php defined('SYSPATH') or die('No direct script access.');

class Policy_Games extends Policy
{

	public function execute(Model_ACL_User $user, array $extra = NULL)
	{
		$config = Kohana::$config->load('sysconfig');
		$roles = $config->get('role_name');
		$has_admin = $user->has('roles', ORM::factory('Role', array('name' => $roles['admin'])));
		//$has_user = $user->has('roles', ORM::factory('Role', array('name' => $roles['user'])));
		//$has_coach = $user->has('roles', ORM::factory('Role', array('name' => $roles['coach'])));
		//$has_moderator = $user->has('roles', ORM::factory('Role', array('name' => $roles['moderator'])));
		$obj = $extra['obj'];
		$is_follower = Ent::is_follower($obj);
		$is_team_member = false;
		$teams = $obj->getTeams()->result;
		//print_r($teams);
		$user_model = ORM::factory("User_Base");

		foreach($teams as $team){
			if($user_model->is_member_of_team($user->id, $team->id)){
				$is_team_member = true;
				break;
			}
		}

		$have_permission = false;
		if(isset($extra["action"]))
		{
			switch($extra["action"])
			{
				case 'read':
					break;
				case 'create':
					if($has_admin || $is_team_member){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'modify':
					//TODO, add by Jeffrey, maybe we need add coach later
					if($has_admin || ( $is_follower || $is_team_member )){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'delete':
					if($has_admin || $is_team_member){
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