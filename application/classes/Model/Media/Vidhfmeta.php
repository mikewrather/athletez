<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/5/13
 * Time: 10:58 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Media_Vidhfmeta extends ORM
{
	
	protected $_table_name = 'videos_meta_hf';
	

	protected $_belongs_to = array(
		'video' => array(
			'model' => 'Media_Vidhf',
			'foreign_key' => 'video_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}