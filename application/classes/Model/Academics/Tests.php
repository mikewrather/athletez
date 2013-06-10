<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 6/10/13
 * Time: 3:53 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Academics_Tests extends ORM
{
	
	protected $_table_name = 'academics_tests';
	

	protected $_has_many = array(
		'topics' => array(
			'model' => 'Academics_Tests_Topics',
			'foreign_key' => 'academics_tests_id'
		),

	);
	/*
	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}*/



	public function getListall(){
		return $this;
	}

	public function getBasics(){
		return array(
			'id' => $this->id,
			'name' => $this->name,
			'test_type' => $this->test_type,
			'description' => $this->description
		);
	}
}