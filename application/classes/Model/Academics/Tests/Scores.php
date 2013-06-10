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

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function name()
	{
		if(!$this->loaded()) return "";
		$topic = $this->topic->find();
		$user = $this->user->find();
		$score = number_format($this->score,2);

		return $user->name().", ".$topic->name().": ".$score;

	}
}