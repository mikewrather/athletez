<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 4/23/13
 * Time: 3:47 PM
 *
 * @author: Mike Wrather
 *
 */

class View_Api_Apitest extends Api_Viewclass
{

	public function get_testval()
	{
		$retArr = array(
			'testval' => $this->obj->testval
		);
		return $retArr;
	}

}