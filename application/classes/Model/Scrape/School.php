<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/8/13
 * Time: 4:15 PM
 */

class Model_Scrape_School extends ORM
{
	protected $_db_group = 'scraping';
	protected $_table_name = 'schools';

	protected $_primary_key = 'mp_school_id';
	
/*
	protected $_belongs_to = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		)
	);
	
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