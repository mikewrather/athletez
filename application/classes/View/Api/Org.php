<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/26/13
 * Time: 2:05 AM
 *
 * @author: Mike Wrather
 *
 */

class View_Api_Org extends Viewclass
{

	public function basics()
	{
		$retArr = array(
			'name' => $this->obj->name
		);
		return $retArr;
	}

}