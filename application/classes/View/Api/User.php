<?php defined('SYSPATH') or die('No direct script access.');

	/**
	 * $description
	 *
	 * Date: 2/18/13
	 * Time: 5:32 PM
	 *
	 * @author: Mike Wrather
	 *
	 */

class View_Api_User extends Api_Viewclass
{

	public function basics()
	{
		//print_r($_GET);
		return $this->obj->getBasics();
	}


	public function teams()
	{
		$retArr = array();
		foreach($this->obj->teams->find_all() as $team)
		{
			$response = Request::factory('/api/team/basics/'.$team->id.'?users_id='.$this->obj->id)->execute();
			$retArr[$team->id] = $response->body;
		}
		return $retArr;
	}

	public function sports()
	{
		$retArr = array();
		$teams = $this->obj->teams->group_by('org_sport_link_id')->find_all();
		foreach($teams as $team)
		{
			$sport = $team->getSport();
			$retArr[$sport->id] = array(
				'name' => $sport->name,
				'gender' => $sport->gender
			);
		}
		return $retArr;
	}

	public function orgs()
	{
		$retArr = array();
		$teams = $this->obj->teams->group_by('org_sport_link_id')->find_all();
		foreach($teams as $team)
		{
			$org = $team->getOrg();
			$response = Request::factory('/api/org/basics/'.$org->id.'?users_id='.$this->obj->id)->execute();
			$retArr[$org->id] = $response->body;
		}
		return $retArr;
	}

	public function related()
	{

	}

	public function videos()
	{
		$retArr = array();
		$videos = $this->obj->getVideos();
		foreach($videos as $video)
		{
			$retArr[$video->id] = array(
				'name' => $video->name
			);
			if($video->video->video_services_id > 0)
			{
				// Example of using subrequest to call api
				$response = Request::factory('/api/videoservice/basics/'.$video->video->video_services_id)->execute();
				$retArr[$video->id]['video_service'] = $response->body;
			}
		}
		return $retArr;
	}

	public function images()
	{
		$retArr = array();
		$images = $this->obj->getImages();
		foreach($images as $image)
		{
			$retArr[$image->id] = array(
				'name' => $image->name
			);
		}
		return $retArr;
	}

	public function commentsof()
	{
		$retArr = array();
		$user_id = $this->obj->id;
		$comments = ORM::factory('Site_Comment')
			->where('users_id','=',$user_id)
			->find_all();

		foreach($comments as $comment)
		{
			$subject = Ent::eFact($comment->subject_enttypes_id,$comment->subject_id);

			$subjectData = array();
			if(method_exists($subject,'getBasics'))
			{
				$subjectData = $subject->getBasics();
			}

			$ent = new Ent($comment->subject_enttypes_id);
			$retArr[$comment->id] = array(
				"comment" => $comment->comment,
				"enttypes_id" => $comment->subject_enttypes_id,
				"ent_id" => $comment->subject_id,
				"subject_type" => $ent->name,
				"subject_data" => $subjectData
			);
		}
		return $retArr;
	}

	public function commentson()
	{

	}

	public function listall()
	{
		$retArr = array();
		$users = $this->obj->find_all();
		foreach($users as $user)
		{
			$retArr[$user->id] = $user->getBasics();
		}
		return $retArr;
	}

	public function fitnessbasics()
	{
		return $this->obj->getResumeData();
	}

}