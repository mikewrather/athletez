<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 1:17 AM
 */

class Model_Site_Enttype extends ORM
{

	protected $_table_name = 'enttypes';

	protected $_has_many = array(
		'fields' => array(
			'model' => 'Site_Enttype_Field',
			'foreign_key' => 'enttypes_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	static function getMyClass($enttypeID)
	{
		$oneofme = ORM::factory('Site_Enttype',$enttypeID);
		return $oneofme->class_name;
	}

	static function getMyTable($enttypeID)
	{
		$oneofme = ORM::factory('Site_Enttype',$enttypeID);
		return $oneofme->db_table;
	}


	static function getObjectList($enttypeID)
	{
		$my_class = self::getMyClass($enttypeID);
		$result = ORM::factory($my_class);

		$classes_arr = array(
			$my_class => self::getMyTable($enttypeID)
		);

		$classes_arr = array(
			$my_class => strtolower($my_class)
		);

		$result = ORM::_sql_exclude_deleted($classes_arr,$result);
		return $result;

	}

	/**
	 * @static
	 * @param $class - can be an object or a classname
	 * @return mixed
	 */
	static function getMyEntTypeID($class)
	{
		$classname = is_object($class) ? get_class($class) : (string)$class;
		$classname = str_replace('Model_','',$classname);
		$oneofme = ORM::factory('Site_Enttype')->where('class_name','=',$classname)->find();
		if($oneofme->loaded()) return $oneofme->id;
		return false;
	}

	static function eFact($enttypeID,$objID=NULL)
	{
		$classname = "Model_".self::getMyClass($enttypeID);
		return new $classname($objID);
	}

	static function eFactORMList($enttypeID)
	{
		return ORM::factory(self::getMyClass($enttypeID));
	}

	static function is_follower($obj, $user_id = ""){
		$follower = ORM::factory('User_Followers');
		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;
		if ($user_id == ""){
			$user = Auth::instance()->get_user();
			$user_id = $user->id;
		}

		$follower->where('subject_enttypes_id', '=', $subject_enttypes_id);
		$follower->and_where('subject_id', '=', $subject_id);
		$follower->and_where('follower_users_id', '=', $user_id)->find();
		if ($follower->loaded()){
			return true;
		}else{
			return false;
		}
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,			
			"api_name" => $this->api_name,
			"class_name" => $this->class_name,
			"db_table" => $this->db_table,
			"description" => $this->description
		);
	}


}