<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 11/17/13
 * Time: 3:20 PM
 *
 * @author: Mike Wrather
 *
 */

class View_Api_Emailsent extends Api_Viewclass
{

	public function get_pingback()
	{
		return true;
	}

}