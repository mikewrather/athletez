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
			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist'),
			),
			'comment'=>array(
				array('not_empty'),
			),
		);
	}

	public function addComment( $args = array()){
		extract($args);
		if(isset($comment) && $comment != "")
		{
			$this->comment = $comment;
		}

		if(isset($id) && $id != "" )
		{
			$this->id = $id;
		}

		if(isset($subject_enttypes_id) && $subject_enttypes_id != "")
		{
			$this->subject_enttypes_id = $subject_enttypes_id;
		}

		if(isset($subject_id) && $subject_id != "")
		{
			$this->subject_id = $subject_id;
		}

		if(isset($users_id))
		{
			$this->users_id = $users_id;
		}

		try {
			$this->save();
			Model_Site_Feed::addToFeed($this);
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public static function getCommentsOn($ent)
	{
		if(!$ent->loaded()) return false;

		$classes_arr = array();
		$entClassStr = str_replace('Model_','',get_class($ent));
		$classes_arr[$entClassStr] = $ent->id; //added ->id to fix a problem with the games comments.
		$classes_arr['Site_Comment'] = 'site_comment.id';

		$comments = ORM::factory('Site_Comment')
			->where('subject_enttypes_id','=',Ent::getMyEntTypeID($ent))
			->and_where('subject_id','=',$ent->id);

		$comments = ORM::_sql_exclude_deleted_abstract($classes_arr, $comments);
		return $comments;
	}

	public static function getCommentsOf($user)
	{
		$users_id = is_object($user) ? $user->id : $user;

		$comments = ORM::factory('Site_Comment')
			->where('users_id','=',$users_id);

		$classes_arr = array(
			'Site_Comment' => 'site_comment'
		);

		$comments = ORM::_sql_exclude_deleted($classes_arr, $comments);
		return $comments;
	}

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(
			//'user_picture' => 'images_id'
		),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'users_obj' => 'user'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(
			'comment_date' => 'get_comment_date',
			'user_picture' => 'get_user_picture',
			'name' => 'get_name',
			'email' => 'get_email',
		),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function get_user_picture(){
		$images_id = $this->get_user_subject('user_picture');
		$image_model = ORM::factory('Media_Image', $images_id);
		return $image_model->getBasics();
	}

	public function get_name(){
		return $this->get_user_subject('name');
	}

	public function get_email(){
		return $this->get_user_subject('email');
	}

	public function get_comment_date(){
		return isset($this->timePosted) ? date('M jS, g:i a',strtotime($this->timePosted)) : date('M jS, g:i a');
	}

	public function get_user_subject($param){
		//This gets the subject of the vote.  It will be used to pull basic information
		$subject = $this->getSubject();
		$user_picture = null;
		$name = null;
		$email = null;
		if (!$subject){

		}else{
			$detail = $subject->getBasics();
			$user_picture = $detail['user_picture'];
			$name = $detail['name'];
			$email = $detail['email'];
		}
		return ${$param};
	}

	public function getBasics($settings = array())
	{
		//This gets the subject of the vote.  It will be used to pull basic information
		$subject = $this->getSubject();

		if (!$subject){
			$user_picture = null;
			$name = null;
			$email = null;
		}else{
			$detail = $subject->getBasics();
			$user_picture = $detail['user_picture'];
			$name = $detail['name'];
			$email = $detail['email'];
		}

//		return array(
//			"id" => $this->id,
//			"users_id" => $this->users_id,
//			"user" => $this->user->getBasics(),
//			"subject" => $subject->getBasics(),
//			"user_picture" => $user_picture,
//			"name" => $name,
//			'email' => $email,
//			"comment" => $this->comment,
//			"comment_date" => isset($this->timePosted) ? date('M jS, g:i a',strtotime($this->timePosted)) : date('M jS, g:i a')
//		);

		return parent::getBasics($settings);
	}

	public function name()
	{
		$subject = $this->getSubject();
		$name = $this->user->name();
		$name .= " on ";
		$name .= method_exists($subject,'name') ? $subject->name() : $subject->name;
		return $name;
	}
	//TODO, add by Jeffrey. There are $_belongs_to relationship. we need to deal with this later
	public function getUser(){
		$user = $this->user;
		//$classes_arr = array('User_Base' => 'users');
		//$user = ORM::_sql_exclude_deleted($classes_arr, $user);
		//print_r($user->find_all());
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
			return intval($user->id) == $this->owner();
		}else{
			return intval($user) == $this->owner();
		}
	}
}