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
		$retArr['authorized'] = $this->user ? true : false;

	//	print_r($this->user);
		if($this->user)
		{
			//Check if FB identity exists
			$identity = ORM::factory('User_Identity')
				->where('users_id','=',$this->user->id)
				->where('provider','=','facebook')
				->find();

			if($identity->loaded()) $retArr['facebook']['id'] = $identity->identity;
		}
		else
		{
			$retArr["facebook"] = $this->getFBUserFromHeaders();
			//echo microtime();

			if (isset($retArr['facebook']['id']))
			{
				$user_identity = ORM::factory('User_Identity');

				if(!$user = $user_identity->find_by_identity($retArr['facebook']['id']))
				{
					echo json_encode($retArr);
					return;
				}
				$this->user = $user;
				$retArr["authorized"] = true;
			}
			else
			{
				echo json_encode($retArr);
				return;
			}
		}


		$retArr['id'] = $this->user->id;
	//	$retArr['user_photo'] = $this->user->getAvatar();
		$retArr['user_name'] = $this->user->get_full_name();
        $retArr['user_email'] = $this->user->email;
		$retArr['user_photo'] = $this->user->userpic->getBasics();



		$retArr['nav'][$retArr['user_name']] = array(
			array(
				"page"=>"View My Profile",
				"link"=>"#!profile",
				"icon"=>"uk-icon-user"
			),
			array(
				"page"=>"Teams & Sports",
				"link"=>"#!usersettings",
				"icon"=>"uk-icon-cog"
			),
			array(
				"page"=>"Athletic Resume",
				"link"=>"#resume",
				"icon"=>"uk-icon-trophy"

			)
		);

		$retArr['nav']["Social"] = array(
			array(
				"page" => $retArr['facebook']['id']>0 ? "FB Account Linked" : "Link to Facebook",
				"link" => $retArr['facebook']['id']>0 ? "javascript:void(0);" : "javascript: void(0);",
				"className" => $retArr['facebook']['id']>0 ? "" : "link-to-fb-h",
				"icon"=>"uk-icon-facebook"
			)

		);

		if($retArr['facebook']['id']>0) $retArr['nav']["Social"][] = array(
			"page" => "Invite From Facebook",
			"link" => "#fbinvite",
			"icon"=>"uk-icon-group"
		);

		$retArr['nav'][] = array(
			"page" => "Log Out",
			"link" => "#logout",
			"id" => "logoutId",
			"icon"=>"uk-icon-sign-out"
		);

		$retArr['nav'][] = array(
			"page" => "Find Content",
			"link" => "#!home",
			"icon"=>"uk-icon-search"
		);

		echo json_encode($retArr);
	}
}