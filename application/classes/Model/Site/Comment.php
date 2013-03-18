<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 12:28 AM
 */

class Model_Site_Comment extends Model_Site_Entdir
{
	
	protected $_table_name = 'comments';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'enttype' => array(
			'model' => 'Site_Enttype'
		)
	);

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
			"users_id" => $this->users_id,
			"user" => $this->user->getBasics(),
			"subject" => $subject->getBascis(),
			"comment" => $this->comment,
		);
	}
}