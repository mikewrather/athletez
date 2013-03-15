<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/16/13
 * Time: 2:04 PM
 */

class Model_Sportorg_Orgs_Highschool extends ORM
{
	
	protected $_table_name = 'high_schools';

	protected $_belongs_to = array(
		'org' => array(
			'model' => 'Sportorg_Org',
			'foreign_key' => 'orgs_id'
		),
		'county' => array(
			'model' => 'Location_County',
			'foreign_key' => 'counties_id'
		),
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'states_id'
		),
		'location' => array(
			'model' => 'Location_Base',
			'foreign_key' => 'locations_id'
		),
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getTeams()
	{
		$org = $this->org;
		return $org->getTeams();
	}
	public function getBasics()
	{
		return array(					 
			"name" => $this->name,
			"county" => $this->county->getBasics(),
			"org" => $this->org->getBasics()
		);
	}

}