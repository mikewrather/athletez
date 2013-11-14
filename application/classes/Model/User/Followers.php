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

		$total_followers = DB::select(array(DB::expr('COUNT(id)'),'num_followers'))->from('followers')
			->where('subject_enttypes_id', '=', $subject_enttypes_id)
			->where('subject_id', '=', $subject_id)
			->execute()
			->get('num_followers',0);

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

				$subject = $obj->getSubject();
				$poster = $obj->getUser();

				//check for followers of poster
				$direct_followers = self::get_followers($poster,'follows');
				foreach($direct_followers as $follow)
				{
					if($follow->follower_users_id == $poster->id) continue;

					Model_Site_Feedfollow::addFeedFollow($feed->id,$follow->id);
					$args = array(
						'users_id' => $follow->follower_users_id,
						'subject_line' => $poster->name()." Left a Comment.",
						'to_address' => "mike.wrather@gmail.com",
						'message_body' => self::constructEmail($obj,$subject,$type)
					);
					$queue = ORM::factory('Email_Queue');
					$queue->addToQueue($args);
				}

				//check for followers of subject
				$direct_followers = self::get_followers($subject,'follows');
				foreach($direct_followers as $follow)
				{
					if($follow->follower_users_id == $poster->id) continue;

					Model_Site_Feedfollow::addFeedFollow($feed->id,$follow->id);
					$args = array(
						'users_id' => $follow->follower_users_id,
						'subject_line' => $poster->name()." Left a Comment.",
						'to_address' => "mike.wrather@gmail.com",
						'message_body' => self::constructEmail($obj,$subject,$type)
					);
					$queue = ORM::factory('Email_Queue');
					$queue->addToQueue($args);
				}

				break;
			case 'tag':

				//get tag subject
				$subject = $obj->getSubject();
				$poster = $subject['tagger'];

				//Find any follows of this subject
				$direct_followers = self::get_followers($subject,'follows');
				foreach($direct_followers as $follow)
				{
					Model_Site_Feedfollow::addFeedFollow($feed->id,$follow->id);
					$args = array(
						'users_id' => $follow->follower_users_id,
						'subject_line' => $poster->name()." Tagged something you follow.", //TODO: replace this with a real subject line
						'to_address' => "mike.wrather@gmail.com",
						'message_body' => self::constructEmail($obj,$subject,$type)
					);
					$queue = ORM::factory('Email_Queue');
					$queue->addToQueue($args);
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

	protected static function constructEmail($obj,$sub,$type)
	{

		$enttype = ORM::factory('Site_Enttype',Ent::getMyEntTypeID($sub));
		$subtype = $enttype->api_name;
		$subject = $sub->getBasics();

		switch($subtype)
		{
			case 'user':
				$subject['title'] = $subject['name'];
				break;
			case 'game':

				$subject['title'] = $subject['event_name'] != "" ? $subject['event_name'] : false;
				if(!$subject['title'] && !empty($subject['teams'])){
					$subject['title'] = "";
					foreach($subject['teams'] as $team){
						$subject['title'] .= $team['org_name'] . " vs ";
					}
					$subject['title'] = rtrim($subject['title'],' vs ');
				}
				break;
			case 'media':
			//	if($subject);
				break;
			case 'image':
				break;
			case 'video':

				break;
			case 'gamematch':
				break;
			case 'team':
				$subject['title'] = $subject['team_name'];
				break;
			default:
				break;
		}

	//	print_r($sub->getBasics());
		$subheader = View::factory('email/notification/content/subjectheader')
			->bind('subject',$subject);

		$action = View::factory("email/notification/content/$type")
			->bind('comment',$obj->getBasics());

		$email_reason = "I said so";
		$pingback = "http://athletez.com/api/emailsent/pingback/";

		$baseview = View::factory('email/notification/base')
			->bind('subject_header',$subheader->render())
			->bind('action_notification',$action->render())
			->bind('email_reason',$email_reason)
			->bind('pingback',$pingback);

		return $baseview->render();
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