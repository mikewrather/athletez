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
		//	echo microtime();
			$facebook = FacebookAuth::factory();

			$fbAuthVars = $this->request->headers('fbaccesstoken') ? $this->request->headers('fbaccesstoken') : false;

			$fbAuthObj = json_decode($fbAuthVars);
			$access_token = $fbAuthObj->accessToken;
			$fb_userid = $fbAuthObj->userID;

	//		print_r($fbAuthObj);

			$retArr["facebook"] =  $access_token ? $facebook->get_user_with_token($access_token,$fb_userid) : $facebook->get_user();
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
				"link"=>"#!profile"
			),
			array(
				"page"=>"Teams & Sports",
				"link"=>"#!usersettings"
			),
			array(
				"page"=>"Athletic Resume",
				"link"=>"#resume"

			)
		);

		$retArr['nav']["Social"] = array(
			array(
				"page" => $retArr['facebook']['id']>0 ? "FB Account Linked" : "Link to Facebook",
				"link" => $retArr['facebook']['id']>0 ? "javascript:void(0);" : "javascript: void(0);",
				"className" => $retArr['facebook']['id']>0 ? "" : "link-to-fb-h"
			)

		);

		if($retArr['facebook']['id']>0) $retArr['nav']["Social"][] = array(
			"page" => "Invite From Facebook",
			"link" => "#fbinvite"
		);

		$retArr['nav'][] = array(
			"page" => "Log Out",
			"link" => "#logout",
			"id" => "logoutId"
		);

		$retArr['nav'][] = array(
			"page" => "Find Content",
			"link" => "#!home"
		);

		echo json_encode($retArr);
	}
}