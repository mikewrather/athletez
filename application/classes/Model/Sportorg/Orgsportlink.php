<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:51 PM
 */

class Model_Sportorg_Orgsportlink extends ORM
{

	protected $_table_name = 'org_sport_link';

	protected $_belongs_to = array(
		'org' => array(
			'model' => 'Sportorg_Org',
			'foreign_key' => 'orgs_id'
		),
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
	);

	protected $_has_many = array(
		'teams' => array(
			'model' => 'Sportorg_Team',
			'foreign_key' => 'org_sport_link_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"org" => $this->org->getBasics(),			 
			"sport" => $this->sport->getBasics(),			
		);
	}
}