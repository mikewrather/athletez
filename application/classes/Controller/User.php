<?php defined('SYSPATH') or die('No direct script access.');

/**
 * User: mike
 * Date: 2/2/13
 * Time: 2:29 PM
 */

class Controller_User extends Controller_Template
{

	function action_index()
	{

		$this->template->content = View::factory('user/info')->bind('user',$user);

		$user = Auth::instance()->get_user();

		print_r($user);

		if(!$user) HTTP::redirect('user/login');

	}

	function action_create()
	{
		$this->template->content = View::factory('user/create')->bind('errors',$errors)->bind('message',$message);

		if(HTTP_Request::POST == $this->request->method())
		{
			try
			{
				$user = ORM::factory('User')->create_user($this->request->post(),array(
					'username',
					'password',
					'email'
				));

				$user->add('roles', ORM::factory('Role',array('name'=>'login')));

				$_POST = array();

				$message = "You have added user {$user->username} to the database";

			}
			catch(ORM_Validation_Exception $e)
			{
				$message = 'There were errors.  Please see form below';
				$errors = $e->errors('models');
			}
		}
	}

	public function action_login()
	{
		$this->template->content = View::factory('user/login')
			->bind('message',$message);

		if(HTTP_Request::POST == $this->request->method())
		{
			$remember = array_key_exists('remember',$this->request->post()) ? (bool) $this->request->post('remember') : FALSE;
			$user = Auth::instance()->login($this->request->post('username'),$this->request->post('password'),$remember);

			if($user)
			{
				HTTP::redirect('user/index');
			}
			else
			{
				$message = "Login Failed";
			}
		}
	}

	public function action_logout()
	{
		Auth::instance()->logout();
		HTTP::redirect('user/login');
	}
}