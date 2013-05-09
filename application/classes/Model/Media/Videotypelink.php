<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/5/13
 * Time: 11:33 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Media_Videotypelink extends ORM
{
	
	protected $_table_name = 'video_type_link';

	protected $_belongs_to = array(
		'video' => array(
			'model' => 'Media_Video',
			'foreign_key' => 'videos_id'
		),
		'type' => array(
			'model' => 'Media_Videotype',
			'foreign_key' => 'video_types_id'
		)
	);

	protected $_has_many = array(
		'meta' => array(
			'model' => 'Media_Videometa',
			'foreign_key' => 'video_type_link_id'
		),
	);

	public function addLink($types_id,$videos_id)
	{
		$find_existing = $this
			->where('videos_id','=',$videos_id)
			->where('video_types_id','=',$types_id)
			->find();

		if($find_existing->loaded()) return $find_existing->id;
		else
		{
			$this->video_types_id = $types_id;
			$this->videos_id = $videos_id;
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
		$vid_meta_res = $this->meta->find_all();

		$retArr = array();

		foreach($vid_meta_res as $data)
		{
			$retArr[$data->vid_prop] = $data->vid_val;
		}

		return $retArr;
	}
}