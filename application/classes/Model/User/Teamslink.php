<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 1:02 PM
 */

class Model_User_Teamslink extends ORM
{
	protected $_table_name = 'users_teams_link';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'team' => array(
			'model' => 'Sportorg_Team',
			'foreign_key' => 'teams_id'
		)
	);

	protected $_has_many = array(
		'positions' => array(
			'model' => 'User_Teamslink_Positionlink',
			'foreign_key' => 'users_teams_link_id'
		)
	);
}