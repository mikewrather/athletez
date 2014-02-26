<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 1:02 PM
 */

class Model_User_Followers extends ORM
{
	protected $_table_name = 'followers';

	protected $_belongs_to = array(
		"user" => array(
			"model" => "User_Base",
			"foreign_key" => "follower_users_id"
		)
	);

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
	public static function get_followers($obj,$ret_type='users',$visible_only=true)
	{
		if(!is_object($obj) || !$obj->loaded()) return false;

		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;

		$qry = DB::select('id','follower_users_id')
			->from('followers')
			->where('subject_enttypes_id','=',$subject_enttypes_id)
			->and_where('subject_id','=',$subject_id);

		if($visible_only) $qry->and_where('visible_fan','=',1);

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
		$direct_followers = self::get_followers($subject,'follows',false);
	//	print_r($direct_followers);
		if(!$direct_followers) return false;
		foreach($direct_followers as $follow)
		{
			// do nothing if the author is also the follower
			if($follow->follower_users_id == $author->id) continue;

			Model_Site_Feedfollow::addFeedFollow($feed->id,$follow->id);

			$args = array(
				'users_id' => $follow->follower_users_id,
				'to_address' => $follow->user->email
			//	'to_address' => 'mike@athletez.com'
			);

			$queue = ORM::factory('Email_Queue');
			$queued = $queue->addToQueue($args);
			if(is_object($queued))
			{
				$pingBack = $_SERVER['SERVER_NAME'] . '/api/emailsent/pingback/' . $queued->uniqueString;
				$subjectline = self::genSubjectLine($type,$subject,$feed,$obj,$author);
				$queued->setSubjectLine($subjectline);

				if($feed->hasAction(array('feedparent')) && $feedparent = $feed->getFeedParent()){
					$obj = $feedparent->getFeedObject();
					$subject_parent = $obj->getSubject();
					$enttype = ORM::factory('Site_Enttype',Ent::getMyEntTypeID($obj));
					$type = $enttype->api_name;
				}

				$obj_as_array = $obj->getBasics();
				$use_feed = $feedparent ? $feedparent : $feed;
				$use_subject = $subject_parent ? $subject_parent : $subject;

				$subject_as_array = $use_subject->getBasics();

				$subheader = View::factory('email/notification/content/subjectheader')
					->bind('subject',$subject_as_array)
					->bind('sub_obj',$use_subject);

				$backlink = self::genBackLink($type,$subject,$obj);

				try{
					$action = View::factory("email/notification/content/$type")
						->bind('obj',$obj_as_array)
						->bind('obj_full',$obj)
						->bind('subject',$use_subject)
						->bind('feed',$use_feed)
						->bind('queued',$queued);
				}
				catch (Exception $e)
				{
					$queued->delete();
					continue;
				}

				$sub_header = $subheader->render();
				$action_not = $action->render();
				$baseview = View::factory('email/notification/base')
					->bind('email_reason',$follow->reason)
					->bind('pingBack',$pingBack)
					->bind('doc_title',$subjectline)
					->bind('backlink',$backlink)
					->bind('subject_header',$sub_header)
					->bind('action_notification',$action_not);

				$queued->setMessageBody($baseview->render());

			}

		}

		//here we need to do indirect followers

	}

	public static function processFeedItem($obj,$feed)
	{


		$enttype = ORM::factory('Site_Enttype',Ent::getMyEntTypeID($obj));
		$type = $enttype->api_name;

		if($type == 'image' && $feed->hasAction('userpic')){
			$obj = $obj->media;
			$type='media';
		}

		try{

			$subject = $obj->getSubject();
			$author = $feed->getAuthor();

			if(is_array($subject))
			{
				foreach($subject as $this_subject)
				{
					self::loopThroughFollowers($this_subject,$author,$obj,$feed,$type);
				}
			}
			else{
				self::loopThroughFollowers($subject,$author,$obj,$feed,$type);
			}

			$feed->processed = 1;
			@$feed->save();
		} catch (Exception $e){ print_r($e); }

	}

