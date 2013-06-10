<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 6/10/13
 * Time: 3:54 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Academics_Tests_Topics extends ORM
{
	
	protected $_table_name = 'academics_tests_topics';
	

	protected $_belongs_to = array(
		'test' => array(
			'model' => 'Academics_Tests',
			'foreign_key' => 'academics_tests_id'
		)
	);
	
	protected $_has_many = array(
		'scores' => array(
			'model' => 'Academics_Tests_Scores',
			'foreign_key' => 'academics_tests_topics_id'
		),

	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function name()
	{
		return $this->subtopic;
	}
}