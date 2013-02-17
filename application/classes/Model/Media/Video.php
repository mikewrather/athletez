<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:48 PM
 */

class Model_Media_Video extends Media_Base
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

}