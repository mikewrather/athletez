<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:48 PM
 */

class Model_Media_Video extends ORM
{
	
	protected $_table_name = 'videos';

	public $error_message_path = 'models/media/video';

	protected $_belongs_to = array(
		'media' => array(
			'model' => 'Media_Base',
			'foreign_key' => 'media_id'
		),
		'videoservice' => array(
			'model' => 'Media_Videoservice',
			'foreign_key' => 'video_services_id'
		)
	);

	public function rules(){

		return array
		(
			// media_id (int)
			'media_id'=>array(
				array('not_empty'),
				array('digit'),
				array('media_id_exist')
			),
/*
			// video_services_id (int)
			'video_services_id'=>array(
				array('not_empty'),
				array('digit'),
				array('video_services_id_exist')
			),
*/
		);
	}

	//TODO: update videos_meta to go through video_type_link because there's metadata per video type, not per video
	protected $_has_many = array(
		'typelink' => array(
			'model' => 'Media_Videotypelink',
			'foreign_key' => 'videos_id'
		),
		'types' => array(
			'model' => 'Media_Videotype',
			'through' => 'video_type_link',
			'far_key' => 'video_types_id',
			'foreign_key' => 'videos_id'
		),
	);

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'media_obj' => 'media',
			'video_services_obj' => 'video_services'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(
			'video_type' => 'get_types_and_meta_as_array',
			'standard_thumb' => 'get_standard_thumb',
			'can_follow' => 'can_follow',
			'num_votes' => 'get_num_votes'
		),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);
	public function get_num_votes()
	{
		return Model_Site_Vote::getNumVotes($this->media);
	}

	public function get_standard_thumb()
	{
		if(isset($this->small_thumb_width) && isset($this->small_thumb_height))
		{
			return array(
				'url' => $this->small_thumbs,
				'width' => $this->small_thumb_width,
				'height' => $this->small_thumb_height
			);
		}
		elseif(isset($this->small_thumbs) && $this->small_thumbs != '')
		{
			list($width,$height) = getimagesize($this->thumbs);
			return array(
				'url' => $this->small_thumbs,
				'width' => $width,
				'height' => $height
			);
		}
		return false;
	}

	public function get_large_thumb()
	{
		if(isset($this->thumb_width) && isset($this->thumb_height))
		{
			return array(
				'url' => $this->thumbs,
				'width' => $this->thumb_width,
				'height' => $this->thumb_height
			);
		}
		elseif(isset($this->thumbs) && $this->thumbs != '')
		{
			list($width,$height) = getimagesize($this->thumbs);
			return array(
				'url' => $this->thumbs,
				'width' => $width,
				'height' => $height
			);
		}
		return false;
	}

	public static function getVideoCounts($obj){
		$enttype_id = Model_Site_Enttype::getMyEntTypeID($obj);
		$subject_id = $obj->id;
		$res = DB::select(array(DB::expr('COUNT(*)'), 'total_count'))->from('tags')
			->where('subject_enttypes_id', '=', $enttype_id)
			->where('subject_id', '=',$subject_id);
		return $res->execute()->get('total_count');
	}

	public function get_types($args = array()){
		extract($args);

		$video_type_model = ORM::factory('Media_Videotype');
		$video_type_model->join('video_type_link')->on('video_type_link.video_types_id', '=', 'media_videotype.id')->where('video_type_link.videos_id', '=', $video_id);
		if (isset($is_high_def) || $is_high_def){
			if ($is_high_def){
				$video_type_model->where('media_videotype.height', '>=', 720);
			}else{
				$video_type_model->where('media_videotype.height', '<', 720);
			}
		}

		return $video_type_model;
	}

	public function getTaggedVideos($obj, $sports_id = null){
		$arr = null;
		$limit = Model_Media_Video::getVideoCounts($obj);
		if($primary = Model_Media_Base::find_most_voted_tag($obj,'video', $limit))
		{
			//if the third parameter is more than one and it finds more than one result then it will return them in an array
			if(is_array($primary))
			{
				//Loop through results
				foreach($primary as $media_id => $video)
				{

					$media_obj = ORM::factory("Media_Base", $media_id);

					if ($sports_id){ //only get videos related to one sports_id

						$combine_obj = new stdClass();
						if ($media_obj->sports_id == $sports_id){
							$video_type = $video->get_types_and_meta_as_array();
							$combine_obj->video_id = $video->id;
							//$combine_obj->video_title =  $media->name;
							$combine_obj->video_thumb = $video->thumbs;
							$combine_obj->post_date =  $media_obj->timePosted;
							$num_tags = Model_Site_Tag::getNumTags($video);
							$num_votes = Model_Site_Vote::getNumVotes($video);
							$num_comments = Model_Site_Comment::getNumComments($video);
							$num_views = Model_Site_View::getNumViews($video);
							$tags = Model_Site_Tag::who_taged_media($media_id);
							$combine_obj->tags_count =  $num_tags;
							$combine_obj->num_votes =  $num_votes;
							$combine_obj->num_views =  $num_views;
							$combine_obj->num_comments =  $num_comments;
							$combine_obj->video_type = $video_type;
							$combine_obj->tags = $tags;

							$arr[] = $combine_obj;
							unset($combine_obj);
						}
					}else{
						$combine_obj = new stdClass(); //moved into this loop because it must be unset and redeclared with each loop
						$video_type = $video->get_types_and_meta_as_array();
						$combine_obj->video_id = $video->id;
						//$combine_obj->video_title =  $media->name;
						$combine_obj->video_thumb = $video->thumbs;
						$combine_obj->post_date =  $media_obj->timePosted;
						$num_tags = Model_Site_Tag::getNumTags($video);
						$num_votes = Model_Site_Vote::getNumVotes($video);
						$num_comments = Model_Site_Comment::getNumComments($video);
						$num_views = Model_Site_View::getNumViews($video);
						$combine_obj->tags_count =  $num_tags;
						$combine_obj->num_votes =  $num_votes;
						$combine_obj->num_views =  $num_views;
						$combine_obj->num_comments =  $num_comments;
						$combine_obj->video_type = $video_type;
						$tags = Model_Site_Tag::who_taged_media($media_id);
						$combine_obj->tags = $tags;
						$arr[] = $combine_obj;
						unset($combine_obj);
					}
				}
			}
			else
			{
				$combine_obj = new stdClass();
				$video = clone($primary);
				$video_type = $video->get_types_and_meta_as_array();
				$combine_obj->video_id = $video->id;
				//$combine_obj->video_title =  $media->name;
				$combine_obj->video_thumb = $video->thumbs;
				$combine_obj->post_date =  $video->media->timePosted;
				$num_tags = Model_Site_Tag::getNumTags($video);
				$num_votes = Model_Site_Vote::getNumVotes($video);
				$num_comments = Model_Site_Comment::getNumComments($video);
				$num_views = Model_Site_View::getNumViews($video);
				$combine_obj->tags_count =  $num_tags;
				$combine_obj->num_votes =  $num_votes;
				$combine_obj->num_views =  $num_views;
				$combine_obj->num_comments =  $num_comments;
				$combine_obj->video_type = $video_type;
				$arr[] = $combine_obj;
			}
		}

		$results = new stdClass();
		$results->result = $arr;
		return $results;
	}

	public function owner()
	{
		return $this->media->owner();
	}

	public function is_owner($user)
	{
		return $this->media->is_owner($user);
	}

	public static function getVideos($obj, $sports_id = null)
	{

		$media = $obj->media->where('media_type','=','video');
		$media->where('users_id', '=', $obj->id);
		if ($sports_id){
			$media->where('sports_id', '=', $sports_id);
		}
		$result_arr = null;
		foreach($media->find_all() as $single_media){
			$combine_object = new stdClass();
			$typelink = $single_media->video->get_types_and_meta_as_array();
			$video_id = $single_media->video->id;
			$video_thumb = $single_media->video->thumbs;
			$video_title = $single_media->name;

			$combine_object->video_type = $typelink;

			$num_tags = Model_Site_Tag::getNumTags($single_media->video);
			$num_votes = Model_Site_Vote::getNumVotes($single_media->video);
			$num_comments = Model_Site_Comment::getNumComments($single_media->video);
			$num_views = Model_Site_View::getNumViews($single_media->video);
			if ($obj instanceof user_model){
				$username = $obj->getBasics();
				$combine_object->user_name = $username['name'];
			}

			if ($obj instanceof Model_Sportorg_Games_Base){
				//Add some game related elements if necessary
			}
			$tags = Model_Site_Tag::who_taged_media($single_media->id);
			$combine_object->tags = $tags;
			$combine_object->video_id =  $video_id;
			$combine_object->video_title =  $video_title;
			$combine_object->video_thumb = $video_thumb;
			$combine_object->post_date =  $single_media->timePosted;
			$combine_object->tags_count =  $num_tags;
			$combine_object->num_votes =  $num_votes;
			$combine_object->num_views =  $num_views;
			$combine_object->num_comments =  $num_comments;
			$result_arr[] = $combine_object;
			unset($combine_object);
		}
		$return_obj = new stdClass();
		$return_obj->result = $result_arr;
		return $return_obj;
	}

