<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 5/12/13
 * Time: 10:35 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Authcheck extends AuthController
{

	public function action_index()
	{
		$this->populateAuthVars();

		$facebook = FacebookAuth::factory();

		//	print_r($facebook);
		$retArr["facebook"] =  $facebook->get_user();

		$facebook->extend_auth_token();

		$retArr['authorized'] = $this->user ? true : false;

		if(!$this->user)
		{
			if (isset($retArr['facebook']['id']))
			{
				// check for previously connected user
				$uid = $retArr['facebook']['id'];
				$user_identity = ORM::factory('User_Identity')
					->where('provider', '=', 'facebook')
					->and_where('identity', '=', $uid)
					->find();

				if ($user_identity->loaded())
				{

					$user = ORM::factory("User_Base", $user_identity->user_id);

					if ($user->loaded() && $user->id == $user_identity->user_id && is_numeric($user->id))
					{
						// found, log user in
						Auth::instance()->force_login($user);
					}
				}
				else
				{
					echo json_encode($retArr);
					return;
				}
			}
			else
			{
				echo json_encode($retArr);
				return;
			}
		}

		$retArr['id'] = $this->user->id;
	//	$retArr['user_photo'] = $this->user->getAvatar();
		$retArr['user_name'] = $this->user->name();
        $retArr['user_email'] = $this->user->email;

		$retArr['nav'][] = array(
			"page"=>"My Profile",
			"link"=>"/profile"
		);

		if($this->user->teams->find_all()->count() > 0)
		{
			$retArr['nav'][] = array(
				"page"=>"My Teams",
				"link"=>"/team"
			);
		}

		echo json_encode($retArr);

	}
	
}