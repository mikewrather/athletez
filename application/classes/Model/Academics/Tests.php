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

	public function rules(){
		return array(
			// male (tinyint)
			'male'=>array(
				array('not_empty'),
				array('in_array', array(':value', array(0, 1))),
			),

			// female (tinyint)
			'female'=>array(
				array('not_empty'),
				array('in_array', array(':value', array(0, 1))),
			),
		);
	}


	public function getListall(){
		return $this;
	}

	public function getTestsByType($args = array()){
		extract($args);
		$this->select(DB::expr('distinct(academics_tests.id) as test_id'));
		$this->where('academics_tests_scores.users_id', '=', $users_id);
		$this->and_where_open();
		if (isset($standardized) && $standardized == 1){
			$this->or_where('test_type', '= ','standardized');
		}

		if (isset($ap) && $ap == 1){
			$this->or_where('test_type', '= ', 'AP');
		}
		$this->and_where_close();

		$this->join("academics_tests_topics", "RIGHT")->on("academics_tests_topics.academics_tests_id", "=", 'academics_tests.id');
		$this->join("academics_tests_scores", "RIGHT")->on("academics_tests_scores.academics_tests_topics_id", "=", 'academics_tests_topics.id');


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