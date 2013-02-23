<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/13/13
 * Time: 12:04 PM
 */

class Model_Scrape_Schoolteams extends ORM
{
	protected $_db_group = 'scraping';
	protected $_table_name = 'school_teams';
	

	protected $_belongs_to = array(
		'state' => array(
			'model' => 'Scrape_Sport',
			'foreign_key' => 'state'
		),
		'sport' => array(
			'model' => 'Scrape_Sport',
			'foreign_key' => 'mp_ssid'
		),
		'school' => array(
			'model' => 'Scrape_School',
			'foreign_key' => 'mp_school_id'
		)
	);
/*
	protected $_has_many = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		),
		'[alias name]' => array(
			'model' => '[model name]', 
			'through' => '[model name of pivot table]'
		)
	);
	
	protected $_has_one = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		)
	);
*/


}