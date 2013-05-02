<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 1:07 AM
 */

class Model_Site_Vote extends Model_Site_Entdir
{
	
	protected $_table_name = 'votes';

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

			// voter_users_id (int)
			/*TODO, add by Jeffrey, developer need to set the value manually from the session*/
			'voter_users_id'=>array(
				array('not_empty'),
				array('digit'),
			),
		);
	}

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
	
	public function getBasics()
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

	public static function getNumVotes($obj, $subject_id){
		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$site_vote = ORM::factory("Site_Vote");
		$site_vote->where('subject_enttypes_id', '=', $subject_enttypes_id);
		$site_vote->where('subject_id', '=', $subject_id)->find_all()->as_array();
		$total_votes = count($site_vote);
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
			return invtal($user->id) == $this->owner();
		}else{
			return invtal($user) == $this->owner();
		}
	}
}