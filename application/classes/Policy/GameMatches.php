<?php defined('SYSPATH') or die('No direct script access.');

class Policy_GameMatches extends Policy
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
		if (get_class($obj) == 'Model_Sportorg_Games_Match'){
			$mainModel = $obj->game;
		}
		if (get_class($obj) == 'Model_Sportorg_Games_Base'){
			$mainModel = $obj;
		}

		$is_follower = false;
		$is_team_member = false;
		$teams = $mainModel->getTeams()->result;

		$user_model = ORM::factory("User_Base");

		if (!empty($teams)){
			//divide it into 2 loops to avoid bugs
			foreach($teams as $team){
				$teamModel = ORM::factory('Sportorg_Team', $team->id);
				$is_follower = Ent::is_follower($teamModel);
				if ($is_follower){
					break;
				}
			}
			//divide it into 2 loops to avoid bugs
			foreach($teams as $team){
				if($user_model->is_member_of_team($user->id, $team->id)){
					$is_team_member = true;
					break;
				}
			}
		}

		$have_permission = false;
		if(isset($extra["action"]))
		{
			switch($extra["action"])
			{
//				case 'read':
//					break;
				case 'create':
					if($has_admin || $is_team_member || $is_follower){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'modify':
					if($has_admin || $is_team_member || $is_follower){
						$have_permission = true;
					}
					return $have_permission;
				case 'delete':
					if($has_admin || $is_team_member || $is_follower){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'addPlayer':
					if($has_admin || $is_team_member || $is_follower){
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