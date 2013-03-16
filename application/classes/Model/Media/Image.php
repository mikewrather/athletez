<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:47 PM
 */

class Model_Media_Image extends ORM
{
	
	protected $_table_name = 'images';
	

	protected $_belongs_to = array(
		'media' => array(
			'model' => 'Media_Base',
			'foreign_key' => 'media_id'
		)
	);
	
	protected $_has_many = array(
		'metadata' => array(
			'model' => 'Media_Imagesmeta',
			'foreign_key' => 'images_id'
		),
	);
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"media" => $this->media->getBasics()
		);
	}
}