//	public function getSearch($args = array()){
//		extract($args);
//		$this->join('media')->on('media_video.media_id', '=', 'media.id');
//		$this->join('sports')->on('media.sports_id', '=', 'sports.id');
//		$this->join('org_sport_link')->on('sports.id', '=', 'org_sport_link.sports_id');
//		$this->join('teams')->on('org_sport_link.id', '=', 'teams.org_sport_link_id');
//		$this->join('users_teams_link')->on('users_teams_link.teams_id', '=', 'teams.id');
//		$this->join('users')->on('users_teams_link.users_id', '=', 'users.id');
//		//$this->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');
//		if (isset($sports_id)){
//			$this->where('org_sport_link.sports_id', '=', $sports_id);
//		}
//
//		if (isset($complevels_id)){
//			$this->where('teams.complevels_id', '=', $complevels_id);
//		}
//
//		$enttype_id = Model_Site_Enttype::getMyEntTypeID($this);
//		$counts = DB::select(array(DB::expr('COUNT(id)'),'num_votes'))
//			->select(array('subject_id', 'users_id'))
//			->from('votes')
//			->where('subject_enttypes_id','=',$enttype_id);
//
//		if (!isset($orderby)){
//			$this->join(array($counts,'filtered'), 'left')->on('filtered.users_id', '=', 'users.id');
//			$this->order_by('num_votes', 'asc');
//
//		}else{
//			$this->order_by($orderby, 'asc');
//		}
//
//		if (isset($gradyear)){
//			$this->where('users.grad_year', '=', $gradyear);
//		}
//
//		if (isset($positions_id)){
//			$this->join('positions')->on('positions.sports_id', '=', 'sports.id');
//			$this->where('positions.id', '=', $positions_id);
//		}
//
//		if (isset($searchtext))
//			$this->where(array(Db::expr('CONCAT(users.first_name," ",users.last_name)'), 'full_name'), 'like ','%'.$searchtext.'%');
//			//$this->where('users.name', 'like', "%".$searchtext."%");
//
//		return $this;
//	}

	public function processQueue()
	{

	}


	public function addVideo($args=array())
	{

		extract($args);

		// UserID is used to generate the url for the video
		$user = Auth::instance()->get_user();

		$media = ORM::factory('Media_Base');

		$mediaArr = array(
			"media_type" => "video",
		);

		if(isset($sports_id))
		{
			$mediaArr['sports_id'] = $sports_id;
		}

		$mediaArr['user_id'] = (isset($user_id) && $user_id > 0) ? $user_id : $user->id;

		if(isset($name))
		{
			$mediaArr['name'] = $name;
		}

		$this->media_id = $media->addMedia($mediaArr);

		if(isset($video_services_id))
		{
			$this->video_services_id = $video_services_id;
		}

		try
		{
			$this->save();

			$queued = ORM::factory('Media_Queuedvideo');
			$queued->local_file = $video_file;
			$queued->users_id = $user->id;
			$queued->videos_id = $this->id;
			$queued->sports_id = $sports_id;
			$queued->save();

			return $this;
		}
		catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public static function _zencode($file_url)
	{
		// UserID is used to generate the url for the image
		$user = Auth::instance()->get_user();

		$zc_config = Kohana::$config->load('zencoder');

		$randID = md5(time() + rand(1, 1000));
		$baseOutURL = $zc_config->get('base_out') . $user->id . "/" . $randID . "/";
		$zencoder = new Services_Zencoder($zc_config->get('api_key'));
		$notificationURL = $zc_config->get('notification_url');

		// The zencoder command for each video to encode is kept in the
		// video types table.  So we use that table to construct the
		// zencoder string.
		$types = ORM::factory('Media_Videotype')
			->where('active','=',1)
			->find_all();

		// this is the string that we are going to build for the command
		$all_types = '';

		//Set up array of strings to search for
		$search_array = array(
			'{{base_out}}',
			'{{notification_url}}',
		);

		//Set up array of strings to replace with
		$replace_array = array(
			$baseOutURL,
			$notificationURL,
		);

		// Loop through types in order to set up the zencoder string
		foreach($types as $type)
		{
			$all_types .= str_replace($search_array,$replace_array,$type->zencoder_command).',';
		}
		// get rid of the trailing comma
		$all_types = rtrim($all_types,',');

		$reqstr = '
		{
		    "input": "' . $file_url . '",
		    "region": "us",
		    "download_connections": 10,
		    "private": true,
		    "output": [' . $all_types . ']
		}';

		return array("encoding_job"=>$zencoder->jobs->create($reqstr),"randID"=>$randID);
	}


	public function addType($types_id,$meta,$url='')
	{
		if((int)$types_id == 0) return false;

		if(!$this->loaded()) return false;
		if($this->has('types',$types_id))
		{
			echo "Link Exists!";
			return false;
		}

		$linkID = ORM::factory('Media_Videotypelink')->addLink($types_id,$this->id,$url);
		foreach($meta as $property=>$val)
		{
			$thismeta = ORM::factory('Media_Videometa');
			$thismeta->video_type_link_id = $linkID;
			$thismeta->vid_prop = $property;
			$thismeta->vid_val = $val;
			$thismeta->save();
		}

	}

	/**
	 * get_types_and_meta_as_array() loops through the video type link table and gets the metadata for each one of those links
	 * The top level array keys will be the video type name.
	 * @return array
	 */
	public function get_types_and_meta_as_array()
	{
		if(!$this->loaded()) return;
		$vid_types_res = $this->typelink->find_all();

		$retArr = array();

		foreach($vid_types_res as $type_link)
		{

			$obj = new stdClass();
			$obj->video_type_name = $type_link->type->name;
			$obj->meta_details = $type_link->get_meta_as_array();
			$retArr[] = $obj;
		}

		return $retArr;
	}

	public function name()
	{
		return $this->media->name;
	}

	public function _check_ready()
	{
		// Get total number of video types
		$vt_num = ORM::factory('Media_Videotype')
			->where('active','=',1)
			->find_all()
			->count();

		$total_vt = $this->typelink->find_all()->count();

		if($total_vt >= $vt_num) $this->is_ready = 1;

		$this->save();
		return $this->is_ready;
	}

	private function assemblingSql($class_name, $condition = array()){

		$enttypes_id = Ent::getMyEntTypeID($class_name);
		extract($condition);

		$video_types = DB::select(DB::expr('COUNT(id)'))->from('video_type_link')->where('videos_id','=',DB::expr("`videos`.`id`"));

		$video = DB::select('media.id', 'media.sports_id')
			->from('tags')
			->join('media')->on('media.id', '=', 'tags.media_id')
			->where('media.media_type', '=', 'video')
			->join('videos')->on('videos.media_id', '=', 'media.id')
			->and_where('tags.subject_enttypes_id', '=', $enttypes_id)
			->and_where($video_types,'>',0);
		if (isset($sports_id)){
			$video->where('media.sports_id', '=', $sports_id);
		}

		if (isset($states_id)){
			$video->where('tags.states_id', '=', $states_id);
		}

		if (isset($cities_id)){
			$video->where('tags.cities_id', '=', $cities_id);
		}

		//add exclude sql logic here
		$classes_arr = array(
			'Site_Tag' => 'tags',
			'Media_Base' => 'media',
			'Media_Video' => 'videos'
		);

		$video = ORM::_sql_exclude_deleted($classes_arr, $video);

		if ($class_name == 'User_Base'){
			if (isset($searchtext) || isset($states_id) || isset($cities_id)){
				$video->join(array('users', 'user_base'))->on('user_base.id', '=', 'tags.subject_id');
				$classes_arr = array(
					'User_Base' => 'user_base'
				);
				$video = ORM::_sql_exclude_deleted($classes_arr, $video);
			}
			if (isset($searchtext)){
				//$video->where(array(Db::expr('CONCAT(user_base.first_name," ",user_base.last_name)'), 'full_name'), 'like ','%'.$searchtext.'%');
				$video->where('media.name', 'like', $searchtext."%");
			}
		}

		if ($class_name == 'Sportorg_Team'){
			if (isset($searchtext) || isset($states_id) || isset($cities_id)){
				$video->join('teams')->on('teams.id', '=', 'tags.subject_id');
				$video->join('org_sport_link')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
				$video->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');

				//add exclude sql logic
				$classes_arr = array(
					'Sportorg_Orgsportlink' => 'org_sport_link',
					'Sportorg_Org' => 'orgs',
					'Sportorg_Team' => 'teams'
				);
				$video = ORM::_sql_exclude_deleted($classes_arr, $video);
			}

			if (isset($searchtext)){
				//$video->where('orgs.name', 'like', '%'.$searchtext.'%');
				$video->where('media.name', 'like', $searchtext."%");
			}
		}

		if ($class_name == 'Sportorg_Games_Base'){
			if (isset($searchtext) || isset($states_id) || isset($cities_id)){
				$video->join('teams')->on('teams.id', '=', 'tags.subject_id');
				$video->join('org_sport_link')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
				$video->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');

				//add exclude sql logic
				$classes_arr = array(
					'Sportorg_Orgsportlink' => 'org_sport_link',
					'Sportorg_Org' => 'orgs',
					'Sportorg_Team' => 'teams'
				);
				$video = ORM::_sql_exclude_deleted($classes_arr, $video);
			}

			if (isset($searchtext)){
				//$video->where('orgs.name', 'like', '%'.$searchtext.'%');
				$video->where('media.name', 'like',$searchtext."%");
			}
		}

		if ($class_name == 'Sportorg_Org'){
			if (isset($searchtext) || isset($states_id) || isset($cities_id)){
				$video->join('teams')->on('teams.id', '=', 'tags.subject_id');
				$video->join('org_sport_link')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
				$video->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');

				//add exclude sql logic
				$classes_arr = array(
					'Sportorg_Orgsportlink' => 'org_sport_link',
					'Sportorg_Org' => 'orgs',
					'Sportorg_Team' => 'teams'
				);
				$video = ORM::_sql_exclude_deleted($classes_arr, $video);
			}

			if (isset($searchtext)){
				//$video->where('orgs.name', 'like', '%'.$searchtext.'%');
				$video->where('media.name', 'like', $searchtext."%");
			}
		}

		return $video;
	}

	public function getSearch($args = array()){
		extract($args);

		//get four types
		//user section
		$user_video = $this->assemblingSql('User_Base', $args);
		//team section
		$team_video = $this->assemblingSql('Sportorg_Team', $args);
		//org section
		$org_video = $this->assemblingSql('Sportorg_Org', $args);
		//game section
		$game_video = $this->assemblingSql('Sportorg_Games_Base', $args);

		$results = DB::select('videos.media_id', array(DB::expr('NULL'),'sports_id'))->from('videos')
			->where('videos.id', '=', '-1')  // 0 rows returned plus below results
			->union($user_video, false)
			->union($team_video, false)
			->union($org_video, false)
			->union($game_video, false)
			->execute()->as_array();

		if (empty($results)){
			$video_ids[] = -1; //avoid sql error
		}

		if(!isset($limit)) $limit=12;
		if(!isset($offset)) $offset=12;

		if(isset($media_id)){
			$video_ids[] = "".$media_id;
		}

		foreach($results as $arr){
			$video_ids[] = $arr['media_id'];
		//	if(sizeof($video_ids) >= $limit+$offset) break;
		}

		$videoModel = ORM::factory("Media_Video");

		if(isset($media_id)){
			$videoModel->order_by(DB::expr("field(id,'".$media_id."')"),'DESC');
		}

		if (!isset($orderby) || $orderby == 'votes'){
			$enttype_id = Model_Site_Enttype::getMyEntTypeID($videoModel);
			$video_votes = DB::select(array(DB::expr('COUNT(id)'),'num_votes'))
				->select(array('subject_id', 'videos_id'))
				->from('votes')
				->where('subject_enttypes_id','=',$enttype_id);

			$videoModel->join(array($video_votes, 'video_votes'), 'left')->on('video_votes.videos_id', '=', 'media_video.id');
			$videoModel->order_by('num_votes', 'desc');
		}else if ($orderby == 'followers'){
			$enttype_id = Model_Site_Enttype::getMyEntTypeID($videoModel);
			$followers = DB::select(array(DB::expr('COUNT(id)'),'num_followers'))
				->select(array('subject_id', 'videos_id'))
				->from('followers')
				->where('subject_enttypes_id','=',$enttype_id);
			$videoModel->join(array($followers,'followers'), 'LEFT')->on('followers.videos_id', '=', 'media_video.id');
			$videoModel->order_by('num_followers', 'desc');
		}else if ($orderby == 'postTime'){
			$videoModel->join('media' ,'left')->on('media_video.media_id', '=', 'media.id');
			$videoModel->order_by('media.timePosted', 'desc');
		}
		elseif($orderby=='random')
		{
			$videoModel->order_by(DB::expr('RAND()'));
		}

		$videoModel->limit($limit);
		$videoModel->offset($offset);



		$videoModel->where('media_video.media_id', 'in', $video_ids);
		return $videoModel;
	}

}