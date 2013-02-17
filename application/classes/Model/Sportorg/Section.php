<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/15/13
 * Time: 2:29 PM
 */

class Model_Sportorg_Section extends ORM
{
	
	protected $_table_name = 'sections';
	

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'state' => array(
			'model' => 'Location_State',
			'foreign_key'=>'states_id'
		)
	);

	protected $_has_many = array(
		'leagues' => array(
			'model' => 'Sportorg_League',
			'foreign_key' => 'sections_id'
		),
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}