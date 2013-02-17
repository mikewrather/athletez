<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 12:21 AM
 */

class Model_Sportorg_Govbody extends ORM
{
	
	protected $_table_name = 'gov_bodies';
	

	protected $_belongs_to = array(
		'seasonprofile' => array(
			'model' => 'Sportorg_Seasons_Profile',
			'foreign_key' => 'season_profiles_id'
		),
		'complevelprofile' => array(
			'model' => 'Sportorg_Complevel_Profile',
			'foreign_key' => 'complevel_profiles_id'
		)
	);
	
	protected $_has_many = array(
		'sports' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'gov_bodies_id',
			'far_key' => 'sports_id',
			'through' => 'gov_body_sport_link'
		),
		'gbslinks' => array(
			'model' => 'Sportorg_Gbslink',
			'foreign_key' => 'gov_bodies_id'
		)
	);

}