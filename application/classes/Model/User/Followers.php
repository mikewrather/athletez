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

	public function getBasics($settings = array())
	{
		if(!$this->loaded()) return false;

		$follower = ORM::factory('User_Base',$this->follower_users_id);
		$subject = Ent::eFact($this->subject_enttypes_id,$this->subject_id);

		return array(
			"id" => $this->id,
			"subject" => $subject->getBasics(),
			"follower" => $follower->getBasics(),
		);
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
	public static function get_followers($obj,$ret_type='users')
	{
		if(!$obj->loaded()) return false;

		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;

		$qry = DB::select('id','follower_users_id')
			->from('followers')
			->where('subject_enttypes_id','=',$subject_enttypes_id)
			->and_where('subject_id','=',$subject_id);


		$classes_arr = array();
		$entClassStr = str_replace('Model_','',get_class($obj));
		$classes_arr[$entClassStr] = 'followers.subject_id';

		$qry = ORM::_sql_exclude_deleted_abstract($classes_arr, $qry);

//		$classes_arr = array();
//		$entClassStr = str_replace('Model_','',get_class($obj));
//		$classes_arr[$entClassStr] = $obj;
//
//		$qry = ORM::_sql_exclude_deleted_abstract($classes_arr, $qry);


		$classes_arr = array();
		$entClassStr = str_replace('Model_','',get_class($obj));
		$classes_arr[$entClassStr] = 'followers.subject_id';

		$qry = (ORM::_sql_exclude_deleted_abstract($classes_arr, $qry));
		$retObj = new stdClass();
		foreach($qry->execute() as $row)
		{
			if($ret_type=='users')
			{
				$user = ORM::factory('User_Base',$row['follower_users_id']);
				if($user->loaded())
				{
					$retObj->{$user->id} = $user;
				}
			}
			elseif($ret_type=='follows')
			{
				$follow = ORM::factory('User_Followers',$row['id']);
				if($follow->loaded())
				{
					$retObj->{$follow->id} = $follow;
				}
			}
		}
		return $retObj;
	}

	public static function processFeedItem($obj,$feed)
	{
		$enttype = ORM::factory('Site_Enttype',Ent::getMyEntTypeID($obj));
		$type = $enttype->api_name;

		switch($type)
		{
			case 'comment':

				//check for followers of poster
				$poster = $obj->getUser();
				$direct_followers = self::get_followers($poster,'follows');
				foreach($direct_followers as $follow)
				{
					Model_Site_Feedfollow::addFeedFollow($feed->id,$follow->id);
				}

				//check for followers of subject
				$subject = $obj->getSubject();
				$direct_followers = self::get_followers($subject,'follows');
				foreach($direct_followers as $follow)
				{
					Model_Site_Feedfollow::addFeedFollow($feed->id,$follow->id);
				}

				break;
			case 'tag':

				//get tag subject
				$subject = $obj->getSubject();

				//Find any follows of this subject
				$direct_followers = self::get_followers($subject,'follows');

				foreach($direct_followers as $follow)
				{
					Model_Site_Feedfollow::addFeedFollow($feed->id,$follow->id);
				}

				//check if the tag is resume data val
				if(get_class($subject)=='Model_User_Resume_Data_Vals')
				{

				}
				break;
			case 'resumedataval':
				break;
			case 'statval':
				break;
			case 'game':
				break;
			case 'gamematch':
				break;
			default:
				break;
		}


	}

	public function addFollower(Model_User_Base $user, ORM $object)
	{
		if(!$object->loaded()) return false;

		$subject_enttypes_id = Ent::getMyEntTypeID($object);

		//Delete matching rows
		DB::delete('followers')
			->where('follower_users_id','=',$user->id)
			->where('subject_enttypes_id','=',$subject_enttypes_id)
			->where('subject_id','=',$object->id)
			->execute();

		$this->subject_enttypes_id = $subject_enttypes_id;
		$this->subject_id = $object->id;
		$this->follower_users_id = $user->id;

		$this->save();
		return $this->id;
	}
}