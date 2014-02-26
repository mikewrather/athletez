<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 6/20/13
 * Time: 10:17 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Feed extends ORM
{
	
	protected $_table_name = 'feed';

	protected $_feed_object;

	protected $_following_user;

	protected $action_array;
	

	public function __construct($id=NULL)
	{
		parent::__construct($id);
		if($this->loaded()) $this->populateFeedObject();
	}

	protected function populateFeedObject()
	{
		if(!$this->loaded()) return false;

		$this->_feed_object = Ent::eFact($this->enttypes_id,$this->ent_id);

		if(is_object($this->_feed_object) && $this->_feed_object->loaded()) return $this->_feed_object;
	}

	public function setUser($users_id)
	{
		if(is_numeric($users_id))
		{
			$user = ORM::factory('User_Base',$users_id);
			if(!$user->loaded()) return false;
		}
		elseif(is_object($users_id) && (get_class($users_id) == 'Model_User_Base') && $users_id->loaded())
		{
			$user = $users_id;
		}
		else
		{
			return false;
		}

		return $this->_following_user = $user;
	}

	public function getUser()
	{
		return $this->_following_user;
	}

	public function getAuthor()
	{
		if(!$this->loaded()) return false;
		if($this->users_id > 0)
		{
			$user = ORM::factory('User_Base',$this->users_id);
			if($user->loaded()) return $user;
			return false;
		}
	}

	public function getFeedItems()
	{

	}

	public function getActionsAsArray(){
		// set action array using check action array
		return $this->checkActionArray();
	}

	public function checkActionArray(){
		// set action array if not yet set
		if(!is_array($this->action_array)) $this->action_array = @unserialize($this->action);

		// if the unserialization failed then set it to an empty array
		if($this->action_array === false) $this->action_array = array();

		return $this->action_array;
	}

	public function addAction($action,$dosave = true){

		// set action array using check action array
		$this->action_array = $this->checkActionArray();

		//if new action is an array do array merge
		if(is_array($action) || is_object($action))	$action = (array)$action;

		//if string add to array
		else if(is_string($action) && $action!="") $action = array($action);

		// at this point the other option is an empty string
		else $action = array();

		// merge new action array into existing action array
		$this->action_array = array_merge($action,$this->action_array);

		// set action and pass dosave through
		$this->setAction(false,$dosave);

		return $this;

	}


	public function setAction($action=false,$dosave=true){

		if($action===false && is_array($this->action_array)) $action = $this->action_array;
		else if($action===false)
		{
			$this->action_array = $this->checkActionArray();
			$action = $this->action_array;
		}

		if(is_array($action) || is_object($action))
		{
			$this->action_array = (array)$action;
			$s_action = serialize($this->action_array);
		}
		elseif(is_string($action))
		{
			$this->action_array = array($action);
			$s_action = serialize($this->action_array);
		}
		else return false;

		$this->action = $s_action;
		if($dosave) try{ $this->save();	} catch(Exception $e){ return false; };

		return $this;
	}

	/**
	 * @param $needle
	 * @param bool $match_all - means all needles have to match, not all haystack elements
	 * @param bool $find_any_matching_words
	 * @return bool
	 */
	public function hasAction($needle,$match_all=true,$find_any_matching_words=true)
	{
		$this->action_array = $this->checkActionArray();

		// if array is only one element long then extract that element
		if(is_array($needle) && sizeof($needle)==1) $needle = reset($needle);

		// if an array is passed for needle, we call this method recursively
		if(is_array($needle))
		{
			foreach($needle as $this_needle)
			{
				$pass_check = $this->hasAction($this_needle,$find_any_matching_words);
				if      ($match_all && !$pass_check) break;
				elseif  (!$match_all && $pass_check) break;
			}
		}
		else
		{
			// this will see if the needle matches any part of the action string
			if($find_any_matching_words)
			{
				foreach($this->action_array as $action)
				{
					$pass_check = stristr($action,$needle) === FALSE ? false : true;
					if($pass_check) break;
				}
			}
			// this will check if it matches the whole string (not case sensitive)
			else $pass_check = in_array(strtolower($needle),array_map('strtolower',$this->action_array));
		}

		// passcheck will either be true or false at this point;
		return $pass_check;
	}

	public function getFeedParent(){
		$this->action_array = $this->checkActionArray();
		foreach($this->action_array as $action_text)
		{
			if(stristr($action_text,'FeedParent')){
				$fp_arr = explode(':',$action_text);
				$fp = ORM::factory('Site_Feed',$fp_arr[1]);
				if(is_object($fp) && is_subclass_of($fp,'ORM')) return $fp;
			}
		}
		return false;
	}

	public function getFeedObject($item=false){
		if(!$item) $item = $this;
		if(!$item->loaded()) return false;
		$obj = Ent::eFact($item->enttypes_id,$item->ent_id);
		if(is_object($obj) && is_subclass_of($obj,'ORM')) return $obj;
		return false;
	}

	public function processFeed(){

		$feed = $this->where('processed','=',0)->find_all();
		foreach($feed as $item)
		{
			try{
				$obj = $this->getFeedObject($item);
				if(is_object($obj) && is_subclass_of($obj,'ORM') && $obj->loaded()) Model_User_Followers::processFeedItem($obj,$item);
				else
				{
					$item->processed = 1;
					@$item->save();
				}
			} catch (Exception $e){
				print_r(debug_backtrace());
			}

		}
		$queue = ORM::factory('Email_Queue');
		$queue->processQueue();
	}

	public static function addToFeed($obj,$action='add')
	{

		// if it's not a valid action set it to default (add)
		//		if($action != 'add' && $action != 'delete' && $action != 'update') $action = "add";

		$me = ORM::factory('Site_Feed');

		$me->enttypes_id = Ent::getMyEntTypeID($obj);
		$me->ent_id = $obj->id;
		$me->addAction($action);
		$me->users_id = Auth::instance()->get_user()->id;
		$me->save();



		if($me->loaded())
		{
			// this is being moved to a separate call so that it doesn't cause lag times.
			//	Model_User_Followers::processFeedItem($obj,$me);

			//if it's a game we want to loop through both teams as well.
			if($me->enttypes_id == 8) //means its a game
			{
				foreach($obj->teams->find_all() as $team)
				{
					$action_array = $me->action_array;
					array_push($action_array,"FeedParent:".$me->id);
					self::addToFeed($team,$action_array);
				}
			}
			elseif($me->enttypes_id==14)
			{
				$subject = Ent::eFact($obj->subject_enttypes_id,$obj->subject_id);
				if(is_object($subject) && is_subclass_of($subject,'ORM') && $subject->loaded()){
					if(Ent::getMyEntTypeID($subject) == 8)
					{
						foreach($subject->teams->find_all() as $team)
						{
							$action_array = $me->action_array;
							array_push($action_array,"FeedParent:".$me->id);
							self::addToFeed($team,$action_array);
						}
					}
				}
			}

			return $me;
		}
		return false;
	}

}