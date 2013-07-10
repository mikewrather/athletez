<?php
/**
 * Date: 7/8/13
 * Time: 3:34 AM
 *
 * @author: Mike Wrather
 *
 */

return array(
	'Media_Base' => array(
		'Media_Image' => 'media_id',
		'Media_Video' => 'media_id',
		'Site_Tag' => 'media_id'
	),
	'Media_Image' => array(
		'Media_Imagetypelink' => 'images_id',
	),
	'Media_Video' => array(
		'Media_Videotypelink' => 'videos_id'
	),
	'Media_Videotypelink' => array(
		'Media_Videometa' => 'video_type_link_id'
	),
);