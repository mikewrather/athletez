<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 4:23 PM
 */

class Model_Sportorg_Division extends ORM
{
	
	protected $_table_name = 'divisions';

	protected $_belongs_to = array(
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'states_id'
		)
	);
	
	protected $_has_many = array(
		'orggbslink' => array(
			'model' => 'Sportorg_Orggbslink',
			'foreign_key' => 'divisions_id'
		),
		'leagues' => array(
			'model' => 'Sportorg_League',
			'foreign_key' => 'divisions_id',
			'far_key' => 'leagues_id',
			'through' => 'org_gbs_link'
		),
		'orgs' => array(
			'model' => 'Sportorg_org',
			'foreign_key' => 'divisions_id',
			'far_key' => 'orgs_id',
			'through' => 'org_gbs_link'
		),
		'gbslinks' => array(
			'model' => 'Sportorg_Gbslink',
			'foreign_key' => 'divisions_id',
			'far_key' => 'gbs_link_id',
			'through' => 'org_gbs_link'
		)
	);
}