<?php defined('SYSPATH') or die('No direct script access.');

class Policy_Standarduseractivity extends Policy
{

	public function execute(Model_ACL_User $user, array $extra = NULL)
	{
		if(isset($extra["action"]))
		{
			switch($extra["action"])
			{
				case 'read':
					break;
				case 'write':
					break;
				case 'modify':
					break;
			}
		}
	}
}