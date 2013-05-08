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


	public function rules(){

		return array
		(
			/*
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// users_id (int)
			'users_id'=>array(
				array('not_empty'),
				array('digit'),
			),

			// media_type (enum)
			'media_type'=>array(
				array('not_empty'),
			),

			// sports_id (int)
			'sports_id'=>array(
				array('not_empty'),
				array('sports_id_exist')
			),
/*
			// subject_type_id (int)
			'subject_type_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),

			// subject_id (int)
			'subject_id'=>array(
				array('not_empty'),
				array('digit'),
				array('subject_id_exist',array( ':validation', 'subject_type_id', 'subject_id'))
			),
*/
		);
	}

	public function getMediaForObject(ORM $object)
	{
		// Get Ent Type ID
		$enttypeID = Ent::getMyEntTypeID($object);
		$result = $this->where('subject_type_id','=',$enttypeID);
		return $result;
	}

	/**
	 * getTaggedObjects should get all tagged objects and return them each with their getBasics data
	 * this method should select from the tags table where media_id = $this->id
	 */
	public function getTaggedObjects()
	{

	}

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

	public function addMedia($args = array())
	{
		//using user_id instead of users_id because I'm using this method to transfer old stuff right now.
		if(isset($args['user_id']))
		{
			$this->users_id = $args['user_id'];
		}

		if(isset($args['media_type']))
		{
			$this->media_type = $args['media_type'];
		}

		if(isset($args['sports_id']))
		{
			$this->sports_id = $args['sports_id'];
		}

		if(isset($args['name']))
		{
			$this->name = $args['name'];
		}
		else
		{
			$this->name = "";
		}

		$this->save();

		return $this->id;
	}

	public function owner()
	{
		if(!$this->id)
		{
			return "";
		}
		return intval($this->users_id);
	}

	public function is_owner($user)
	{
		if (is_object($user)){
			return intval($user->id) == $this->owner();
		}else{
			return intval($user) == $this->owner();
		}
	}
}