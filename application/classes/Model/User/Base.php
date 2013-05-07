<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 12:17 AM
 */

class Model_User_Base extends Model_Auth_User implements Model_ACL_User
{
	public $error_message_path = 'models/user/user_base';

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
		'roles'       => array
		(
			'model' => 'Role',
			'through' => 'roles_users',
			'foreign_key' => 'user_id',
			'far_key' => 'role_id',
		),

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

	protected $_has_one = array(
		'userprofile' => array(
			'model' => 'User_Profile',
			'foreign_key' => 'users_id'
		),
	);

	/**
	 * protected $singlesport, if set, will be used to filter queries where a sport is relevant.
	 * @var null
	 */
	protected $singlesport = false;
     
    public function deleteTeam($args)
    {
        $teams = DB::delete('users_teams_link')
			->where('users_id','=', $this->id)
			->and_where('teams_id', '=', $args['teams_id'])
			->execute();
    
        return $teams;
    }
    
    public function deleteSport($args)
    {
        $sports = DB::delete('user_sport_link')
			->where('users_id','=', $this->id)
			->and_where('sports_id', '=', $args['sports_id'])
			->execute();
        return $sports;
    }
    
    public function deleteRole($args)
    {
        $roles = DB::delete('roles_users')
			->where('users_id','=', $this->id)
			->and_where('role_id', '=', $args['role_id'])
			->execute();
        return $roles;
    }
    
    public function deleteIdentity($args)
    {
        $identity = DB::delete('user_identities')
			->where('user_id','=', $this->id)
			->and_where('identity', '=', $args['identity_id'])
			->execute();
		return $identity;
    }
    
    public function updateUser($args = array())
    {
        extract($args);
        // email 
        // Updated Email Address
        if(isset($email))
        {
            //$this->email = $email;
        }
        // firstname 
        // Updated First Name
        if(isset($firstname))
        {
            $this->first_name  = $firstname;
        }
        
        // lastname 
        // Updated Last Name
        if(isset($lastname))
        {
            $this->last_name  = $lastname;
        }
        
        // password 
        // New Password
        if(isset($lastname))
        {
            $this->last_name  = $lastname;
        }
        // cities_id 
        // User's Home City
        if(isset($cities_id))
        {
            $this->cities_id  = $cities_id ;
        }

	    if(isset($password))
	    {
		    $this->password = $password;
	    }

		if(isset($id) && $id != "")
		{
			$this->id = $id;
		}

        try {
			$extra_validate = Validation::factory($args);
			if ($email == ""){

			}else{
				if ($this->email != $email){
					$extra_validate->rule('email','unique_email');
				}
			}

			if (isset($password)){
				$extra_validate->rule('password','not_empty');
				$extra_validate->rule('password','min_length', array(':value', 4));
				$extra_validate->rule('password','max_length', array(':value', 8));

				$extra_validate->rule('re_password','not_empty');
				$extra_validate->rule('re_password','min_length', array(':value', 4));
				$extra_validate->rule('re_password','max_length', array(':value', 8));
				$extra_validate->rule('re_password','matches', array(':validation', ':field', 'password'));
				$extra_validate->rule('cities_id','cities_id_exist');

				if ($this->check($extra_validate)){
					$this->password = Auth::instance()->hash($password);
					$this->email = $email;
					$this->update();
				}
			}else{
				$this->update($extra_validate);
			}

            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        }
    }

