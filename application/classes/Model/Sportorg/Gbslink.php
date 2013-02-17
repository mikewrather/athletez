<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:50 PM
 */

class Model_Sportorg_Gbslink extends ORM
{
	
	protected $_table_name = 'gov_body_sport_link';
	

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'govbody' => array(
			'model' => 'Sportorg_Govbody',
			'foreign_key' => 'gov_bodies_id'
		)
	);
	
	protected $_has_many = array(
		'orggbslinks' => array(
			'model' => 'Sportorg_Orggbslink',
			'foreign_key' => 'gbs_link_id'
		),
		'orgs' => array(
			'model' => 'Sportorg_Org',
			'through' => 'org_gbs_link',
			'foreign_key' => 'gbs_link_id',
			'far_key' => 'orgs_id'
		)
	);

}