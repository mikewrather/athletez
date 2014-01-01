<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Controller simply passes index and backbone will take care of routing.
 *
 * Date: 7/20/13
 * Time: 4:58 PM
 *
 * @author: Yashpal Wadhwa
 *
 */

class Controller_Tag extends Standardpage{

	public function action_updatefeed()
	{
		db::delete('feed')->where('enttypes_id','=',0)->or_where('ent_id','=',0)->execute();
		$feed = ORM::factory('Site_Feed')->find_all();

		foreach($feed as $item)
		{
			$test = @unserialize($item->action);
			if ($item->action !== 'b:0;' && $test === false) {
				$arr = array($item->action);
				$item->action = serialize($arr);
				$item->save();
			}
			else
			{
				echo "already serialized\n";
			}
		}
	}
}