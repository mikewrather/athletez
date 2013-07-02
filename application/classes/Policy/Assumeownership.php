<?php defined('SYSPATH') or die('No direct script access.');

	class Policy_Assumeownership extends Policy
	{
		public function execute(Model_ACL_User $user, array $extra = NULL)
		{
			//$extra["owner"] should be users_id for edit/delete or create for whom
			$config = Kohana::$config->load('sysconfig');
			$roles = $config->get('role_name');
			$has_admin = $user->has('roles', ORM::factory('Role', array('name' => $roles['admin'])));
			if(isset($extra["owner"])){
				if ($this->is_owner($user, $extra["owner"]) || $has_admin){
					return true;
				}
			}else{
				//no matter if have extra param,admin still can do it
				if ($has_admin)
				return true;
			}
			return false;
		}

		private function is_owner($user, $owner_id){
			return invtal($user->id) == inval($owner_id);
		}
	}
