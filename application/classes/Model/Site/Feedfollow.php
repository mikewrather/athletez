<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 6/21/13
 * Time: 3:05 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Feedfollow extends ORM
{
	
	protected $_table_name = 'feed_follow';
	

	protected $_belongs_to = array(
		'follow' => array(
			'model' => 'User_Followers',
			'foreign_key' => 'follow_id'
		),
		'feed' => array(
			'model' => 'Site_Feed',
			'foreign_key' => 'feed_id'
		),
	);
	

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public static function addFeedFollow($feed_id,$follow_id)
	{
		$feed_follow = ORM::factory('Site_Feedfollow');

		$feed_follow->follow_id = $follow_id;
		$feed_follow->feed_id = $feed_id;
		try
		{
			$feed_follow->save();
		}
		catch(ErrorException $e)
		{
			return $e;
		}
	}

}