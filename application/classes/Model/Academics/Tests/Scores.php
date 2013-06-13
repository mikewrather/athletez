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

class Model_Academics_Tests_Scores extends ORM
{
	
	protected $_table_name = 'academics_tests_scores';

	public $error_message_path = 'models/academics/tests';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'topic' => array(
			'model' => 'Academics_Tests_Topics',
			'foreign_key' => 'academics_tests_topics_id'
		),
	);

	public function rules(){
		return array
		(
			'academics_tests_topics_id'=>array(
				array('not_empty'),
				array('academics_tests_topics_id_exist'),
			),

			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist')
			),

			'score'=>array(
				array('not_empty'),
				array('numeric')
			),
		);
	}

	public function addTestScore($args = array()){
		extract($args);
		if (isset($academics_tests_topics_id)){
			$this->academics_tests_topics_id = $academics_tests_topics_id;
		}

		if (isset($users_id)){
			$this->users_id = $users_id;
		}

		if (isset($score)){
			$this->score = $score;
		}
		try{
			$this->save();
			return $this;
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function updateTestScore($args = array()){
		extract($args);

		$score_model = ORM::factory("Academics_Tests_Scores");
		$result = $score_model->where('academics_tests_topics_id', '=', $academics_tests_topics_id);
		$result->where('users_id', '=', $users_id);
		$re = $result->find()->as_array();

		try{
			if (empty($re['id'])){
				//do create new row action
				$new_score_model = ORM::factory("Academics_Tests_Scores");
				$new_score_model->academics_tests_topics_id = $academics_tests_topics_id;
				$new_score_model->users_id = $users_id;
				$new_score_model->score = $score;
				$new_score_model->save();
				return $new_score_model;
			}else{
				$result->score = $score;
				$result->update();
				return $result;
			}
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getBasics(){
		return array(
			'id' => $this->id,
			'academics_tests_topics_id' => $this->academics_tests_topics_id,
			'users_id' => $this->users_id,
			'score' => $this->score,
		);
	}

	public function name()
	{
		if(!$this->loaded()) return "";
		$topic = $this->topic;
		$user = $this->user;
		$score = number_format($this->score,2);

		return $user->name().", ".$topic->name().": ".$score;

	}
}