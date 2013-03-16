<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 3:42 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Data_Group extends ORM
{
	
	protected $_table_name = 'resume_data_groups';

	protected $_has_many = array(
		'resdata' => array(
			'model' => 'User_Resume_Data',
			'foreign_key' => 'resume_data_groups_id'
		),
		'profiles' => array(
			'model' => 'User_Resume_Data_Profile',
			'through' => 'rdg_rdp_link',
			'foreign_key' => 'resume_data_groups_id',
			'far_key' => 'resume_data_profiles_id'
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
			"name" => $this->name,
			"description" => $this->description,
		);
	}
}