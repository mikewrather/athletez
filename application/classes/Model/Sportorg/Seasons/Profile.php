<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:59 PM
 */

class Model_Sportorg_Seasons_Profile extends ORM
{
	
	protected $_table_name = 'season_profiles';

	protected $_has_many = array(
		'seasons' => array(
			'model' => '[model name]',
			'through' => 'season_profile_linke',
			'foreign_key' => 'season_profiles_id',
			'far_key' => 'seasons_id'
		),
		'govbodies' => array(
			'model' => 'Sportorg_Govbody',
			'foreign_key' => 'season_profiles_id'
		)
	);

	public function getBasics()
	{
		return array(					 
			"name" => $this->name
		);
	}
}