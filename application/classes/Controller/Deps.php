<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 7/8/13
 * Time: 4:09 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Deps extends Controller
{

	public function action_index()
	{
		$media_item = ORM::factory('Media_Base',1475);
		$media_item->delete_with_deps();
	}
	
}