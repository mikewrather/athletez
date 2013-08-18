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

	public $error_message_path = 'models/academics';

	public $_current_user_id = FALSE;

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

	public function getUserID()
	{
		return $this->_current_user_id;
	}

	public function setUserID($users_id)
	{
		return $this->_current_user_id = $users_id;
	}

	public function getListall($args = array()){
		extract($args);
		$tests_model = ORM::factory("Academics_Tests");
		if (isset($standardized) && $standardized == 1){
			$tests_model->or_where('test_type', '= ','standardized');
		}else{
			$tests_model->or_where('test_type', '= ','unknown');//return null results
		}
		if (isset($ap) && $ap == 1){
			$tests_model->or_where('test_type', '= ', 'AP');
		}else{
			$tests_model->or_where('test_type', '= ','unknown');//return null results
		}
		//exclude itself
		$classes_arr = array('Academics_Tests' => 'academics_tests');
		$tests_model = ORM::_sql_exclude_deleted($classes_arr, $tests_model);
		return $tests_model;
	}

	public function getTestsByType($args = array()){
		extract($args);
		$tests_model = $this;
		if(!isset($users_id)) return false;
		$tests_model->_current_user_id = $users_id;

		$tests_model->select(DB::expr('distinct(academics_tests.id) as test_id'));
		$tests_model->where('academics_tests_scores.users_id', '=',$this->_current_user_id);
		$tests_model->and_where_open();

		if (isset($standardized) && $standardized == 1)
		{
			$tests_model->or_where('test_type', '= ','standardized');
		}
		else
		{
			$tests_model->or_where('test_type', '= ','unknown');//return null results
		}

		if (isset($ap) && $ap == 1)
		{
			$tests_model->or_where('test_type', '= ', 'AP');
		}
		else
		{
			$tests_model->or_where('test_type', '= ','unknown');//return null results
		}

		$tests_model->and_where_close();

		$tests_model->join("academics_tests_topics", "RIGHT")->on("academics_tests_topics.academics_tests_id", "=", 'academics_tests.id');
		$tests_model->join("academics_tests_scores", "RIGHT")->on("academics_tests_scores.academics_tests_topics_id", "=", 'academics_tests_topics.id');

		$classes_arr = array(
			'Academics_Tests' => 'academics_tests',
			'Academics_Tests_Topics' => 'academics_tests_topics',
			'Academics_Tests_Scores' => 'academics_tests_scores',
		);

		$tests_model = ORM::_sql_exclude_deleted($classes_arr, $tests_model);
		return $tests_model;
	}

	public function getTopics(){
		$arrs = $this->topics->find_all();
		$results = null;
		foreach($arrs as $topic)
		{
			$results[$topic->id] = array(
				"name" => $topic->subtopic
			);

			// If this test has a user associated with it get the score for that user
			if($this->_current_user_id)
			{
				$results[$topic->id]["score"] = $topic->getScore($this->_current_user_id);
			}
		}
		return $results;
	}

	public function getBasics($settings = array()){
		return array(
			'id' => $this->id,
			'name' => $this->name,
			'test_type' => $this->test_type,
			'description' => $this->description,
			'topics' => $this->getTopics()
		);
	}
}