<?php defined('SYSPATH') or die('No direct script access.');

class Policy_SensitiveContent extends Policy
{

	public function execute(Model_ACL_User $user, array $extra = NULL)
	{
		//TODO
		return true;
	}
}