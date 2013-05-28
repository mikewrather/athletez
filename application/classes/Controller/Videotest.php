<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 5/28/13
 * Time: 1:02 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Videotest extends Controller_Template
{

	public function action_index()
	{

		$sports = ORM::factory('Sportorg_Sport')->find_all();
		$this->template->content = View::factory('videoup')
			->bind('sports',$sports);
	}
	
}