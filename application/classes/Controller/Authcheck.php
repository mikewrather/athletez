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

		$retArr = array();
		$retArr['authorized'] = $this->user ? true : false;

		if(!$this->user) return $retArr;

		$retArr['id'] = $this->user->id;
	//	$retArr['user_photo'] = $this->user->getAvatar();
		$retArr['user_name'] = $this->user->name();

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