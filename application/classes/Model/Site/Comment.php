<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 12:28 AM
 */

class Model_Site_Comment extends Model_Site_Entdir
{
	
	protected $_table_name = 'comments';

	public $error_message_path = 'models/site';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'enttype' => array(
			'model' => 'Site_Enttype'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function rules(){

		return array
		(
			// subject_enttypes_id (int)
			'subject_enttypes_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),

			// subject_id (int)
			'subject_id'=>array(
				array('not_empty'),
				array('digit'),
				array('subject_id_exist',array( ':validation', 'subject_enttypes_id', 'subject_id'))
			),
			/* TODO, add by Jeffrey. need to confirm
			// users_id (int)
			'users_id'=>array(
				array('not_empty'),
				array('digit'),
			),
			*/
			// comment (text)
			'comment'=>array(
				array('not_empty'),
			),
		);
	}

	public function addComment( $args = array()){
		extract($args);
		if(isset($comment))
		{
			$this->comment = $comment;
		}

		if(isset($id) && $id != "" )
		{
			$this->id = $id;
		}

		if(isset($subject_enttypes_id))
		{
			$this->subject_enttypes_id = $subject_enttypes_id;
		}

		if(isset($subject_id))
		{
			$this->subject_id = $subject_id;
		}

		if(isset($users_id))
		{
			$this->users_id = $users_id;
		}

		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}

	}

	public static function getCommentsOn($ent)
	{
		if(!$ent->loaded()) return false;

		$comments = ORM::factory('Site_Comment')
			->where('subject_enttypes_id','=',Ent::getMyEntTypeID($ent))
			->and_where('subject_id','=',$ent->id);

		return $comments;
	}

	public static function getCommentsOf($user)
	{
		$users_id = is_object($user) ? $user->id : $user;

		$comments = ORM::factory('Site_Comment')
			->where('users_id','=',$users_id);

		return $comments;
	}

	public function getBasics()
	{
		//This gets the subject of the vote.  It will be used to pull basic information
		$subject = $this->getSubject();

		return array(
			"id" => $this->id,
			"users_id" => $this->users_id,
			"user" => $this->user->getBasics(),
			"subject" => $subject->getBasics(),
			"comment" => $this->comment,
			"comment_date" => isset($this->timePosted) ? date('M jS, g:i a',strtotime($this->timePosted)) : date('M jS, g:i a')
		);
	}

	public function name()
	{
		$subject = $this->getSubject();
		$name = $this->user->name();
		$name .= " on ";
		$name .= method_exists($subject,'name') ? $subject->name() : $subject->name;
		return $name;
	}

	public function getUser(){
		$user = $this->user;
		return $user;
	}

	public static function getNumComments($obj){
		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;
		$site_comment = ORM::factory("Site_Comment");
		$site_comment->where('subject_enttypes_id', '=', $subject_enttypes_id);
		$result = $site_comment->where('subject_id', '=', $subject_id)->find_all()->as_array();
		$total_comments = count($result);
		if ($total_comments){
			return intval($total_comments);
		}
		return 0;
	}

	public function owner(){
		if(!$this->id){
			return "";
		}
		return intval($this->users_id);
	}

	public function is_owner($user){
		if (is_object($user)){
			return invtal($user->id) == $this->owner();
		}else{
			return invtal($user) == $this->owner();
		}
	}
}