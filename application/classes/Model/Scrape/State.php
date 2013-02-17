<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/8/13
 * Time: 4:15 PM
 */

class Model_Scrape_State extends ORM
{
	protected $_db_group = 'scraping';
	protected $_table_name = 'states';
	
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
*/
}