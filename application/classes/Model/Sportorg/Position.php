<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 4:22 PM
 */

class Model_Sportorg_Position extends ORM
{
	
	protected $_table_name = 'positions';

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'stattab' => array(
			'model' => 'Stats_Tab',
			'foreign_key' => 'stattab_id'
		)
	);
	
	protected $_has_many = array(
		'utlposlink' => array(
			'model' => 'User_Teamslink_Positionslink',
			'foreign_key' => 'positions_id'
		)
	);

}