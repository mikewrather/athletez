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



	public function getBasics($settings)
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

}