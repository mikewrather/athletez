<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 10/27/13
 * Time: 1:57 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_0ad91eb118b0 extends Controller
{

	public function action_index()
	{
		echo "called";
	}

	public function action_4fc996c2c6c6ec1()
	{
		//this does a true delete on stuff from the deleted table older than a day
		$deleted_things = ORM::factory('Site_Deleted')
			->where(DB::expr('COALESCE(timePosted,0)'),'<',DB::expr('CURDATE() - INTERVAL 2 DAY'))
			//->limit(5)
			->find_all();

		foreach($deleted_things as $thing)
		{
			echo "\n\n";
			$thing->delete_ent();
		}
	}
}