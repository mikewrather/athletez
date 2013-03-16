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

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,			
			"voter" => $this->voter->getBasics(),
			"enttype" => $this->enttype->getBasics(),
			"subject_id" => $this->subject_id,	
		);
	}
}