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

	protected $get_basics_exceptions = array(
		'column_name_changes' => array(
			'sport_type_obj' => 'sport_type',
			'name' => 'sport_name'
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

	function addSport($args = array()){
		extract($args);
		if (isset($name) && $name != ""){
			$this->name = $name;
		}
		if (isset($male) && $male != ""){
			$this->male = $male;
		}
		if (isset($female) && $female != ""){
			$this->female = $female;
		}
		if (isset($sport_type_id) && $sport_type_id != ""){
			$this->sport_type_id = $sport_type_id;
		}
		try{
			$this->save();
			return $this;
		}catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public function updateType($sport_type_id)
	{
		if ($sport_type_id != "")
			$this->sport_type_id = $sport_type_id;
		try{
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
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

/*	public function getBasics($settings = array())
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
*/
	public function getListall($args = array()){
		extract($args);
		$sports = ORM::factory('Sportorg_Sport');
		if (isset($male)){
			$sports->where('male', '=', $male);
		}
		if (isset($female)){
			$sports->where('female', '=', $female);
		}
		if (isset($sport_type_id)){
			$sports->where('sport_type_id', '=', $sport_type_id);
		}
		$classes_arr = array(
			'Sportorg_Sport' => 'sportorg_sport',
		);
		$sports = ORM::_sql_exclude_deleted($classes_arr, $sports);
		return $sports;
	}

	public function getPositions(){
		$positions = $this->positions;
		$classes_arr = array(
			'Sportorg_Position' => 'sportorg_position'
		);
		$positions = ORM::_sql_exclude_deleted($classes_arr, $positions);
		return $positions;
	}
	//TODO, _sql_exclude_deleted for single row
	public function getSportType(){
		$type = $this->type;
		return $type;
	}

	public function getAthletes($args = array()){

		extract($args);

		$athletes = $this->athletes;
		$athletes->select(DB::expr("distinct(user_base.id) as id"));
		$athletes->join('org_sport_link')->on('org_sport_link.sports_id', '=', 'user_sport_link.sports_id');

		$athletes->join('positions')->on('positions.sports_id', '=', 'user_sport_link.sports_id');
		$classes_arr = array(
			'Sportorg_Orgsportlink' => 'org_sport_link',
			'Sportorg_Position' => 'positions',
			'User_Base' => 'user_base'
		);
		if ( isset($positions_id) && $positions_id !="")
		{
			$athletes = $athletes->where('positions.id', '=', $positions_id);
		}

		if ( isset($orgs_id) && $orgs_id !="")
		{
			$athletes = $athletes->where('org_sport_link.orgs_id', '=', $orgs_id);
		}
		if ($teams_id != "" || $seasons_id != "" || $complevels_id != ""){
			$athletes->join('teams')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
			$classes_arr['Sportorg_Team'] = 'teams';
		}

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
		$athletes = ORM::_sql_exclude_deleted($classes_arr, $athletes);
		return $athletes;
	}

	//TODO, _sql_exclude_deleted, add by jeffrey
	public function getStat(){
		$stat = ORM::factory("Stats_Base");
		$stat->where('sports_id', '=', $this->id)->or_where('sports_id2','=',$this->id);
		return $stat;
	}

	public function getStatTabs(){
		$stattabs = ORM::factory("Stats_Tab");
		$stattabs->where('sports_id', '=', $this->id)->or_where('sport_id2','=',$this->id);
		$classes_arr = array(
			'Stats_Tab' => 'stats_tab'
		);
		$stattabs = ORM::_sql_exclude_deleted($classes_arr, $stattabs);
		return $stattabs;
	}

	public function get_search($args = array()){
		extract($args);

		$sport_model = ORM::factory("Sportorg_Sport");
		if(isset($sport_name)){
			$sport_model->where('name', 'like', '%'.$sport_name.'%');
		}
		$classes_arr = array(
			'Sportorg_Sport' => 'sportorg_sport'
		);
		if(isset($orgs_id)){
			$sport_model->join('org_sport_link');
			$sport_model->on('org_sport_link.sports_id' ,'=', 'sportorg_sport.id');
			$sport_model->where('org_sport_link.orgs_id', '=', $orgs_id);
			$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';
		}

		if(isset($gender)){
			if ($gender == 'm')
				$sport_model->where('male', '=', 1);
			if ($gender == 'f')
				$sport_model->where('female', '=', 1);
			else{
				$sport_model->and_where_open();
				$sport_model->or_where('female', '=', 1);
				$sport_model->or_where('male', '=', 1);
				$sport_model->and_where_close();
			}
		}
		$sport_model = ORM::_sql_exclude_deleted($classes_arr, $sport_model);
		return $sport_model;
	}

	public function getVideos($args = array()){
		$video_model = ORM::factory("Media_Video");
		$video = $this->media;
		$enttypeID = Model_Site_Enttype::getMyEntTypeID($video_model);
		$video->join('tags', 'RIGHT')->on('media_base.id', '=','tags.media_id')
			->where('tags.subject_enttypes_id', '=', $enttypeID);
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

		$classes_arr = array(
			'Media_Base' => 'media_base',
			'Site_Tag' => 'tags',
			'Sportorg_Orgsportlink' => 'org_sport_link',
			'Sportorg_Team' => 'teams'
		);

		$video = ORM::_sql_exclude_deleted($classes_arr, $video);
		return $video;
	}

	public function getImages($args = array()){
		$image_model = ORM::factory("Media_Image");
		$image = $this->media;
		$enttypeID = Model_Site_Enttype::getMyEntTypeID($image_model);
		$image->join('tags', 'RIGHT')->on('media_base.id', '=','tags.media_id')
			->where('tags.subject_enttypes_id', '=', $enttypeID);
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

		$classes_arr = array(
			'Media_Base' => 'media_base',
			'Site_Tag' => 'tags',
			'Sportorg_Orgsportlink' => 'org_sport_link',
			'Sportorg_Team' => 'teams'
		);

		$image = ORM::_sql_exclude_deleted($classes_arr, $image);
		return $image;
	}

	public function getResumeData($args = array()){
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
				$resumeData->where('user_resume_data_vals.users_id','=', $users_id);
			}
			$classes_arr = array(
				'User_Resume_Data' => 'resume_data',
				'User_Resume_Data_Group' => 'resume_data_groups',
				'User_Resume_Data_Group_Profilelink' => 'rdg_rdp_link',
				'User_Resume_Data_Profile' => 'resume_data_profiles',
				'User_Resume_Data_Profile_Sportslink' => 'rdp_sports_link',
				'Sportorg_Sport' => 'sports'
			);
			$resumeData = ORM::_sql_exclude_deleted($classes_arr, $resumeData);
			return $resumeData;
	}
}