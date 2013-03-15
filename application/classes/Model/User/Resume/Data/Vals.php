<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 3:37 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Data_Vals extends ORM
{
	
	protected $_table_name = 'resume_data_vals';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'resdata' => array(
			'model' => 'User_Resume_Data',
			'foreign_key' => 'resume_data_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
	
	public function getBasics()
	{
		return array(
			"user" => $this->user->getBasics(),
			"resdata" => $this->resdata->getBasics(),
			"user_value" => $this->user_value,
		);
	}
}