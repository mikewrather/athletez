<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/17/13
 * Time: 1:12 AM
 */

class Model_Site_Tag extends Model_Site_Entdir
{
	
	protected $_table_name = 'tags';

	public $error_message_path = 'models/site';

	protected $_belongs_to = array(
		'tagger' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'enttype' => array(
			'model' => 'Site_Enttype',
			'foreign_key' => 'subject_enttypes_id'
		)
	);

	public function rules(){

		return array
		(
			// subject_enttypes_id (int)
			'subject_enttypes_id'=>array(
				array('not_empty'),
				array('digit'),
			),

			// subject_id (int)
			'subject_id'=>array(
				array('not_empty'),
				array('digit'),
				array('subject_id_exist',array( ':validation', 'subject_enttypes_id', 'subject_id'))
			),

			'users_id'=>array(
				array('not_empty'),
				array('users_id_exist'),
			),

			'media_id'=>array(
				array('not_empty'),
				array('media_id_exist'),
			)
		);
	}

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getBasics()
	{
		//This gets the subject of the vote.  It will be used to pull basic information
		$subject = $this->getSubject();

		return array(
			"id" => $this->id,
			"tagger_users_id" => $this->users_id,
			"tagger" => $this->tagger->getBasics(),
			"subject" => $subject->getBasics(),
		);
	}

	public static function getNumTags($obj){
		$subject_enttypes_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;
		$site_tag = ORM::factory("Site_Tag");
		$site_tag->where('subject_enttypes_id', '=', $subject_enttypes_id);
		$result = $site_tag->where('subject_id', '=', $subject_id)->find_all()->as_array();
		$total_tags = count($result);
		if ($total_tags){
			return intval($total_tags);
		}
		return 0;
	}

	public static function who_taged_media($media_id){
		//echo "media_id = ".$media_id;
		$tags = DB::select("subject_enttypes_id")
			->select("subject_id")
			->from('tags')
			->where('tags.media_id','=', $media_id)
			->group_by('subject_enttypes_id')
			->group_by('subject_id');

		$res = $tags->execute();
		$users = null;
		$teams = null;
		$games = null;
		$combine_obj = new stdClass();
		if($res->count() > 0)
		{

			foreach($res as $row){
				$entity = Model_Site_Enttype::eFact($row['subject_enttypes_id'], $row['subject_id']);
				if ($entity instanceof Model_User_Base){
					$users[] = $entity->getBasics();
				}else if ($entity instanceof Model_Sportorg_Team){
					$teams[] = $entity->getBasics();
				}else if ($entity instanceof Model_Sportorg_Games_Base){
					$games[] = $entity->getBasics();
				}
			}
			$combine_obj->users = $users;
			$combine_obj->teams = $teams;
			$combine_obj->games = $games;

		}else{
			$combine_obj->users = $users;
			$combine_obj->teams = $teams;
			$combine_obj->games = $games;
		}
		return $combine_obj;
	}

	public function owner(){
		if(!$this->id){
			return "";
		}
		return intval($this->users_id);
	}

	public function is_owner($user){
		if (is_object($user)){
			return invtal($user->id) == $this->owner();
		}else{
			return invtal($user) == $this->owner();
		}
	}

	public function addTag($args = array()){
		extract($args);
		if(isset($subject_type_id))
		{
			$this->subject_enttypes_id = $subject_type_id;
		}

		if(isset($subject_id))
		{
			$this->subject_id = $subject_id;
		}

		if(isset($users_id))
		{
			$this->users_id = $users_id;
		}
		else
		{
			$this->users_id = Auth::instance()->get_user()->id;
		}

		if(isset($media_id))
		{
			$this->media_id = $media_id;
		}

		try {
			$this->save();
			Model_Site_Feed::addToFeed($this);

			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}

	}

	public function name(){ return ""; }
}