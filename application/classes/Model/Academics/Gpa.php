<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 6/10/13
 * Time: 3:53 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Academics_Gpa extends ORM
{
	
	protected $_table_name = 'academics_gpa';
	

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}