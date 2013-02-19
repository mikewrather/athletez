<?php defined('SYSPATH') or die('No direct script access.');

	/**
	 * $description
	 *
	 * Date: 2/18/13
	 * Time: 5:32 PM
	 *
	 * @author: Mike Wrather
	 *
	 */

class View_Api_User extends Viewclass
{

	public function basics()
	{
		return array(
			'username' => $this->obj->username,
			'email' => $this->obj->email,
			'logins' => $this->obj->logins,
			'last_login' => date('M jS, g:i a',$this->obj->last_login)
		);
	}

}