<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/18/13
 * Time: 5:38 PM
 *
 * @author: Mike Wrather
 *
 */

class Viewclass
{

	protected $obj;

	static function factory($extention,$obj)
	{
		$prefix = 'View_Api_'.$extention;
		try
		{
			$newClass = new $prefix($obj);
		}
		catch(Exception $e)
		{
			return false;
		}
		return $newClass;
	}

	public function __construct($obj)
	{
		$this->obj = $obj;
	}

}