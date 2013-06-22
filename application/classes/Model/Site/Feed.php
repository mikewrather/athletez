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
	

	public function __construct($id=NULL)
	{
		parent::__construct($id);
		if($this->loaded()) $this->populateFeedObject();
	}

	protected function populateFeedObject()
	{
		if(!$this->loaded()) return false;

		$this->_feed_object = Ent::eFact($this->enttypes_id,$this->ent_id);

		if($this->_feed_object->loaded()) return $this->_feed_object;
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

	public function getFeedItems()
	{

	}

	public static function addToFeed($obj)
	{
		$me = ORM::factory('Site_Feed');

		$me->enttypes_id = Ent::getMyEntTypeID($obj);
		$me->ent_id = $obj->id;
		$me->save();

		if($me->loaded())
		{
			Model_User_Followers::processFeedItem($obj,$me);
			return $me;
		}
		return false;
	}

}