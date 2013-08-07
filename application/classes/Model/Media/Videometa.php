<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:50 PM
 */

class Model_Media_Videometa extends ORM
{
	
	protected $_table_name = 'videos_meta';

	protected $_belongs_to = array(
//		'video' => array(
//			'model' => 'Media_Video',
//			'foreign_key' => 'videos_id'
//		),
		'videotypelink' => array(
			'model' => 'Media_Videotypelink',
			'foreign_key' => 'video_type_link_id'
		)
	);

	public function getVideoMeta($args = array()){
		extract($args);
		$video_meta_model = $this->join("video_type_link")->on('video_type_link.id', '=', 'media_videometa.video_type_link_id')
			->join('videos')->on('videos.id', '=', 'video_type_link.videos_id')
			->where('video_type_link.video_types_id', '=', $video_types_id)
			->where('video_type_link.videos_id', '=', $videos_id);

		//exclude itself
		$classes_arr = array(
			'Media_Videometa' => 'media_videometa',
			'Media_Video' => 'videos',
			'Media_Videotypelink' => 'video_type_link'
		);

		$video_meta_model = ORM::_sql_exclude_deleted($classes_arr, $video_meta_model);
		return $video_meta_model;
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			//"name" => $this->name,
			//"vid_ver" => $this->vid_ver,
			"vid_prop" => $this->vid_prop,
			"vid_val" => $this->vid_val,
			//"video" => $this->video->getBasics()
		);
	}
}