<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 3/20/13
 * Time: 3:17 AM
 *
 * @author: Mike Wrather
 *
 */

class Admin_View_Entlist
{

	public function ents()
	{
		$ents = ORM::factory('Site_Enttype')->find_all();
		$ents_arr = array();

		foreach($ents as $ent)
		{
			$ents_arr[] = array(
				"id" => $ent->id,
				"name"=>$ent->name,
				"desc" => $ent->description
			);
		}
		return $ents_arr;
	}
}