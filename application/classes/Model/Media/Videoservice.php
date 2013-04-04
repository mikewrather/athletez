<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:48 PM
 */

class Model_Media_Videoservice extends ORM
{
	
	protected $_table_name = 'video_services';
	
	protected $_has_many = array(
		'videos' => array(
			'model' => 'Media_Video',
			'foreign_key' => 'video_services_id'
		),
		'queuedvideos' => array(
			'model' => 'Media_Queuedvideo',
			'foreign_key' => 'video_services_id'
		)
	);
	
	public function getVideos($sports_id = null)
	{
		$sports = $this->videos;
		if(isset($sports_id))
		{
			$sports->join('media')->on('media.id', '=','media_video.media_id')
					->where('media.sports_id', '=', $sports_id);
		}  
		 
		return $sports;
	}
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"website" => $this->website	 
		);
	}
}