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
//		$retArr["facebook"] =  $facebook->get_user();

		$retArr['authorized'] = $this->user ? true : false;

		if(!$this->user)
		{
		//	if (isset($retArr['facebook']['id']))
		//	{
		//		$user_identity = ORM::factory('User_Identity');

		//		if(!$user = $user_identity->find_by_identity($retArr['facebook']['id']))
		//		{
		//			echo json_encode($retArr);
		//			return;
		//		}
		//	}
		//	else
		//	{
				echo json_encode($retArr);
				return;
		//	}
		}

		$retArr['id'] = $this->user->id;
	//	$retArr['user_photo'] = $this->user->getAvatar();
		$retArr['user_name'] = $this->user->get_full_name();
        $retArr['user_email'] = $this->user->email;
		$retArr['user_photo'] = $this->user->userpic->getBasics();

		$retArr['nav'][] = array(
			"page"=>"My Profile",
			"link"=>"/#profile"
		);

		$retArr['nav'][] = array(
			"page"=>"Teams & Sports",
			"link"=>"/#usersettings"
		);
		$retArr['nav'][] = array(
			"page"=>"Athletic Resume",
			"link"=>"/#resume"
		);

//		$retArr['nav'][] = array(
//			"page" => $retArr['authorized'] ? "Facebook Linked" : "Link to Facebook",
//			"link" => $retArr['authorized'] ? "javascript:void(0);" : "/#fbconnect"
//		);

		$retArr['nav'][] = array(
			"page" => "Log Out",
			"link" => "/#logout",
			"id" => "logoutId"
		);

		echo json_encode($retArr);
	}
}