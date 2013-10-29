<?php defined('SYSPATH') or die('No direct script access.');

class Policy_Games extends Policy
{

	public function execute(Model_ACL_User $user, array $extra = NULL)
	{
		$config = Kohana::$config->load('sysconfig');
		$roles = $config->get('role_name');
		$has_admin = $user->has('roles', ORM::factory('Role', array('id' =>2)));
		$has_user = $user->has('roles', ORM::factory('Role', array('id' => 1)));
		//$has_coach = $user->has('roles', ORM::factory('Role', array('name' => $roles['coach'])));
		//$has_moderator = $user->has('roles', ORM::factory('Role', array('name' => $roles['moderator'])));
		$obj = $extra['obj'];
		$is_follower = false;
		$is_team_member = false;
		if (!isset($extra['data'])){
			$teams = $obj->getTeams()->result;
		}else{
			$teams = $extra['data'];
		}

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
				case 'read':
					break;
				case 'create':
//					if($has_admin || $is_team_member || $is_follower){
//						$have_permission = true;
//					}
//					return $have_permission;
					//currently allow all to add game
					return true;
					break;
				case 'addMatch':
					if($has_admin || $is_team_member || $is_follower || $has_user){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'modify':
					//TODO, add by Jeffrey, maybe we need add coach later
					if($has_admin || ( $is_follower || $is_team_member || $has_user ) ){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'delete':
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