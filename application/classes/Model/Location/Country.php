<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:39 PM
 */

class Model_Location_Country extends ORM
{
	
	protected $_table_name = 'countries';

	protected $_has_many = array(
		'states' => array(
			'model' => 'Location_State',
			'foreign_key' => 'states_id'
		),
	);


	public function getBasics($settings)
	{
		return array(
			"id" => $this->id,
			"name" => $this->name
		);
	}

}