<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/7/13
 * Time: 2:04 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Stats_Base extends ORM
{
	
	protected $_table_name = 'stats';
	

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'secondsport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id2'
		),
		'stattab' => array(
			'model' => 'Stats_Tab',
			'foreign_key' => 'stattabs_id'
		)
	);

	//TODO: add has many relationships
	/*
	protected $_has_many = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		),
		'_alias_' => array(
			'model' => '_model_name_', 
			'through' => '_pivot_table_',
			'foreign_key' => '_column_',
			'far_key' => '_column_'
		)
	);
	
	protected $_has_one = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		)
	);
*/
	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}