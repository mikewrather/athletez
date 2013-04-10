<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:55 PM
 */

class Model_Sportorg_Complevel_Profile extends ORM
{
	
	protected $_table_name = 'complevel_profiles';
	

	
	protected $_has_many = array(
		'orgs' => array(
			'model' => 'Sportorg_Org',
			'foreign_key' => 'complevel_profiles_id'
		),
		'complevels' => array(
			'model' => 'Sportorg_Complevel_Base',
			'foreign_key' => 'complevel_profiles_id'
		)
	);

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),
		);
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
		);
	}

}