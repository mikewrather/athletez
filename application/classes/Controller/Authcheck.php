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

		$retArr['authorized'] = $this->user ? true : false;

		if(!$this->user)
		{
			if (isset($retArr['facebook']['id']))
			{
				$user_identity = ORM::factory('User_Identity');

				if(!$user = $user_identity->find_by_identity($retArr['facebook']['id']))
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

		$retArr['nav'][] = array(
			"page"=>"Sports / Teams Settings",
			"link"=>"/usersettings"
		);
		$retArr['nav'][] = array(
			"page"=>"User Resume",
			"link"=>"/resume"
		);
		$retArr['nav'][] = array(
			"page"=>"Tag",
			"link"=>"/tag"
		);
	/*	if($this->user->teams->find_all()->count() > 0)
		{
			$retArr['nav'][] = array(
				"page"=>"My Teams",
				"link"=>"/team"
			);
		}   */
		echo json_encode($retArr);
	}
}