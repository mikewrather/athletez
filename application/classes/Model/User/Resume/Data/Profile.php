<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 3:46 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Data_Profile extends ORM
{
	
	protected $_table_name = 'resume_data_profiles';

	protected $_has_many = array(
		'datagroups' => array(
			'model' => 'User_Resume_Data_Group',
			'through' => 'rdg_rdp_link',
			'foreign_key' => 'resume_data_profiles_id',
			'far_key' => 'resume_data_groups_id'
		),
		'sports' => array(
			'model' => 'Sportorg_Sport',
			'through' => 'rdp_sports_link',
			'foreign_key' => 'resume_data_profiles_id',
			'far_key' => 'sports_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
	public function getBasics()
	{
		return array(
			"name" => $this->name
		);
	}

}