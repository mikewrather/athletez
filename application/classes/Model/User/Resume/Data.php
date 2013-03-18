<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 3:41 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Data extends ORM
{
	
	protected $_table_name = 'resume_data';

	protected $_belongs_to = array(
		'resume_data_group' => array(
			'model' => 'User_Resume_Data_Group',
			'foreign_key' => 'resume_data_groups_id'
		)
	);
	
	protected $_has_many = array(
		'datavals' => array(
			'model' => 'User_Resume_Data_Vals',
			'foreign_key' => 'resume_data_id'
		),
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"resume_data_group" => $this->resume_data_group->getBasics(),
			"name" => $this->name,
			"resume_data_type" => $this->resume_data_type,
			"resume_data_groups_id" => $this->resume_data_groups_id
		);
	}
}