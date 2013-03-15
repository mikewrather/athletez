<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:39 PM
 */

class Model_Location_City extends ORM
{
	
	protected $_table_name = 'cities';


	protected $_belongs_to = array(
		'county' => array(
			'model' => 'Location_County',
			'foreign_key' => 'counties_id'
		),
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'states_id'
		)
	);
	public function __construct()
	{
		parent::__construct();
	}
	
	public function getBasics()
	{
		return array(		
		 
			"name" => $this->name,
			"county" => $this->county->getBasics(),
			"state" => $this->state->getBasics(),
		);
	}
}