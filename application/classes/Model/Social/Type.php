<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/21/13
 * Time: 1:06 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Social_Type extends ORM
{
	
	protected $_table_name = 'social_types';

	
	protected $_has_many = array(
		'users' => array(
			'model' => 'User_Base',
			'through' => 'social_links',
			'foreign_key' => 'social_types_id',
			'far_key' => 'users_id'
		)
	);


	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}