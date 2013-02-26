<?php defined('SYSPATH') or die('No direct script access.');

	/**
	 * $description
	 *
	 * Date: 2/18/13
	 * Time: 5:32 PM
	 *
	 * @author: Mike Wrather
	 *
	 */

class View_Api_Videoservice extends Viewclass
{

	public function basics()
	{
		return array(
			'name' => $this->obj->name,
			'webpage' => $this->obj->website
		);
	}

}