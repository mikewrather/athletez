<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/16/13
 * Time: 4:42 PM
 */

class Model_Media_Imagetype extends ORM
{

	protected $_table_name = 'image_types';


	protected $_has_many = array(
		'images' => array(
			'model' => 'Media_Image',
			'through' => 'image_type_link',
			'far_key' => 'images_id',
			'foreign_key' => 'image_types_id'
		),
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"img_extension" => $this->img_extension,
			"height" => $this->height,
			"width" => $this->width,
			"active" => $this->active
		);
	}
}