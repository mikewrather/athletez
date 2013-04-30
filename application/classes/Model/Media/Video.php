<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:48 PM
 */

class Model_Media_Video extends ORM
{
	
	protected $_table_name = 'videos';

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

			// video_services_id (int)
			'video_services_id'=>array(
				array('not_empty'),
				array('digit'),
				array('video_services_id_exist')
			),
		);
	}

	//TODO: update videos_meta to go through video_type_link because there's metadata per video type, not per video
	protected $_has_many = array(
		'metadata' => array(
			'model' => 'Media_Videometa',
			'foreign_key' => 'videos_id'
		),
		'types' => array(
			'model' => 'Media_Videotype',
			'through' => 'video_type_link',
			'far_key' => 'video_types_id',
			'foreign_key' => 'videos_id'
		),
	);
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,			
			"media" => $this->media->getBasics(),	 
			"video_services" => $this->videoservice->getBasics(),
		);
	}

	public function getVideos($games_id){
		$games_model = ORM::factory("Sportorg_Games_Base");
		$games_model->id = $games_id;

		$media_video = ORM::factory("Media_Video");
		$enttypeID = Ent::getMyEntTypeID($games_model);
//		$video_results = $media_base->where('subject_type_id','=',$enttypeID)
//			->and_where('subject_id','=',$games_model->id)
//			->find_all();
//		$media_ids = array();
//		foreach($video_results as $result){
//			$media_ids[] = $result->id;
//		}
//		if (empty($media_ids)){
//			$media_ids[] = -1;//No media_id match
//		}
//		return $media_video->where('media_id','in', $media_ids);

		$media_video->join('media', 'RIGHT')->on('media_video.media_id', '=','media.id')
			->where('media.subject_type_id', '=', $enttypeID)
			->and_where('media.subject_id', '=', $games_model->id);
		return $media_video;
	}

	public function getSearch($args = array()){
		extract($args);
		$this->join('media')->on('media_video.media_id', '=', 'media.id');
		$this->join('sports')->on('media.sports_id', '=', 'sports.id');
		$this->join('org_sport_link')->on('sports.id', '=', 'org_sport_link.sports_id');
		$this->join('teams')->on('org_sport_link.id', '=', 'teams.org_sport_link_id');
		$this->join('users_teams_link')->on('users_teams_link.teams_id', '=', 'teams.id');
		$this->join('users')->on('users_teams_link.users_id', '=', 'users.id');
		//$this->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');
		if (isset($sports_id)){
			$this->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if (isset($complevels_id)){
			$this->where('teams.complevels_id', '=', $complevels_id);
		}

		$enttype_id = Model_Site_Enttype::getMyEntTypeID($this);
		if (!isset($orderby)){
			$this->join('votes')->on('votes.subject_id', '=', 'users.id');
			$this->where('votes.subject_enttypes_id', '=', $enttype_id);
			$this->order_by('num_votes', 'asc');
		}else{
			$this->order_by($orderby, 'asc');
		}

		if (isset($gradyear)){
			$this->where('users.grad_year', '=', $gradyear);
		}

		if (isset($positions_id)){
			$this->join('positions')->on('positions.sports_id', '=', 'sports.id');
			$this->where('positions.id', '=', $positions_id);
		}

		if (isset($searchtext))
			$this->where(array(Db::expr('CONCAT(users.first_name," ",users.last_name)'), 'full_name'), 'like ','%'.$searchtext.'%');
			//$this->where('users.name', 'like', "%".$searchtext."%");

		return $this;
	}

}