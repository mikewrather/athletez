<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:52 PM
 */

class Model_Sportorg_League extends ORM
{
	
	protected $_table_name = 'leagues';
	

	protected $_belongs_to = array(
		'section' => array(
			'model' => 'Sportorg_Section',
			'foreign_key' => 'sections_id'
		)
	);

	protected $_has_many = array(
		'orgs' => array(
			'model' => 'Sportorg_org',
			'foreign_key' => 'leagues_id',
		)
	);

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"section" => $this->section->getBasics(),
			"name" => $this->name,			
			"section_id" => $this->section_id,
			"states_id" => $this->states_id,
		);
	}
}