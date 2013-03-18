<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:53 PM
 */

class Model_Sportorg_Complevel_Base extends ORM
{
	
	protected $_table_name = 'complevels';
	

	protected $_belongs_to = array(
		'complevelprofile' => array(
			'model' => 'Sportorg_Complevel_Profile',
			'foreign_key' => 'complevel_profiles_id'
		)
	);
	
	protected $_has_many = array(
		'teams' => array(
			'model' => 'Sportorg_Team',
			'foreign_key' => 'complevels_id'
		),
	);
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"complevelprofile" => $this->complevelprofile->getBasics(),
			"name" => $this->name,
			"min_age" => $this->min_age,		
			"max_age" => $this->max_age,
			"complevel_profiles_id" => $this->complevel_profiles_id
		);
	}
}