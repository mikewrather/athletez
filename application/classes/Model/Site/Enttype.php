<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 1:17 AM
 */

class Model_Site_Enttype extends ORM
{

	protected $_table_name = 'enttypes';

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	static function getMyClass($enttypeID)
	{
		$oneofme = ORM::factory('Site_Enttype',$enttypeID);
		return $oneofme->class_name;
	}

	static function eFact($enttypeID,$objID=NULL)
	{
		$classname = self::getMyClass($enttypeID);
		return new $classname($objID);
	}

}