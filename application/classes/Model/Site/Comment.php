<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 12:28 AM
 */

class Model_Site_Comment extends Model_Site_Entdir
{
	
	protected $_table_name = 'comments';

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


}