	public function addFollower(Model_User_Base $user, ORM $object,$visible=false,$reason=false)
	{
		if(!$object->loaded()) return false;

		$subject_enttypes_id = Ent::getMyEntTypeID($object);
		if(!$reason) $reason = "you're following this ".Ent::getMyTypeName($subject_enttypes_id);

		//Delete matching rows
		DB::delete('followers')
			->where('follower_users_id','=',$user->id)
			->where('subject_enttypes_id','=',$subject_enttypes_id)
			->where('subject_id','=',$object->id)
			->execute();

		$this->subject_enttypes_id = $subject_enttypes_id;
		$this->subject_id = $object->id;
		$this->follower_users_id = $user->id;
		$this->visible_fan = $visible;
		$this->reason = $reason;

		$this->save();
		return $this->id;
	}

	public static function genSubjectLine($type,$subject,$feed,$obj,$author)
	{

		$sub_line = "Something Happened " . $type;
		switch($type)
		{
			case 'comment':
				$sub_line = "New Comment on " . self::getPageName($subject);
				break;
			case 'tag':
				$sub_line = $subject->name() . " Tagged in a(n) ". $obj->media->media_type;
				break;
			case 'media':
				$sub_line = $author->name() . " tagged an image you're in.";
				if($feed->hasAction(array('userpic')))
				{
					$hisorher = $subject->user->gender=='M' ? 'his' : 'her';
					$sub_line = $subject->name()." updated $hisorher Profile Image";
				}
				break;
			case 'game':
				if($feed->hasAction(array('comment'))) $sub_line = $subject->name()." has a new comment on the game page!";
				elseif($feed->hasAction(array('added'))) $sub_line = "New Event: ".$subject->name();
				else if($feed->hasAction(array('update','name'))) $sub_line = "Event Name has been changed";
				else if($feed->hasAction(array('update','score'))) $sub_line = "Score updated for " . $subject->name();
				else if($feed->hasAction(array('update','day')) || $feed->hasAction(array('update','time'))) $sub_line = "Scheduling change for " . $subject->name();
				else if($feed->hasAction(array('update','location'))) $sub_line = "Change of venue for " . $subject->name();
				break;
			case 'team':
				if($feed->hasAction(array('comment'))) $sub_line = $subject->name()." has a new comment on the game page!";
				else if($feed->hasAction(array('added'))) $sub_line = $subject->name()." added a new game to its schedule";
				else if($feed->hasAction(array('update','name'))) $sub_line = "Event Name has been changed";
				else if($feed->hasAction(array('update','score'))) $sub_line = "Score updated for " . $subject->name(). " game";
				else if($feed->hasAction(array('update','day')) || $feed->hasAction(array('update','time'))) $sub_line = "Scheduling change for " . $subject->name(). " game";
				else if($feed->hasAction(array('update','location'))) $sub_line = "Change of venue for " . $subject->name(). " game";

				break;
			case 'gameteamlink':
				if($feed->hasAction('added')){
					$sub_line = $subject->name()." has a new game on its schedule";
				}
				break;
			case 'userteamslink':
				$sub_line = $subject->name() . " joined " . $obj->team->name();
				break;
			default:
				break;
		}

		return $sub_line;
	}

	public static function genBackLink($type,$subject,$obj)
	{
		$enttype = ORM::factory('Site_Enttype',Ent::getMyEntTypeID($subject));
		$subjecttype = $enttype->api_name;
		$backlink = "http://athletez.com";

		switch($subjecttype)
		{
			case 'user':
				if($type=='userteamslink'){
					$backlink .= "/#!team/".$obj->team->id;
				}
				elseif($type=='tag'){
					$backlink .= "/#!home/media/".$obj->media->id;
				}
				else{
					$backlink .= "/#!profile/".$subject->id;
				}
				break;
			case 'tag':
				$backlink .= "/#!home/".$subject->id;
				break;
			case 'game':
				$backlink .= "/#!game/".$subject->id;
				break;
			case 'userteamslink':
				$backlink .= "/#!team/".$subject->id;
				break;
			case 'media':
				$backlink .= "/#!home/media/".$subject->id;
				break;
			default:
				break;
		}

		return $backlink;
	}

	public static function getPageName($entity)
	{
		$enttype = ORM::factory('Site_Enttype',Ent::getMyEntTypeID($entity));
		$type = $enttype->api_name;

		if($type=='user'){
			return $entity->name()."'s Profile";
		}

		if($type=='game'){
			return "The " . $entity->name() . " Event Page";
		}

		if($type=='team'){
			return "The " . $entity->name() . " Team Page";
		}

		if($type=='media'){
			if($entity->media_type == 'image') return " an Image";
			elseif($entity->media_type == 'video') return " a Video";
		}
	}
}