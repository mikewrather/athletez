<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/16/13
 * Time: 4:42 PM
 */

class Model_Media_Videotype extends ORM
{
	
	protected $_table_name = 'video_types';
	

	protected $_has_many = array(
		'videos' => array(
			'model' => 'Media_Video',
			'through' => 'video_type_link',
			'far_key' => 'videos_id',
			'foreign_key' => 'video_types_id'
		),
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}