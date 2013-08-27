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
		$et_config = Kohana::$config->load('enttypes-by-id');
		$oneofme = $et_config->get($enttypeID);
		if(is_array($oneofme)) return $oneofme['class_name'];
		return false;
	}

	static function getClassByID1($id1){
		$ent_model = ORM::factory('Site_Enttype');
		$result = $ent_model->where('id1', '=', $id1)->find();
		if (isset($result->class_name)){
			return $result->class_name;
		}
		return null;
	}

	static function getMyTable($enttypeID)
	{
		$et_config = Kohana::$config->load('enttypes-by-id');
		$oneofme = $et_config->get($enttypeID);
		if(is_array($oneofme)) return $oneofme['db_table'];
		return false;
	}


	static function getObjectList($enttypeID)
	{
		$my_class = self::getMyClass($enttypeID);
		$result = ORM::factory($my_class);

	//	$classes_arr = array(
	//		$my_class => self::getMyTable($enttypeID)
	//	);

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

		$et_config = Kohana::$config->load('enttypes');
		$oneofme = $et_config->get($classname);
		if(is_array($oneofme)) return $oneofme['id'];
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

	static function get_obj_for_fk_name($fk_name,$id=FALSE)
	{

		$et_config = Kohana::$config->load('enttypes-by-id1');
		$ent = $et_config->get($fk_name);

		if(is_array($ent))
		{
			if($id)
			{
				$obj = ORM::factory($ent['class_name'])->where('id','=',(int)$id)->find();
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