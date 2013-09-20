<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 9/18/13
 * Time: 12:22 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Sport extends Controller
{


	public function action_index()
	{

		$sports = ORM::factory('Sportorg_Sport')
			->where('male','=',1)
			->and_where('female','=',0)
			->find_all();

		foreach($sports as $sport)
		{
			$sport->consolidate();
		}

	}
	
}