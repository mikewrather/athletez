<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/5/13
 * Time: 10:53 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Media_Vidhf extends ORM
{
	
	protected $_table_name = 'videos_hf';


	protected $_has_many = array(
		'meta' => array(
			'model' => 'Media_Vidhfmeta',
			'foreign_key' => 'video_id'
		)
	);
/*
	protected $_has_one = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		)
	);
*/
	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}