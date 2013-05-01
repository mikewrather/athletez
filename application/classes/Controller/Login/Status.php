<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 4/30/13
 * Time: 1:49 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Login_Status extends AuthController
{

	public function action_index()
	{
		$this->populateAuthVars();
		$retArr = array(
			"authorized"=> "false",
			"user_photo"=> "images/photo.png",
			"user_name"=> $this->user->name(),
			"nav" => array
			(
				array
				(
					"page"=>"My Profile",
					"link"=>"/profile"
				),
				array(
					"page"=>"My Teams",
					"link"=>"/teams",
				)
			)
		);

		echo json_encode($retArr);
	}
	
}