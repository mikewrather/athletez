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
		'orggbslink' => array(
			'model' => 'Sportorg_Orggbslink',
			'foreign_key' => 'leagues_id'
		),
		'divisions' => array(
			'model' => 'Sportorg_Division',
			'foreign_key' => 'leagues_id',
			'far_key' => 'divisions_id',
			'through' => 'org_gbs_link'
		),
		'orgs' => array(
			'model' => 'Sportorg_org',
			'foreign_key' => 'leagues_id',
			'far_key' => 'orgs_id',
			'through' => 'org_gbs_link'
		),
		'gbslinks' => array(
			'model' => 'Sportorg_Gbslink',
			'foreign_key' => 'leagues_id',
			'far_key' => 'gbs_link_id',
			'through' => 'org_gbs_link'
		)
	);

	public function getBasics()
	{
		return array(
			"section" => $this->section->getBasics(),			 
			"name" => $this->name,			
			"states_id" => $this->states_id
		);
	}
}