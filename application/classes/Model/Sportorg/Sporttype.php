<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/16/13
 * Time: 12:53 AM
 */

class Model_Sportorg_Sporttype extends ORM
{
	
	protected $_table_name = 'sport_types';
	
	protected $_has_many = array(
		'sports' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sport_type_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}