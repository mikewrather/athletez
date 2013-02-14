<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/8/13
 * Time: 6:01 PM
 */

class Model_Scrape_Scheduleteam extends ORM
{

	protected $_db_group = 'scraping';
	protected $_table_name = 'schedule_teams';
	

	protected $_belongs_to = array(
		'schedule' => array(
			'model' => 'Scrape_Schedule',
			'foreign_key' => 'schedule_id'
		)
	);

}