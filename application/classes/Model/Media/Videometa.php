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
		'video' => array(
			'model' => 'Media_Video',
			'foreign_key' => 'videos_id'
		),
		'videotypelink' => array(
			'model' => 'Media_Videotypelink',
			'foreign_key' => 'video_type_link_id'
		)
	);

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"vid_ver" => $this->vid_ver,
			"vid_prop" => $this->vid_prop,
			"vid_val" => $this->vid_val,
			"video" => $this->video->getBasics()	 
		);
	}
}