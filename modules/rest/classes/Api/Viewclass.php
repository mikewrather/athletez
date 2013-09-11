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

	public function post_addvideo()
	{
		return $this->obj->getBasics();
	}

	public function post_addimage()
	{
		return $this->obj->getBasics();
	}

	/**
	 * get_followers() Get followers on a specific subject
	 *
	 * @retun array
	 */
	public function get_followers()
	{
		$retArr = null;

	//	print_r($this->obj);

		foreach($this->obj as $user)
		{
			if(is_object($user)) $retArr[] = $user->getBasics();
		}
		return $retArr;
	}

	public function post_follow()
	{
		return $this->obj->getBasics();
	}

	public function post_flag()
	{
		return $this->obj->getBasics();
	}

	public function get_tags()
	{
		$retArr = array();
		foreach($this->obj as $obj) { if(is_object($obj)) $retArr[] = $obj->getBasics(); }
		return $retArr;
	}

	public function get_commentson()
	{
		$retArr = array();

		foreach($this->obj->find_all() as $obj) { if(is_object($obj)) $retArr[] = $obj->getBasics(); }
		return $retArr;
	}

	public function get_comments()
	{
		return $this->get_commentson();
	}

	public function get_media()
	{
		$media = $this->obj->result;
		return $media;
	}
}