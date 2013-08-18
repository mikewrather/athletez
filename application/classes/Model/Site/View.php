<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 4:03 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_View extends Model_Site_Entdir
{
	
	protected $_table_name = 'views';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		)
	);


	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getBasics($settings)
	{
		//This gets the subject of the vote.  It will be used to pull basic information
		$subject = $this->getSubject();

		return array(
			"id" => $this->id,
			"subject" => $subject->getBasics(),
			"user" => $this->user->getBasics(),
			"timeViewed" => $this->timeViewed,
		);
	}

	public static function getNumViews($obj){
		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;
		$site_view = ORM::factory("Site_View");
		$site_view->where('subject_enttypes_id', '=', $subject_enttypes_id);
		$result = $site_view->where('subject_id', '=', $subject_id)->find_all()->as_array();
		$total_views = count($result);
		if ($total_views){
			return intval($total_views);
		}
		return 0;
	}
}