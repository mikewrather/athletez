<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 1:07 AM
 */

class Model_Site_Vote extends Model_Site_Entdir
{
	
	protected $_table_name = 'votes';

	public $error_message_path = 'models/site';

	protected $_belongs_to = array(
		'voter' => array(
			'model' => 'User_Base',
			'foreign_key' => 'voter_users_id'
		),
		'enttype' => array(
			'model' => 'Site_Enttype',
			'foreign_key' => 'subject_enttypes_id'
		)
	);

	public function rules(){

		return array
		(
			// subject_enttypes_id (int)
			'subject_enttypes_id'=>array(
				array('not_empty'),
				array('digit'),
			),

			// subject_id (int)
			'subject_id'=>array(
				array('not_empty'),
				array('digit'),
				array('subject_id_exist',array( ':validation', 'subject_enttypes_id', 'subject_id'))
			),

			'voter_users_id'=>array(
				array('not_empty'),
				array('users_id_exist'),
			),
		);
	}

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
	
	public function getBasics($settings)
	{
		//This gets the subject of the vote.  It will be used to pull basic information
		$subject = $this->getSubject();

		return array(
			"id" => $this->id,
			"subject" => $subject->getBasics(),
			"voter_users_id" => $this->voter_users_id,
			"voter" => $this->voter->getBasics()
		);
	}

	public function addVote($args = array()){
		extract($args);
		if(isset($subject_type_id))
		{
			$this->subject_enttypes_id = $subject_type_id;
		}

		if(isset($subject_id))
		{
			$this->subject_id = $subject_id;
		}

		if(isset($voter_users_id))
		{
			$this->voter_users_id = $voter_users_id;
		}

		if(isset($media_id))
		{
			$this->media_id = $media_id;
		}

		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public static function getNumVotes($obj){
		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;
		$site_vote = ORM::factory("Site_Vote");
		$site_vote->where('subject_enttypes_id', '=', $subject_enttypes_id);
		$result = $site_vote->where('subject_id', '=', $subject_id)->find_all()->as_array();
		$total_votes = count($result);
		if ($total_votes){
			return intval($total_votes);
		}
		return 0;
	}

	public function owner(){
		if(!$this->id){
			return "";
		}
		return intval($this->voter_users_id);
	}

	public function is_owner($user){
		if (is_object($user)){
			return intval($user->id) == $this->owner();
		}else{
			return intval($user) == $this->owner();
		}
	}

	public function name(){ return ""; }
}