<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/30/13
 * Time: 2:45 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_College_Division extends ORM
{
	
	protected $_table_name = 'college_divisions';

	protected $_has_many = array(
		'colleges' => array(
			'model' => 'College_Base',
			'foreign_key' => 'college_divisions_id'
		),
	);
}