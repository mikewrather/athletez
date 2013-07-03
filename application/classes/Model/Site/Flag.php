<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 7/3/13
 * Time: 1:13 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Flag extends ORM
{
	
	protected $_table_name = 'flags';
	

	protected $_belongs_to = array(
		'flagger' => array(
			'model' => 'User_Base',
			'foreign_key' => 'flagger_users_id'
		),
		'resolver' => array(
			'model' => 'User_Base',
			'foreign_key' => 'resolver_users_id'
		),
		'enttype' => array(
			'model' => 'Site_Enttype',
			'foreign_key' => 'subject_enttypes_id'
		)
	);


	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function addFlag($obj,$user=FALSE)
	{
		//Verify $obj is loaded
		if(!$obj->loaded()) return false;

		if(!$user)
		{
			//Get logged in user
			$user = Auth::instance()->get_user();
			if(!$user->loaded()) return false;
		}

		//Add Tag
		$this->flagger_users_id = $user->id;
		$this->subject_enttypes_id = Ent::getMyEntTypeID($obj);
		$this->subject_id = $obj->id;
		$this->save();

		return $this;
	}

	public static function resolve($flag)
	{
		if(get_class($flag) != get_class(self))
		{
			$_this = ORM::factory('Site_Flag',$flag);
		}

		if(!$_this->loaded()) return false;

		$resolver = $user = Auth::instance()->get_user();

		$_this->resolved = 1;
		$_this->resolver_users_id = $resolver->id;
		$_this->save();

	}

	public function getObject()
	{
		if(!$this->loaded()) return false;
		$obj = Ent::eFact($this->subject_enttypes_id,$this->subject_id);
		if(!$obj->loaded()) return false;
		return $obj;
	}
}