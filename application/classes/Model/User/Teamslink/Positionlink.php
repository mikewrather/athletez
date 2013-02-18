<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Links the user/team linking table to positions
 *
 * Date: 2/18/13
 * Time: 3:01 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Teamslink_Positionlink extends ORM
{
	
	protected $_table_name = 'utl_position_link';

	protected $_belongs_to = array(
		'utl' => array(
			'model' => 'User_Teamslink',
			'foreign_key' => 'users_teams_link_id'
		),
		'position' => array(
			'model' => 'Sportorg_Position',
			'foreign_key' => 'positions_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}