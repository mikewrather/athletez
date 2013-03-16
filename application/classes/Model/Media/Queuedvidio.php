<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:49 PM
 */

class Model_Media_Queuedvidio extends ORM
{
	
	protected $_table_name = 'queued_videos';
	

	protected $_belongs_to = array(
		'video' => array(
			'model' => 'Media_Video',
			'foreign_key' => 'videos_id'
		),
		'videoservice' => array(
			'model' => 'Media_Videoservice',
			'foreign_key' => 'video_services_id'
		),
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		)
	);
	public function getBasics()
	{
		return array(
			"id" => $this->id,			
			"title" => $this->title,
			"url" => $this->url,
			"jobID" => $this->jobID,
			"videos" => $this->video->getBasics(),
			"video_services" => $this->videoservice->getBasics(),
			"user" => $this->user->getBasics(),
			"complete" => $this->complete,
			"duration" => $this->duration,
			"mm_id" => $this->mm_id,
			"mm_encode" => $this->mm_encode,			
			"user_sess" => $this->user_sess,
			"sports_id" => $this->sports_id,			
		);
	}

}