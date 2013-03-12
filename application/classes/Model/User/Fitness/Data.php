<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/11/13
 * Time: 10:18 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Fitness_Data extends ORM
{
	
	protected $_table_name = 'fitness_data';
	

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		)
	);
	
	protected $_has_many = array(
		'datavalues' => array(
			'model' => 'User_Fitness_Dataval',
			'foreign_key' => 'fitness_data_id'
		),

	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}