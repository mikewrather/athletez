<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/4/13
 * Time: 1:21 PM
 */

class Model_Sportorg_Sport extends ORM
{

	protected $_table_name = 'sports';

	protected $_belongs_to = array(
		'type' => array(
			'model' => 'Sportorg_Sporttype',
			'foreign_key' => 'sport_type_id'
		)
	);
	
	protected $_has_many = array(
		'sections' => array(
			'model' => 'Sportorg_Sections',
			'foreign_key' => 'sports_id'
		),
		'usl' => array(
			'model' => 'User_Sportlink',
			'foreign_key' => 'sports_id'
		),
		'athletes' => array(
			'model' => 'Users_Base',
			'through' => 'user_sport_link',
			'foreign_key' => 'sports_id',
			'far_key' => 'users_id'
		),
		'media' => array(
			'model' => 'Media_Base',
			'foreign_key' => 'sports_id'
		),
		'positions' => array(
			'model' => 'Sportorg_Position',
			'foreign_key' => 'sports_id'
		),
		'orgs' => array(
			'model' => 'Sportorg_Orgs',
			'through' => 'org_sport_link',
			'foreign_key' => 'sports_id',
			'far_key' => 'orgs_id'
		),
	);

}