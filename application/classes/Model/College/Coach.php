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

class Model_College_Coach extends ORM
{
	
	protected $_table_name = 'college_coaches';

	protected $_belongs_to = array(
		'college' => array(
			'model' => 'College_Base',
			'foreign_key' => 'collge_id'
		)
	);

	public function name()
	{
		return $this->coach_first." ".$this->coach_last;
	}

}