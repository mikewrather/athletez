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
			'foreign_key' => 'user_id'
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
     
    public function deleteTeam()
    {
        $teams = DB::delete('users_teams_link')->where('users_id','=', $this->id)->execute();
    
        return $teams;
    }
    
    public function deleteSport()
    {
        $sports = DB::delete('user_sport_link')->where('users_id','=', $this->id)->execute();
        return $sports;
    }
    
    public function deleteRole()
    {
        $roles = DB::delete('roles_users')->where('users_id','=', $this->id)->execute();
        return $roles;
    }
    
    public function deleteIdentity()
    {
        $identity = DB::delete('user_identities')->where('user_id','=', $this->id)->execute();
        return $identity;
    }
    
    public function updateUser($args = array())
    {
        extract($args);
        // email 
        // Updated Email Address
        if(isset($email))
        {
            $this->email = $email;
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
        try {
            $this->save();
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        }
        return $this; 
    }
	public function rules(){
		return array
		(
			// email (varchar)
			'email'=>array(
				array('not_empty'),
				array('email'),
				array('unique_email'),
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
			'password'=>array(
				array('not_empty'),
				array('min_length', array(':value', 4)),
				array('max_length', array(':value', 8)),
			),

			're_password'=>array(
				array('not_empty'),
				array('min_length', array(':value', 4)),
				array('max_length', array(':value', 8)),
				array('matches', array(':validation', ':field', 'password'))
			),
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
		$org_sport_link_obj = ORM::factory('Sportorg_Orgsportlink')
					->join('teams')->on('sportorg_orgsportlink.id', '=', 'teams.org_sport_link_id')					
					->join('users_teams_link')->on('users_teams_link.teams_id','=','teams.id')
					->where('users_teams_link.users_id', '=', $this->id);
		return $org_sport_link_obj;
	}
	
	public function getSports()
	{
		return $this->isports; 		
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

		if(isset($seasons_id) && $seasons_id !=""){
			$teams_obj->seasons_id = $seasons_id;
		}

		if(isset($year) && $year !=""){
			$teams_obj->year = $year;
		}

		if(isset($teams_id) && $teams_id != 0) // If team ID is provided add team
		{
			if(!$this->has('teams',$teams_id)) // CHECK IF USER ALREADY HAS TEAM ASSOCIATION
			{
				try
				{
					$this->add('teams',$teams_id);
					$resultArrary["success"] = 1;
				}
				catch(ErrorException $e)
				{
					$resultArrary["errorMsg"] = $e->getMessage();
				}
			}
		}
		else
		{
			$args = array('orgs_id' => $orgs_id, 'sports_id' => $sports_id);
			//Add new logic here.new teams validation
			$args1 = array('complevels_id' => $complevels_id, 'seasons_id' => $seasons_id);

			$combine_validate = Validation::factory(array_merge($args, $args1));
			$combine_validate->rule('orgs_id', 'not_equals', array(':value', 0))
				->rule('sports_id', 'not_equals', array(':value', 0))
				->rule('complevels_id', 'not_equals', array(':value', 0))
				->rule('seasons_id', 'not_equals', array(':value', 0));
			try
			{
				$org_sport_link->check($combine_validate);
			}
			catch(ORM_Validation_Exception $e)
			{
				return $e;
			}

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

			if(!$this->has('teams',$new_team)) // CHECK IF USER ALREADY HAS TEAM ASSOCIATION
			{
				try
				{
					$this->add('teams',$new_team);
					$resultArrary["success"] = 1;
				}
				catch(ErrorException $e)
				{
					$resultArrary["errorMsg"] = $e->getMessage();
				}
			}
		}
		return $this;

	}

	/*
	 * deprecated, comment by jeffrey
	 *
	 *
	public function addTeam_old($args)
	{
		$resultArrary = array("success"=>0);

		// EXTRACT VARIABLES FROM ARGUMENTS ARRAY
		extract($args);

		if(isset($teams_id)) // If team ID is provided add team
		{
			if(!$this->has('teams',$teams_id)) // CHECK IF USER ALREADY HAS TEAM ASSOCIATION
			{
				try
				{
					$this->add('teams',$teams_id);
					$resultArrary["success"] = 1;
				}
				catch(ErrorException $e)
				{
					$resultArrary["errorMsg"] = $e->getMessage();
				}
			}
		}
		else
		{
			if(!(isset($orgs_id) && isset($sports_id) && isset($complevels_id) && isset($seasons_id) && isset($year)))
			{
				//These must all be set if teams_id is not set
				$resultArrary["errorMsg"] = "Must either specify a team or all other criteria that picks out a team.";
				return $resultArrary;
			}

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

			if(!$this->has('teams',$new_team)) // CHECK IF USER ALREADY HAS TEAM ASSOCIATION
			{
				try
				{
					$this->add('teams',$new_team);
					$resultArrary["success"] = 1;
				}
				catch(ErrorException $e)
				{
					$resultArrary["errorMsg"] = $e->getMessage();
				}
			}

		}

		return $resultArrary;

	}
	 */

	public function getCommentsOn()
	{
		return Model_Site_Comment::getCommentsOn($this);
	}

	public function getCommentsOf()
	{
		return Model_Site_Comment::getCommentsOf($this);
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