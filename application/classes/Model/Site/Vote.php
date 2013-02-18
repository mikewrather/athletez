<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 1:07 AM
 */

class Model_Site_Vote extends Model_Site_Entdir
{
	
	protected $_table_name = 'votes';

	protected $_belongs_to = array(
		'voter' => array(
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

}