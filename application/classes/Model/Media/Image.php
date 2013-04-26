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

	public function rules(){

		return array
		(
			// media_id (int)
			'media_id'=>array(
				array('not_empty'),
				array('digit'),
			),
		);
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"media" => $this->media->getBasics()
		);
	}

	public function getImages($games_id){
		$games_model = ORM::factory("Sportorg_Games_Base");

		$media_image = ORM::factory("Media_Image");
		$enttypeID = Ent::getMyEntTypeID($games_model);

		$media_image->join('media', 'RIGHT')->on('media_image.media_id', '=','media.id')
			->where('media.subject_type_id', '=', $enttypeID)
			->and_where('media.subject_id', '=', $games_id);
		return $media_image;
	}

	public function addImage($args = array())
	{

		$args["media_type"] = "image";
		$this->media_id = ORM::factory('Media_Base')->addMedia($args);
		if(!$this->loaded()) $this->create();

		foreach($args as $metaprop => $metaval)
		{
			$metaObj = ORM::factory('Media_Imagesmeta');
			$metaObj->images_id = $this->id;
			$metaObj->image_prop = $metaprop;
			$metaObj->image_val = $metaval;
			$metaObj->save();

		}

	}

	public function name()
	{
		return "Image ".$this->id;
	}
}