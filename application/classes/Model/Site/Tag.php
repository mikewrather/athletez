<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 1:12 AM
 */

class Model_Site_Tag extends Model_Site_Entdir
{
	
	protected $_table_name = 'tags';

	protected $_belongs_to = array(
		'tagger' => array(
			'model' => 'User_Base',
			'foreign_key' => 'voter_users_id'
		),
		'enttype' => array(
			'model' => 'Site_Enttype',
			'foreign_key' => 'subject_enttypes_id'
		)
	);

	public function rules(){

		return array
		(
			// subject_enttypes_id (int)
			'subject_enttypes_id'=>array(
				array('not_empty'),
				array('digit'),
			),

			// subject_id (int)
			'subject_id'=>array(
				array('not_empty'),
				array('digit'),
				array('subject_id_exist',array( ':validation', 'subject_enttypes_id', 'subject_id'))
			),

			// users_id (int)
			//TODO, add by jeffrey, this user id validation need developer do manually.
			/*
			'users_id'=>array(
				array('not_empty'),
				array('digit'),
			),
			*/
		);
	}

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getBasics()
	{
		//This gets the subject of the vote.  It will be used to pull basic information
		$subject = $this->getSubject();

		return array(
			"id" => $this->id,
			"voter_users_id" => $this->voter_users_id,
			"voter" => $this->voter->getBasics(),
			"subject" => $subject->getBasics(),
		);
	}
}