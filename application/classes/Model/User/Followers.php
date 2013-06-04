<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 1:02 PM
 */

class Model_User_Followers extends ORM
{
	protected $_table_name = 'followers';

	public static function num_followers($obj){
		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;
		$followers = ORM::factory("User_Followers");
		$followers->where('subject_enttypes_id', '=', $subject_enttypes_id);
		$followers->where('subject_id', '=', $subject_id)->find_all()->as_array();
		$total_followers = count($followers);
		if ($total_followers){
			return intval($total_followers);
		}
		return 0;
	}

	public static function get_followers($obj)
	{
		if(!$obj->loaded()) return false;

		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;

		$qry = DB::select('follower_users_id')
			->from('followers')
			->where('subject_enttypes_id','=',$subject_enttypes_id)
			->and_where('subject_id','=',$subject_id)
			->execute();
		$retObj = new stdClass();

		foreach($qry as $row)
		{
			$user = ORM::factory('User_Base',$row['follower_users_id']);
			if($user->loaded())
			{
				$retObj->{$user->id} = $user;
			}
		}
		return $retObj;
	}
}