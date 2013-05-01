<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 1:02 PM
 */

class Model_User_Followers extends ORM
{
	protected $_table_name = 'followers';

	public static function num_followers($followed_user_id){
		$followers = ORM::factory("User_Followers");
		$arr = $followers->where('followed_users_id', '=', $followed_user_id)->find_all()->as_array();
		if ($total = count($arr)){
			return $total;
		}
		return 0;
	}
}