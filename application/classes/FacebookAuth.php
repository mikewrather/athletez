<?php defined('SYSPATH') or die('No direct script access.');

class FacebookAuth extends Kohana_FacebookAuth {
	public function logout(){
		$this->fb->destroySession();
	}

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
				/*	$invite = DB::select(array(DB::expr('COUNT(id)'),'num'))
						->from('invites')
						->where('invite_fb','=',$friend['id'])
						->execute()
						->get('num');

					$invited = $invite>0 ? true : false;
*/
					$processed[] = array(
						"name" => $friend["name"],
						"id" => $friend["id"],
						"gender" => isset($friend["gender"]) ? $friend["gender"] : "",
						"picture" => $friend["picture"]["data"]["url"],
						"large" => str_replace("_q.jpg","_n.jpg",$friend["picture"]["data"]["url"]),
						"invited" => false
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


	public function get_user_with_token($access_token,$user_id){
		if($access_token) $this->fb->manual_access_token($access_token);
		if($user_id) $this->fb->manual_user_id($user_id);
		return $this->get_user();
	}
}