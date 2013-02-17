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
		)
	);


}