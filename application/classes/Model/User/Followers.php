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

	/** This method takes in any type of object defined in enttypes and will find all users who are following.
	 * The controller that gets followers limits the use of this function
	 * to users and games, but this function makes no distinction.
	 *
	 * @param $obj is an ORM implementation of a specific instantiated enttype
	 * @return bool|stdClass returns false if object is not loaded and returns an object of
	 **/
	public static function get_followers($obj,$ret_type='users')
	{
		if(!$obj->loaded()) return false;

		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;

		$qry = DB::select('id','follower_users_id')
			->from('followers')
			->where('subject_enttypes_id','=',$subject_enttypes_id)
			->and_where('subject_id','=',$subject_id);

		$qry = ORM::_sql_exclude_deleted_abstract(array(
			str_replace('Model_','',get_class($obj)) => 'followers.subject_id'
		), $qry);

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
			elseif($ret_type=='both'){
				$user = ORM::factory('User_Base',$row['follower_users_id']);
				if($user->loaded())
				{
					$retObj->{$user->id} = array(

					);
				}

				$follow = ORM::factory('User_Followers',$row['id']);
				if($follow->loaded())
				{
					$retObj->{$follow->id} = $follow;
				}
			}
		}
		return $retObj;
	}

	public static function loopThroughFollowers($subject,$author,$obj,$feed,$type){
		$direct_followers = self::get_followers($subject,'follows');
		print_r($direct_followers);
		foreach($direct_followers as $follow)
		{
			// do nothing if the author is also the follower
			if($follow->follower_users_id == $author->id) continue;

			Model_Site_Feedfollow::addFeedFollow($feed->id,$follow->id);

			$args = array(
				'users_id' => $follow->follower_users_id,
				'to_address' => 'mike.wrather@gmail.com'
			);

			$queue = ORM::factory('Email_Queue');
			$queued = $queue->addToQueue($args);
			if(is_object($queued))
			{
				$pingBack = $_SERVER['SERVER_NAME'] . '/api/emailsent/pingback/' . $queued->uniqueString;
				$subjectline = self::genSubjectLine($type,$subject,$feed);
				$queued->setSubjectLine($subjectline);

				$subheader = View::factory('email/notification/content/subjectheader')
					->bind('subject',$subject_as_array = $subject->getBasics());

				$action = View::factory("email/notification/content/$type")
					->bind('obj',$obj_as_array = $obj->getBasics());

				$baseview = View::factory('email/notification/base')
					->bind('pingBack',$pingBack)
					->bind('doc_title',$subjectline)
					->bind('subject_header',$subheader->render())
					->bind('action_notification',$action->render());

				$queued->setMessageBody($baseview->render());

			}
		}
	}

	public static function processFeedItem($obj,$feed)
	{
		/*
		$enttype = ORM::factory('Site_Enttype',Ent::getMyEntTypeID($obj));
		$type = $enttype->api_name;

		$subject = $obj->getSubject();
		$author = $feed->getAuthor();

		if(is_array($subject)){
			foreach($subject as $this_subject){
				echo get_class($this_subject);
				self::loopThroughFollowers($this_subject,$author,$obj,$feed,$type);
			}
		}
		else{
			self::loopThroughFollowers($subject,$author,$obj,$feed,$type);
		}
		*/
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

	public static function genSubjectLine($type,$subject,$feed)
	{
		$sub_line = "Something Happened";
		switch($type)
		{
			case 'comment':
				$sub_line = "New Comment on " . self::getPageName($subject);
				break;
			case 'tag':
				$sub_line = "New Tag";
				break;
			case 'game':
				$sub_line = "New Game";
				break;
			case 'userteamslink':
				$sub_line = "New Team Member!";
				break;
			default:
				break;
		}

		return $sub_line;
	}

	public static function getPageName($entity)
	{
		$enttype = ORM::factory('Site_Enttype',Ent::getMyEntTypeID($entity));
		$type = $enttype->api_name;

		if($type=='user'){
			return $entity->name()."'s Profile";
		}

		if($type=='game'){
			return "The " . $entity->name() . "Page";
		}

		if($type=='media'){
			if($entity->media_type == 'image') return " an Image";
			elseif($entity->media_type == 'video') return " a Video";
		}
	}
}