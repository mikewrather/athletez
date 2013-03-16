<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:46 PM
 */

class Model_Media_Base extends ORM
{
	
	protected $_table_name = 'media';

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		)
	);

	protected $_has_one = array(
		'image' => array(
			'model' => 'Media_Image',
			'foreign_key' => 'media_id'
		),
		'video' => array(
			'model' => 'Media_Video',
			'foreign_key' => 'media_id'
		)
	);

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"media_type" => $this->media_type,
			"subject_type_id" => $this->subject_type_id,
			"subject_id" => $this->subject_id,
			"sport" => $this->sport->getBasics(),
			"user" => $this->user->getBasics(),
		);
	}
}