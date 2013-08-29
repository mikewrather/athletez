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

	public static function getConfigByClassName($classname)
	{
		$et_config = Kohana::$config->load('enttypes');
		$config_array = $et_config->get($classname);
		if(is_array($config_array)) return $config_array;
		return false;
	}

	public static function getConfigByID($id)
	{
		$et_config = Kohana::$config->load('enttypes-by-id');
		$config_array = $et_config->get($id);
		if(is_array($config_array)) return $config_array;
		return false;
	}

	public static function getConfigByID1($id1)
	{
		$et_config = Kohana::$config->load('enttypes-by-id1');
		$config_array = $et_config->get($id1);
		if(is_array($config_array)) return $config_array;
		return false;
	}

	static function getMyClass($enttypeID)
	{
		$config_array = self::getConfigByID($enttypeID);
		return is_array($config_array) ? $config_array['class_name'] : false;
	}

	static function getClassByID1($id1){
		$config_array = self::getConfigByID1($id1);
		return is_array($config_array) ? $config_array['class_name'] : false;
	}

	static function getMyTable($enttypeID)
	{
		$config_array = self::getConfigByID($enttypeID);
		return is_array($config_array) ? $config_array['db_table'] : false;
	}


	static function getObjectList($enttypeID)
	{
		$my_class = self::getMyClass($enttypeID);
		$result = ORM::factory($my_class);

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

		$config_array = self::getConfigByClassName($classname);
		return is_array($config_array) ? $config_array['id'] : false;
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

	static function get_obj_for_fk_name($fk_name,$id=FALSE)
	{

		$config_array = self::getConfigByID1($fk_name);

		if(is_array($config_array))
		{
			if($id)
			{
				$obj = ORM::factory($config_array['class_name'])->where('id','=',(int)$id)->find();
				if($obj->loaded())
				{
					return $obj;
				}
			}
			else
			{
				return true;
			}
		}
		return false;
	}

}