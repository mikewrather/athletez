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
			'foreign_key' => 'county_id'
		)
	);
	public function __construct()
	{
		parent::__construct();
	}
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"county_id" => $this->county_id,
			"county" => $this->county->getBasics(),
		);
	}
}