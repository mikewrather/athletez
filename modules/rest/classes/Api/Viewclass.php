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

class Api_Viewclass
{

	protected $obj;

	protected $queryParams;
	protected $postParams;
	protected $putParams;

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

	public function setQueryParams($paramsArr)
	{
		$this->queryParams = $paramsArr;
	}

	public function setPostParams($paramsArr)
	{
		$this->postParams = $paramsArr;
	}

	public function setPutParams($paramsArr)
	{
		$this->putParams = $paramsArr;
	}

	public function post_addcomment()
	{
		$retArr = $this->obj->getBasics();

		return $retArr;
	}

}