<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/4/13
 * Time: 1:21 PM
 */

class Model_Sportorg_Sport extends ORM
{

	protected $_table_name = 'sports';

	public $error_message_path = "models/sportorg";

	protected $_belongs_to = array(
		'type' => array(
			'model' => 'Sportorg_Sporttype',
			'foreign_key' => 'sport_type_id'
		)
	);
	
	protected $_has_many = array(
		'sections' => array(
			'model' => 'Sportorg_Section',
			'foreign_key' => 'sports_id'
		),
		'usl' => array(
			'model' => 'User_Sportlink',
			'foreign_key' => 'sports_id'
		),
		'athletes' => array(
			'model' => 'User_Base',
			'through' => 'user_sport_link',
			'foreign_key' => 'sports_id',
			'far_key' => 'users_id'
		),
		'media' => array(
			'model' => 'Media_Base',
			'foreign_key' => 'sports_id'
		),
		'positions' => array(
			'model' => 'Sportorg_Position',
			'foreign_key' => 'sports_id'
		),
		'orgs' => array(
			'model' => 'Sportorg_Orgs',
			'through' => 'org_sport_link',
			'foreign_key' => 'sports_id',
			'far_key' => 'orgs_id'
		),
	);

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// male (tinyint)
			'male'=>array(
				array('not_empty'),
				array('in_array', array(':value', array(0, 1))),
			),

			// female (tinyint)
			'female'=>array(
				array('not_empty'),
				array('in_array', array(':value', array(0, 1))),
			),

			// sport_type_id (int)
			'sport_type_id'=>array(
				array('not_empty'),
				array('sport_type_id_exist'),
			),
		);
	}


	public function updateType($sport_type_id)
	{
		$this->sport_type_id = $sport_type_id;
		return $this->update();
	}
	
	public function updateSport($args)
	{
		extract($args);
		if ( isset($name))
		{
			$this->name = $name;
		}
		
		if ( isset($male))
		{
			$this->male = $male;
		}
		
		if ( isset($female))
		{
			$this->female = $female;
		}
		
		if ( isset($sport_type_id))
		{
			$this->sport_type_id = $sport_type_id;
		}

		try{
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public function getBasics()
	{
		return array(
			"sport_id" => $this->id,
			"sport_name" => $this->name,
			"male" => $this->male,
			"female" => $this->female,
			"sport_type_id" => $this->sport_type_id,
			"sport_type" => $this->type->getBasics()
		);
	}

	public function getListall($args = array()){
		extract($args);
		$sports = ORM::factory('Sportorg_Sport');
		if ($id != 0){
			$sports->where('id', '=', $this->id);
		}
		return $sports;
	}

	public function getPositions(){
		$positions = $this->positions;
		return $positions;
	}

	public function getSportType(){
		$type = $this->type;
		return $type;
	}

	public function getAthletes($args = array()){

		extract($args);

		$athletes = $this->athletes;

		$athletes->join('org_sport_link')->on('org_sport_link.sports_id', '=', 'user_sport_link.sports_id');

		$athletes->join('positions')->on('positions.sports_id', '=', 'user_sport_link.sports_id');

		if ( isset($positions_id) && $positions_id !="")
		{
			$athletes = $athletes->where('positions.id', '=', $positions_id);
		}

		if ( isset($orgs_id) && $orgs_id !="")
		{
			$athletes = $athletes->where('org_sport_link.orgs_id', '=', $orgs_id);
		}

		$athletes->join('teams')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');

		if ( isset($teams_id) && $teams_id != "")
		{
			$athletes = $athletes->where('teams.id', '=', $teams_id);
		}

		if ( isset($seasons_id) && $seasons_id != ""){
			$athletes->where('teams.seasons_id', '=', $seasons_id);
		}

		if ( isset($complevels_id) && $complevels_id != ""){
			$athletes->where('teams.complevels_id', '=', $complevels_id);
		}

		return $athletes;
	}

	public function getStat(){
		$stat = ORM::factory("Stats_Base");
		$stat->where('sports_id', '=', $this->id)->or_where('sports_id2','=',$this->id);
		return $stat;
	}

	public function getStatTabs(){
		$stattabs = ORM::factory("Stats_Tab");
		$stattabs->where('sport_id', '=', $this->id)->or_where('sport_id2','=',$this->id);
		return $stattabs;
	}

	public function getVideos($args = array()){
		$video_model = ORM::factory("Media_Video");
		$video = $this->media;
		$video->getMediaForObject($video_model);

		extract($args);

		$video->join('org_sport_link')->on('org_sport_link.sports_id', '=', 'media_base.sports_id');
		$video->join('teams')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');

		if (isset($users_id) && $users_id !=""){
			$video->where('media_base.users_id', '=', $users_id);
		}

		if ( isset($seasons_id) && $seasons_id != ""){
			$video->where('teams.seasons_id', '=', $seasons_id);
		}

		if ( isset($complevels_id) && $complevels_id != ""){
			$video->where('teams.complevels_id', '=', $complevels_id);
		}
		return $video;
	}

	public function getImages($args = array()){
		$image_model = ORM::factory("Media_Image");
		$image = $this->media;
		$image->getMediaForObject($image_model);

		extract($args);

		$image->join('org_sport_link')->on('org_sport_link.sports_id', '=', 'media_base.sports_id');
		$image->join('teams')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');

		if (isset($users_id) && $users_id !=""){
			$image->where('media_base.users_id', '=', $users_id);
		}

		if ( isset($seasons_id) && $seasons_id != ""){
			$image->where('teams.seasons_id', '=', $seasons_id);
		}

		if ( isset($complevels_id) && $complevels_id != ""){
			$image->where('teams.complevels_id', '=', $complevels_id);
		}
		return $image;
	}

	public function getResumeData($args = array()){
		$retArr = array();
		extract($args);
		$resumeData = ORM::factory("User_Resume_Data_Vals");
		$resumeData
			//->from('resume_data_vals')

			->join('resume_data')
			->on('user_resume_data_vals.resume_data_id','=','resume_data.id')

			->join('resume_data_groups','LEFT')
			->on('resume_data.resume_data_groups_id','=','resume_data_groups.id')

			->join('rdg_rdp_link')
			->on('resume_data_groups.id','=','rdg_rdp_link.resume_data_groups_id')

			->join('resume_data_profiles')
			->on('rdg_rdp_link.resume_data_profiles_id','=','resume_data_profiles.id')

			->join('rdp_sports_link')
			->on('rdp_sports_link.resume_data_profiles_id','=','resume_data_profiles.id')

			->join('sports')
			->on('rdp_sports_link.SPORTS_ID','=','sports.id');

			$resumeData->where('sports.id', '=', $sports_id);

			if (isset($users_id)){
				$resumeData->where('user_resume_data_vals.users_id','=',$this->id);
			}
			print_r($resumeData);
			return $resumeData;
//
//		$res = $resumeData->execute();
//
//		foreach($res as $data)
//		{
//			$retArr[$data['id']] = $data;
//		}
//
//		return (object)$retArr;
	}
}