<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Model_Media_Imagetypelink
 *
 * Date: 5/5/13
 * Time: 11:33 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Media_Imagetypelink extends ORM
{

	protected $_table_name = 'image_type_link';

	protected $_belongs_to = array(
		'image' => array(
			'model' => 'Media_Image',
			'foreign_key' => 'images_id'
		),
		'type' => array(
			'model' => 'Media_Imagetype',
			'foreign_key' => 'image_types_id'
		)
	);

	protected $_has_many = array(
		'meta' => array(
			'model' => 'Media_Imagesmeta',
			'foreign_key' => 'image_type_link_id'
		),
	);

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"images_id" => $this->images_id,
			"image_type" => $this->type->getBasics(),
			"url" => $this->url,
			"width" => $this->width,
			"height" => $this->height,
			"file_size_bytes" => $this->file_size_bytes,
		);
	}

	public function addLink($types_id,$images_id)
	{
		$find_existing = $this
			->where('images_id','=',$images_id)
			->where('image_types_id','=',$types_id)
			->find();

		if($find_existing->loaded()) return $find_existing->id;
		else
		{
			$this->image_types_id = $types_id;
			$this->images_id = $images_id;
			try
			{
				$this->save();
				return $this->id;
			}
			catch(ORM_Validation_Exception $e)
			{
				return $e;
			}
		}

	}

	/**
	 * get_meta_as_array() will get all metadata for this video/type link and return an array of metadata with key/value pairs
	 * @return array
	 */
	public function get_meta_as_array()
	{
		if(!$this->loaded()) return;
		$img_meta_res = $this->meta->find_all();

		$retArr = array();

		foreach($img_meta_res as $data)
		{
			if ($data->image_val != "" && $data->image_val != nulll)
				$retArr[$data->image_prop] = $data->image_val;
		}

		return $retArr;
	}

	/**
	 * get_meta_val retrieves a single value of metadata referenced by the property passed in as a parameter
	 * @param string $prop is the name of the property you want to retrive the value for
	 * @return string/bool either false or the value of the property being retrieved
	 */
	public function get_meta_val($prop="url")
	{
		if(!$this->loaded()) return;
		$img_meta = $this->meta->where('image_prop','=',$prop)->find();

		if(!$img_meta->loaded()) return false;
		return $img_meta->image_val;
	}
}