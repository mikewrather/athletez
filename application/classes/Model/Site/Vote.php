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

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(
			'voter_users_id' => 'users_id'
		),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'voter_users_obj' => 'voter'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(
			'subject' => 'get_subject'
		),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function get_subject(){
		return $this->getSubject()->getBasics();
	}

	public function getBasics($settings = array())
	{
		//This gets the subject of the vote.  It will be used to pull basic information
//		$subject = $this->getSubject();
//
//		return array(
//			"id" => $this->id,
//			"subject" => $subject->getBasics(),
//			"voter_users_id" => $this->voter_users_id,
//			"voter" => $this->voter->getBasics()
//		);

		return parent::getBasics($settings);
	}

	public function addVote($args = array()){
		extract($args);
		$check = ORM::factory('Site_Vote');

		if(stristr(Ent::getClassByID($subject_type_id),'image') || stristr(Ent::getClassByID($subject_type_id),'video')){
			$subject_child = Ent::eFact($subject_type_id,$subject_id);
			if(is_object($subject_child) && is_subclass_of($subject_child,'ORM') && $subject_child->loaded()){
				$subject = $subject_child->media;
				$subject_type_id = Ent::getMyEntTypeID('Media_Base');
				$subject_id = $subject->id;
			}
		}

		if(isset($subject_type_id))
		{
			$this->subject_enttypes_id = $subject_type_id;
			$check->where('subject_enttypes_id','=',$subject_type_id);
		}

		if(isset($subject_id))
		{
			$this->subject_id = $subject_id;
			$check->where('subject_id','=',$subject_id);
		}

		if(isset($voter_users_id))
		{
			$this->voter_users_id = $voter_users_id;
			$check->where('voter_users_id','=',$voter_users_id);
		}

		if(isset($media_id))
		{
			$this->media_id = $media_id;
			$check->where('media_id','=',$media_id);
		}

		$check = ORM::_sql_exclude_deleted(array('Site_Vote'=>'site_vote'),$check);
		$result = $check->find();

		if($result->loaded()){
			return $result;
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
			$has_admin = $user->has('roles', ORM::factory('Role', array('id' =>2)));
			if($has_admin) return true;
			return intval($user->id) == $this->owner();
		}else{
			return intval($user) == $this->owner();
		}
	}

	public function name(){ return ""; }
}