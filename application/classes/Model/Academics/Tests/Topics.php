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

	protected $_current_user_id = FALSE;

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
		return array(
			'id' =>$this->id,
			'academics_tests_id' => $this->academics_tests_id,
			'subtopic' => $this->subtopic,
			'scores' => $this->getScore()
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

	public function getScore($users_id = FALSE){

		if(!$users_id)
		{
			if($this->_current_user_id) $users_id = $this->_current_user_id;
			else return false;
		}

		$score_obj = $this->scores->where('users_id','=',$users_id)->find();
		if($score_obj->loaded())
		{
			return $score_obj->score;
		}
		return false;
	}

	public function name()
	{
		return $this->subtopic;
	}
}