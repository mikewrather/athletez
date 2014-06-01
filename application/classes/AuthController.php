<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 3/20/13
 * Time: 12:27 AM
 *
 * @author: Mike Wrather
 *
 */

class AuthController extends Kohana_AuthController
{
	protected function getFBUserFromHeaders()
	{
		$facebook = FacebookAuth::factory();

		$fbAuthVars = $this->request->headers('fbaccesstoken') ? $this->request->headers('fbaccesstoken') : false;
		if(!$fbAuthVars) return $facebook->get_user();

		$fbAuthObj = json_decode($fbAuthVars);
		$access_token = $fbAuthObj->accessToken;
		$fb_userid = $fbAuthObj->userID;

		return $facebook->get_user_with_token($access_token,$fb_userid);
	}
}