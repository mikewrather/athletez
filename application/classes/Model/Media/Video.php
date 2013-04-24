<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:48 PM
 */

class Model_Media_Video extends ORM
{
	
	protected $_table_name = 'videos';

	protected $_belongs_to = array(
		'media' => array(
			'model' => 'Media_Base',
			'foreign_key' => 'media_id'
		),
		'videoservice' => array(
			'model' => 'Media_Videoservice',
			'foreign_key' => 'video_services_id'
		)
	);

	public function rules(){

		return array
		(
			// media_id (int)
			'media_id'=>array(
				array('not_empty'),
				array('digit'),
				array('media_id_exist')
			),

			// video_services_id (int)
			'video_services_id'=>array(
				array('not_empty'),
				array('digit'),
				array('video_services_id_exist')
			),
		);
	}

	//TODO: update videos_meta to go through video_type_link because there's metadata per video type, not per video
	protected $_has_many = array(
		'metadata' => array(
			'model' => 'Media_Videometa',
			'foreign_key' => 'videos_id'
		),
		'types' => array(
			'model' => 'Media_Videotype',
			'through' => 'video_type_link',
			'far_key' => 'video_types_id',
			'foreign_key' => 'videos_id'
		),
	);
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,			
			"media" => $this->media->getBasics(),	 
			"video_services" => $this->videoservice->getBasics(),
		);
	}

	public function getVideos($games_id){
		$games_model = ORM::factory("Sportorg_Games_Base");
		$games_model->id = $games_id;

		$media_video = ORM::factory("Media_Video");
		$enttypeID = Ent::getMyEntTypeID($games_model);
//		$video_results = $media_base->where('subject_type_id','=',$enttypeID)
//			->and_where('subject_id','=',$games_model->id)
//			->find_all();
//		$media_ids = array();
//		foreach($video_results as $result){
//			$media_ids[] = $result->id;
//		}
//		if (empty($media_ids)){
//			$media_ids[] = -1;//No media_id match
//		}
//		return $media_video->where('media_id','in', $media_ids);

		$media_video->join('media', 'RIGHT')->on('media_video.media_id', '=','media.id')
			->where('media.subject_type_id', '=', $enttypeID)
			->and_where('media.subject_id', '=', $games_model->id);
		return $media_video;
	}

}