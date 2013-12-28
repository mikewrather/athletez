<?php defined('SYSPATH') or die('No direct script access.');

class FacebookAuth extends Kohana_FacebookAuth {
	public function logout(){ $this->fb->destroySession(); }

	function getFriends()
	{
		$user = $this->fb->getUser();
		$processed = array();
		if ($user)
		{
			try
			{
				$friends = $this->fb->api('/me/friends?fields=name,id,location,picture,gender');

				foreach($friends["data"] as $friend)
				{
					$invited = false;
				/*	$invite = ORM::factory('invite')->where('invite_fb','=',$friend['id'])->find_all();
					if($invite->count() > 0)
					{
						$invited = true;
					}
				*/
					$processed[] = array(
						"name" => $friend["name"],
						"id" => $friend["id"],
						"gender" => isset($friend["gender"]) ? $friend["gender"] : "",
						"picture" => $friend["picture"],
						"large" => str_replace("_q.jpg","_n.jpg",$friend["picture"])
					//	"invited" => $invited
					);
				}
			}
			catch (FacebookApiException $e)
			{
				error_log($e);
				$user = null;
			}
		}

		return $processed;

	}

	public function getInfoById($fb_id){
		$user = $this->fb->getUser();
		if ($user)
		{
			try
			{
				$user_data = $this->fb->api('/'.$fb_id);
				return $user_data;
			} catch(FacebookApiException $e){
				error_log($e);
				return false;
			}
		}
	}
}