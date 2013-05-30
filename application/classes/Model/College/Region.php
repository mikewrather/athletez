<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/30/13
 * Time: 2:46 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_College_Region extends ORM
{
	
	protected $_table_name = 'college_regions';

	protected $_has_many = array(
		'colleges' => array(
			'model' => 'College_Base',
			'foreign_key' => 'college_region_id'
		),
	);
}