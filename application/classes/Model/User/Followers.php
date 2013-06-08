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

	/**
	 * This method takes in any type of object defined in enttypes
	 * and will find all users who are following.
	 * The controller that gets followers limits the use of this function
	 * to users and games, but this function makes no distinction, so you
	 * could technically have people following a single "follow" instance (nonsense)
	 *
	 * @param $obj is an ORM implementation of a specific instantiated enttype
	 * @return bool|stdClass returns false if object is not loaded and returns an object of
	 */
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