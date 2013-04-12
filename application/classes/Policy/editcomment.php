<?php defined('SYSPATH') or die('No direct script access.');

class Policy_EditComment extends Policy
{

	public function execute(Model_ACL_User $user, array $extra = NULL)
	{
		if($user->has('roles','admin'))
			return true;
		return false;
	}
}