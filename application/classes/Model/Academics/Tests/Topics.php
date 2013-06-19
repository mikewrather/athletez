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

	public $error_message_path = 'models/academics/tests';

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

	public function getAllTopics($args = array()){
		extract($args);
		if (isset($test_id)){
			$this->where('academics_tests_id', '=', $test_id);
		}
		return $this;
	}

	public function getBasics(){
		//$test_obj = $this->test->getBasics();
		return array(
			'id' =>$this->id,
			'academics_tests_id' => $this->academics_tests_id,
			'subtopic' => $this->subtopic,
			'scores' => $this->getScore()
		);
	}

	private function getScore(){
		$score_obj = $this->scores->find_all();
		$results = null;
		foreach($score_obj as $score){
			$results[] = $score->as_array();
		}
		return $results;
	}

	public function name()
	{
		return $this->subtopic;
	}
}