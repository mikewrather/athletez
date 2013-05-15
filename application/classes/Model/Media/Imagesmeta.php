<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:51 PM
 */

class Model_Media_Imagesmeta extends ORM
{
	
	protected $_table_name = 'images_meta';
	protected $_belongs_to = array(
		'image' => array(
			'model' => 'Media_Image',
			'foreign_key' => 'images_id'
		)
	);
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"media" => $this->media->getBasics(),			
			"image_prop" => $this->image_prop,
			"image_val" => $this->image_val
		);
	}

}