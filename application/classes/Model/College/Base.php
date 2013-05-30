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

class Model_College_Base extends ORM
{
	
	protected $_table_name = 'colleges';

	protected $_belongs_to = array(
		'region' => array(
			'model' => 'College_Region',
			'foreign_key' => 'college_region_id'
		),
		'division' => array(
			'model' => 'College_Division',
			'foreign_key' => 'college_division_id'
		),
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'state_id'
		),
		'city' => array(
			'model' => 'Location_City',
			'foreign_key' => 'city_id'
		),
	);
	
	protected $_has_many = array(
		'coaches' => array(
			'model' => 'College_Coach',
			'foreign_key' => 'college_id'
		),
		'_alias_' => array(
			'model' => '_model_name_', 
			'through' => '_pivot_table_',
			'foreign_key' => '_column_',
			'far_key' => '_column_'
		)
	);


}