	public function addUser($args = array())
	{
		extract($args);
		// email
		// Updated Email Address
		if(isset($email))
		{
			$this->email = $email;
			$this->username = $email;
		}
		// firstname
		// Updated First Name
		if(isset($firstname))
		{
			$this->first_name  = $firstname;
		}

		// lastname
		// Updated Last Name
		if(isset($lastname))
		{
			$this->last_name  = $lastname;
		}

		// password
		// New Password
		if(isset($lastname))
		{
			$this->last_name  = $lastname;
		}
		// cities_id
		// User's Home City
		if(isset($cities_id))
		{
			$this->cities_id  = $cities_id ;
		}


		if(isset($password))
		{
			$this->password = $password;
		}

		if(isset($dob))
		{
			$this->dob = $dob;
		}

//		print_r($args);
		try {
			$extra_validate = Validation::factory($args);
			if ($email != ""){
				$extra_validate->rule('email','unique_email');
			}
			$extra_validate->rule('password','not_empty');
			$extra_validate->rule('password','min_length', array(':value', 4));
			$extra_validate->rule('password','max_length', array(':value', 8));

			$extra_validate->rule('re_password','not_empty');
			$extra_validate->rule('re_password','min_length', array(':value', 4));
			$extra_validate->rule('re_password','max_length', array(':value', 8));
			$extra_validate->rule('re_password','matches', array(':validation', ':field', 'password'));

			if ($this->check($extra_validate)){
				$this->password = Auth::instance()->hash($password);
				$this->create();
			}

			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function rules(){
		return array
		(
			// email (varchar)
			'email'=>array(
				array('not_empty'),
				array('email'),
			),

			// username (varchar)
			//TODO, add by jeffrey. no username field in add user page
//			'username'=>array(
//				array('not_empty'),
//				array('unique_username'),
//			),

			// first_name (varchar)
			'first_name'=>array(
				array('not_empty'),
				array('alpha'),
			),

			// last_name (varchar)
			'last_name'=>array(
				array('not_empty'),
				array('alpha'),
			),


			// password (varchar)


			/* Validate not required
			// login_count (int)
			'login_count'=>array(
				array('not_empty'),
				array('digit'),
			),

			// last_login (int)
			'last_login'=>array(
				array('not_empty'),
				array('digit'),
			),
			*/

			/* Validate not required
			// cities_id (int)
			'cities_id'=>array(
				array('not_empty'),
				array('digit'),
			),

			// date_created (date)
			'date_created'=>array(
				array('not_empty'),
				array('date'),
			),

			// logins (int)
			'logins'=>array(
				array('not_empty'),
				array('digit'),
			),
			*/
		);
	}

	public function filters()
	{
		return array(
//			'password' => array(
//				array(array(Auth::instance(), 'hash'))
//			)
		);
	}
	 
	public function getPrimaryVideo()
	{
		$profile = $this->userprofile;
		$profile_obj = $profile->getBasics();		
		$media = $this->media->where('id', '=', $profile_obj['primary_video_id'])->and_where('media_type','=','video');
		 
		return $media->video;
	}
	
	public function getPositions()
	{
		//loop through teams and get positions for each.
	}

	public function getVideos()
	{
		return $this->media->where('media_type','=','video');
	}

	public function getImages()
	{
		return $this->media->where('media_type','=','image');

	}

	public function getOrgs()
	{
		$retArr = array();
		$org_sport_link_obj = DB::select(array('users.id', 'user_id'), 'orgs.*', array('orgs.id', 'org_id'), array('orgs.name', 'org_name'))
			->from('users')
			->join('users_teams_link')->on('users.id','=','users_teams_link.users_id')
			->join('teams')->on('teams.id','=','users_teams_link.teams_id')
			->join('org_sport_link')->on('org_sport_link.id','=','teams.org_sport_link_id')
			->join('orgs')->on('orgs.id','=','org_sport_link.orgs_id')
			->where('users.id','=',$this->id)
			->group_by('orgs.id');

		return (object)$org_sport_link_obj;
		
		/*$res = $org_sport_link_obj->execute();

		foreach($res as $data)
		{
			$retArr[] = $data;
		}

		print '<pre>';
		print_r($retArr);
		exit;
		//return (object)$retArr;
		/*$org_sport_link_obj = ORM::factory('Sportorg_Orgsportlink')
					->join('teams')->on('sportorg_orgsportlink.id', '=', 'teams.org_sport_link_id')					
					->join('users_teams_link')->on('users_teams_link.teams_id','=','teams.id')
					->where('users_teams_link.users_id', '=', $this->id);*/
		
	}
	
	public function getSports()
	{
		$positions_qry = DB::select('positions_id')
			->from('utl_position_link')
			->where('is_primary','=','1')
			->and_where('users_teams_link_id', '=', DB::expr('`users_teams_link`.`id`'));

		$utl = DB::select('org_sport_link.sports_id',array($positions_qry,'positions_id'),array(DB::expr('"team"'),'sport_type'))
			->from('users_teams_link')
			->join('teams')->on('users_teams_link.teams_id', '=', 'teams.id')
			->join('org_sport_link')->on('org_sport_link.id','=','teams.org_sport_link_id')
			->group_by('org_sport_link.sports_id')
			->where('users_teams_link.users_id', '=', $this->id);

		$isports = DB::select('sports_id',array(DB::expr('NULL'),'positions_id'),array(DB::expr('"individual"'),'sport_type'))
			->union($utl)
			->from('user_sport_link')
			->where('users_id','=',$this->id);


		return $isports;
	}
	
	public function getRelated()
	{
		
	}
	
	public function getBasics()
	{
		$num_votes = Model_Site_Vote::getNumVotes($this);
		$num_followers = Model_User_Followers::num_followers($this);
		if ($this->user_picture){
			$user_image_meta = Model_Media_Image::get_user_image_meta( $this->user_picture)->as_array();
			foreach($user_image_meta as $b){
				if ($b->image_prop == 'url')
					$user_picture = $b->image_val;
			}
		}

//		$utl_results = $this->utl->find_all();
//		$results = array();
//		foreach($utl_results as $tmp_utl){
//			$results[] = $tmp_utl->as_array();
//		}

		return array(
			"id" => $this->id,
			"email" => $this->email,
			"name" => $this->first_name." ".$this->last_name,
			"date_created" => $this->date_created,
			"login_count" => $this->login_count,
			"last_login" => $this->last_login,
			"user_weight" => $this->weight_lb,
			"user_height" => $this->height_in,
			"grad_year" => $this->grad_year,
			"user_picture" => $user_picture,
			"num_followers" => $num_followers,
			"num_votes" => $num_votes,
			"city" => $this->city->getBasics(),
			//"utl" =>$results
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
	
	public function getTeams()
	{
		return $this->teams;
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

		return (object)$retArr;
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

	public function getSearch($args = array()){
		extract($args);

		//$this->select();
		//$this->select(array(concat('user_base.first_name',' ','user_base.last_name'), 'full_name'));

		$this->join('users_teams_link')->on('users_teams_link.users_id', '=', 'user_base.id');
		$this->join('teams')->on('users_teams_link.teams_id', '=', 'teams.id');


		if (isset($sports_id)){
			$this->join('org_sport_link')->on('org_sport_link.id', '=', 'teams.org_sport_link_id');
			$this->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if (isset($complevels_id)){
			$this->where('teams.complevels_id', '=', $complevels_id);
		}

		if (isset($positions_id)){
			$this->join('utl_position_link')->on('utl_position_link.users_teams_link_id', '=', 'users_teams_link.id');
			$this->where('utl_position_link.positions_id', '=', $positions_id);
		}

		if (isset($gradyear)){
			$this->where('user_base.grad_year', '=', $gradyear);
		}

		$enttype_id = Model_Site_Enttype::getMyEntTypeID($this);
		if (!isset($orderby)){
			$this->join('votes')->on('votes.subject_id', '=', 'user_base.id');
			$this->where('votes.subject_enttypes_id', '=', $enttype_id);
			$this->order_by('num_votes', 'asc');
		}else{
			$this->order_by($orderby, 'asc');
		}

		if (isset($searchtext)){
			$this->where(array(Db::expr('CONCAT(user_base.first_name," ",user_base.last_name)'), 'full_name'), 'like ','%'.$searchtext.'%');
		}

		return $this;
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

	/** Modified by Jeffrey
	 * @param $args
	 * @return Model_User_Base|ORM_Validation_Exception
	 */
	public function addTeam($args)
	{
		$resultArrary = array();
		extract($args);
		$teams_obj = ORM::factory('Sportorg_Team');
		$org_sport_link = ORM::factory('Sportorg_Orgsportlink');

		if(isset($orgs_id) && $orgs_id !=""){
			$org_sport_link->orgs_id = $orgs_id;
		}

		if(isset($sports_id) && $sports_id !=""){
			$org_sport_link->sports_id = $sports_id;
		}

		if(isset($complevels_id) && $complevels_id !=""){
			$teams_obj->complevels_id = $complevels_id;
		}

		if(isset($seasons_arr)){
			//$teams_obj->seasons_id = $seasons_id;
		}

		if(isset($year) && $year !=""){
			$teams_obj->year = $year;
		}

		if(isset($teams_id) && $teams_id != 0) // If team ID is provided add team
		{
			try
			{
				$user_teams_link = ORM::factory("User_Teamslink");
				$user_teams_link->users_id = $users_id;
				$user_teams_link->teams_id = $teams_id;
				$validate_array = array('users_id'=>$users_id, 'teams_id'=>$teams_id);
				$external_validate = Validation::factory($validate_array);
				$external_validate->rule('users_id', 'users_teams_exist', array($users_id, $teams_id));
				if ($user_teams_link->check($external_validate))
					$user_teams_link->save();
			}
			catch(ORM_Validation_Exception $e)
			{
				return $e;
			}
			return $this;
		}else{
			foreach($seasons_arr as $seasons_id){
				try
				{
				//$org_sport_link->seasons_id = $seasons_id;
				$args = array('orgs_id' => $orgs_id, 'sports_id' => $sports_id);
				//Add new logic here.new teams validation
				//$args1 = array('complevels_id' => $complevels_id, 'seasons_id' => $seasons_id);
				//$a = array_merge($args, $args1);
				$combine_validate = Validation::factory($args);
				$combine_validate->rule('orgs_id', 'orgs_id_exist')
					->rule('sports_id', 'sports_id_exist');
					//->rule('complevels_id', 'complevels_id_exist')
					//->rule('seasons_id', 'seasons_id_exist');

					$org_sport_link->check($combine_validate);


				//Find Org / Sport link
				$org_sport_link = ORM::factory('Sportorg_Orgsportlink')
					->where('orgs_id','=',$orgs_id)
					->and_where('sports_id','=',$sports_id)
					->find();

				if(!$org_sport_link->loaded()) // This means the organization does not have this sport
				{

					unset($org_sport_link);
					//Add the Association
					$org_sport_link = ORM::factory('Sportorg_Orgsportlink');
					$org_sport_link->orgs_id = $orgs_id;
					$org_sport_link->sports_id = $sports_id;
					$org_sport_link->save();
				}

				$new_team = ORM::factory('Sportorg_Team')
					->where('org_sport_link_id','=',$org_sport_link->id)
					->and_where('seasons_id','=',$seasons_id)
					->and_where('complevels_id','=',$complevels_id)
					->and_where('year','=',$year)
					->find();

				// CHECK IF TEAM EXISTS AND CREATE IT IF IT DOESN'T
				if(!$new_team->loaded())
				{
					unset($new_team);
					$new_team = ORM::factory('Sportorg_Team');
					$new_team->org_sport_link_id = $org_sport_link->id;
					$new_team->complevels_id = $complevels_id;
					$new_team->seasons_id = $seasons_id;
					$new_team->year = $year;
					$new_team->save();
				}

				if(!$this->has('teams', $new_team)) // CHECK IF USER ALREADY HAS TEAM ASSOCIATION
				{
					$user_teams_link = ORM::factory("User_Teamslink");
					$user_teams_link->users_id = $users_id;
					$user_teams_link->teams_id = $new_team->id;
					$user_teams_link->save();
				}
			}catch(ORM_Validation_Exception $e)
					{
						return $e;
					}
			}
			return $this;
		}
	}


	public function addRegister($args){
		extract($args);
		if(isset($email))
		{
			$this->email = $email;
			$this->username = $email;
		}
		// firstname
		// Updated First Name
		if(isset($firstname))
		{
			$this->first_name  = $firstname;
		}

		// lastname
		// Updated Last Name
		if(isset($lastname))
		{
			$this->last_name  = $lastname;
		}

		// password
		// New Password
		if(isset($lastname))
		{
			$this->last_name  = $lastname;
		}
		// cities_id
		// User's Home City
		if(isset($gender))
		{
			$this->gender = $gender ;
		}

		if(isset($password))
		{
			$this->password = $password;
		}

		if(isset($dob))
		{
			$this->dob = date('Y-m-d',strtotime($dob));
		}
//		print_r($args);
		try {
			$extra_validate = Validation::factory($args);
			$extra_validate->rule('email','unique_email');
			$extra_validate->rule('password','not_empty');
			$extra_validate->rule('password','min_length', array(':value', 4));
			$extra_validate->rule('password','max_length', array(':value', 8));

			$extra_validate->rule('re_password','not_empty');
			$extra_validate->rule('re_password','min_length', array(':value', 4));
			$extra_validate->rule('re_password','max_length', array(':value', 8));
			$extra_validate->rule('re_password','matches', array(':validation', ':field', 'password'));

			$extra_validate->rule('gender', 'in_array', array(':value', array(0, 1)));
			$extra_validate->rule('dob','not_empty');
			$extra_validate->rule('dob','date');
			$extra_validate->rule('dob','valid_age_frame', array($dob));

			if ($this->check($extra_validate)){
				$ai = Auth::instance();
				$this->password = $ai->hash($password);
				$this->create();

				//Log out if already logged in
				//if($ai->logged_in()) $ai->logout();

				// Log in the user that was just created
				//Auth::instance()->login($this->email,$password,TRUE);

			}

			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getCommentsOn()
	{
		return Model_Site_Comment::getCommentsOn($this);
	}

	public function getCommentsOf()
	{
		return Model_Site_Comment::getCommentsOf($this);
	}

	//TODO, Add by Jeffrey, Have issues, need verify later
	public function updateUserTeam($args = array()){
		extract($args);
		$ut_link = ORM::factory("User_Teamslink");
		$results = $ut_link->where('users_id', '=', $users_id)->find_all();
		try {
			foreach($results as $result){
				$result->teams_id = $teams_id;
				$result->update();
			}
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	/** Not used yet, comment it temporarily by Jeffrey,
	 * developer can use custom unique_username rule in valid.php
	 *
	 * @param $email
	 * @return bool

	public static function unique_username($email)
	{
		// Check if the username already exists in the database
		return ! DB::select(array(DB::expr('COUNT(id)'), 'total'))
			->from('users')
			->where('email', '=', $email)
			->execute()
			->get('total');
	}
	*/


	/**
	 * Wrapper method to execute ACL policies. Only returns a boolean, if you
	 * need a specific error code, look at Policy::$last_code
	 * @param string $policy_name the policy to run
	 * @param array $args arguments to pass to the rule
	 * @return boolean
	 */
	public function can($policy_name, $args = array())
	{
		$status = FALSE;
		try
		{
			$refl = new ReflectionClass('Policy_' . $policy_name);
			$class = $refl->newInstanceArgs();
			$status = $class->execute($this, $args);
			if (TRUE === $status)
				return TRUE;
		}
		catch (ReflectionException $ex) // try and find a message based policy
		{
			// Try each of this user's roles to match a policy
			foreach ($this->roles->find_all() as $role)
			{
				$status = Kohana::message('policy', $policy_name.'.'.$role->id);
				if ($status)
					return TRUE;
			}

		}
		// We don't know what kind of specific error this was
		if (FALSE === $status)
		{
			$status = Policy::GENERAL_FAILURE;
		}
		Policy::$last_code = $status;
		return TRUE === $status;
	}

	/**
	 * Wrapper method for self::can() but throws an exception instead of bool
	 * @param string $policy_name the policy to run
	 * @param array $args arguments to pass to the rule
	 * @throws Policy_Exception
	 * @return null
	 */
	public function assert($policy_name, $args = array())
	{
		$status = $this->can($policy_name, $args);
		if (TRUE !== $status)
		{
			throw new Policy_Exception(
				'Could not authorize policy :policy',
				array(':policy' => $policy_name),
				Policy::$last_code
			);
		}
	}
}