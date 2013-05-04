<?php defined('SYSPATH') or die('No direct script access.');

class Policy_Standarduseractivity extends Policy
{
	/**
	 * Usage: $this->user->can('Standarduseractivity', array('action'=>'modify','entity'=>$this->mainModel)
	 * @param Model_ACL_User $user
	 * @param array $extra
	 * @return bool
	 */
	public function execute(Model_ACL_User $user, array $extra = NULL)
	{
		$config = Kohana::$config->load('sysconfig');
		$roles = $config->get('role_name');
		$has_admin = $user->has('roles', ORM::factory('Role', array('name' => $roles['admin'])));
		$has_moderator = $user->has('roles', ORM::factory('Role', array('name' => $roles['moderator'])));
		$have_permission = false;
		$is_owner = false;
		if(isset($extra["entity"]))
		{
			$entity = $extra["entity"];
			$is_owner = $entity->is_owner($user);
		}

		if(isset($extra["action"]))
		{
			switch($extra["action"])
			{
				case 'read':
					break;
				case 'create':
					break;
				case 'modify':
					if($is_owner){
						$have_permission = true;
					}
					return $have_permission;
					break;
				case 'delete':
					if($has_admin || $has_moderator || $is_owner){
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