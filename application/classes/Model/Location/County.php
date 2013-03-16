<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:38 PM
 */

class Model_Location_County extends ORM
{
	
	protected $_table_name = 'counties';
	

	protected $_belongs_to = array(
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'states_id'
		)
	);
	
	protected $_has_many = array(
		'cities' => array(
			'model' => 'Location_City',
			'foreign_key' => 'counties_id'
		)
	);
	


	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"state" => $this->state->getBasics(),
			"name" => $this->name,
		);
	}
}