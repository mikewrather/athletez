<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 12:17 AM
 */

class Model_User_Base extends Model_Auth_User
{

	protected $_table_name = 'users';

	protected $_belongs_to = array(
		"city" => array(
			"model" => "Location_City",
			"foreign_key" => "cities_id"
		)
	);
	protected $_has_many = array(
		//From Auth
		'user_tokens' => array('model' => 'User_Token'),
		'roles'       => array('model' => 'Role', 'through' => 'roles_users'),

		//Sportorg
		'isports' => array(
			'model' => 'Sportorg_Sport',
			'through' => 'user_sport_link',
			'foreign_key' => 'users_id',
			'far_key' => 'sports_id'
		),
		'teams' => array(
			'model' => 'Sportorg_Team',
			'through' => 'users_teams_link',
			'foreign_key' => 'users_id',
			'far_key' => 'teams_id'
		),

		//User
		'utl' => array(
			'model' => 'User_Teamslink',
			'foreign_key' => 'users_id'
		),
		'usl' => array(
			'model' => 'User_Sportlink',
			'foreign_key' => 'users_id'
		),
		'resumedata' => array(
			'model' => 'User_Resume_Data',
			'through' => 'resume_data_vals',
			'foreign_key' => 'users_id',
			'far_key' => 'resume_data_id'
		),
		'resumevals' => array(
			'model' => 'User_Resume_Datavals',
			'foreign_key' => 'users_id'
		),
		'fitnessdatavals' => array(
			'model' => 'User_Fitness_Dataval',
			'foreign_key' => 'users_id'
		),

		//Site Data
		'comments' => array(
			'model' => 'Site_Comments',
			'foreign_key' => 'users_id'
		),
		'votes' => array(
			'model' => 'Site_Vote',
			'foreign_key' => 'users_id'
		),
		'tags' => array(
			'model' => 'Site_Tag',
			'foreign_key' => 'users_id'
		),
		'pogvotes' => array(
			'model' => 'Site_Pog',
			'foreign_key' => 'voter_user_id'
		),
		'pogvoted' => array(
			'model' => 'Site_Pog',
			'foreign_key' => 'player_users_id'
		),
		'followedby' => array(
			'model' => 'User_Base',
			'through' => 'followers',
			'foreign_key' => 'followed_users_id',
			'far_key' => 'follower_users_id'
		),
		'following' => array(
			'model' => 'User_Base',
			'through' => 'followers',
			'foreign_key' => 'follower_users_id',
			'far_key' => 'followed_users_id'
		),
		'views' => array(
			'model' => 'Site_View',
			'foreign_key' => 'user_id'
		),

		//Media
		'media' => array(
			'model' => 'Media_Base',
			'foreign_key' => 'users_id'
		),
		'queuedvideos' => array(
			'model' => 'Media_Queuedvideo',
			'foreign_key' => 'users_id'
		),
		'social_links' => array(
			'model' => 'Social_Type',
			'through' => 'social_-links',
			'foreign_key' => 'users_id',
			'far_key' => 'social_types_id'
		),

	);

	/**
	 * protected $singlesport, if set, will be used to filter queries where a sport is relevant.
	 * @var null
	 */
	protected $singlesport = false;

	public function getPositions()
	{
		//loop through teams and get positions for each.
	}

	public function getVideos()
	{
		return $this->media->where('media_type','=','video')->find_all();
	}

	public function getImages()
	{
		return $this->media->where('media_type','=','image')->find_all();
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"email" => $this->email,
		//	"password" => $this->password,
			"date_created" => $this->date_created,
			"login_count" => $this->login_count,
			"last_login" => $this->last_login,
			"first_name" => $this->first_name,
			"last_name" => $this->last_name,
			"city" => $this->city->getBasics()
		);

		//This logic will be added later to return appropriate data for the user's permissions
		/*

		//stuff for public
		$retArr["name"] = ucfirst($this->first_name.' '.$this->lastName());
		$retArr['username'] = $this->username;
		$retArr['email'] = $this->email;
		$retArr['logins'] = $this->logins;
		$retArr['last_login']= date('M jS, g:i a',$this->last_login);

		//stuff for logged in

		//stuff for coaches

		//stuff for admin

		return $retArr;
	*/
	}

	public function getResumeData()
	{
		$retArr = array();
		$usersFitnessData = DB::select('*')
			->from('resume_data_vals')

			->join('resume_data')
			->on('resume_data_vals.resume_data_id','=','resume_data.id')

			->join('resume_data_groups','LEFT')
			->on('resume_data.resume_data_groups_id','=','resume_data_groups.id')

			->join('rdg_rdp_link')
			->on('resume_data_groups.id','=','rdg_rdp_link.resume_data_groups_id')

			->join('resume_data_profiles')
			->on('rdg_rdp_link.resume_data_profiles_id','=','resume_data_profiles.id')

			->join('rdp_sports_link')
			->on('rdp_sports_link.resume_data_profiles_id','=','resume_data_profiles.id')

			->where('resume_data_vals.users_id','=',$this->id);


		if($this->singlesport)
		{
			$usersFitnessData->where('rdp_sports_link.sports_id','=',$this->singlesport);
		}

		$res = $usersFitnessData->execute();

		foreach($res as $data)
		{
			$retArr[$data['id']] = $data;
		}

		return $retArr;
	}

	public function getFitnessBasics()
	{
		$retArr = array();
		$usersFitnessData = DB::select('*')
			->from('fitness_data_vals')
			->join('fitness_data','LEFT')
			->on('fitness_data_vals.fitness_data_id','=','fitness_data.id')
			->where('fitness_data_vals.users_id','=',$this->id);

		if($this->singlesport)
		{
			$usersFitnessData->where('fitness_data.sports_id','=',$this->singlesport);
		}

		$res = $usersFitnessData->execute();
		foreach($res as $data)
		{
			$retArr[$data['id']] = $data;
		}

		return $retArr;

	}

	public function setSingleSport($sports_id)
	{
		$this->singlesport = $sports_id;
	}

	public function lastName()
	{
		//not logged in
		$last_name = substr($this->last_name,0,1).'.';

		//logged in
		$last_name = $this->last_name;

		return $last_name;
	}

	public function name()
	{
		return $this->first_name." ".$this->lastName();
	}
}