<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 12:17 AM
 */

class Model_User_Base extends Model_Auth_User implements Model_ACL_User
{
	public $error_message_path = 'models/user';

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
			'foreign_key' => 'users_id',
			'far_key' => 'roles_id',
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
			'foreign_key' => 'users_id'
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

		'testscores' => array(
			'model' => 'Academics_Tests_Scores',
			'foreign_key' => 'users_id',
		),

		'gpa' => array(
			'model' => 'Academics_Gpa',
			'foreign_key' => 'users_id',
		),

	);

    public function deleteTeam($args)
    {
		$ut_link = ORM::factory('User_Teamslink');
		$result = $ut_link->where('users_id','=', $this->id)
			->and_where('teams_id', '=', $args['teams_id'])->find();
		if (!$result->id){
			return false;
		}else{
//			$teams = DB::delete('users_teams_link')
//				->where('users_id','=', $this->id)
//				->and_where('teams_id', '=', $args['teams_id'])
//				->execute();
			$user_team_link = ORM::factory('User_Teamslink', $result->id);
			$user_team_link->delete_with_deps();
			return true;
		}
    }
    
    public function deleteSport($args)
    {
		$usl_model = ORM::factory('User_Sportlink');
		$result = $usl_model->where('users_id','=', $this->id)
			->and_where('sports_id', '=', $args['sports_id'])
			->find();
		if (!$result->id){
			return false;
		}else{
			$usl_model = ORM::factory('User_Sportlink', $result->id);
			$usl_model->delete_with_deps();
        	return true;
		}
    }
    
    public function deleteRole($args)
    {
		$user_role_model = ORM::factory('Rolesusers');
		$result = $user_role_model->where('users_id','=', $this->id)
			->and_where('roles_id', '=', $args['role_id'])
			->find();

		if (!$result->id){
			return false;
		}else{
			$roleuser_model = ORM::factory('Rolesusers', $result->id);
			$roleuser_model->delete_with_deps();
			return true;
		}
    }
    
    public function deleteIdentity($args = array())
    {
		$identity_model = ORM::factory('User_Identity');
		$result = $identity_model->where('users_id','=', $this->id)
			->where('identity', '=', $args['identity'])
			->find();

		if (!$result->id){
			return false;
		}else{
			$identity_model = ORM::factory('User_Identity', $result->id);
			$identity_model->delete_with_deps();
			return true;
		}
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
	    else
	    {
		    $args['email'] = $this->email;
	    }
        // firstname 
        // Updated First Name
        if(isset($firstname))
        {
            $this->first_name  = $firstname;
        }
        else
        {
	        $args['firstname'] = $this->first_name;
        }
        
        // lastname 
        // Updated Last Name
        if(isset($lastname))
        {
            $this->last_name  = $lastname;
        }
        else
        {
	        $args['lastname'] = $this->last_name;
        }


        // cities_id 
        // User's Home City
        if(isset($cities_id))
        {
            $this->cities_id  = $cities_id ;
        }
        else
        {
	        $args['cities_id'] = $this->cities_id;
        }


        try {
			$extra_validate = Validation::factory($args);
			if ($email == ""){

			}else{
				if ($this->email != $email){
					$this->email = $email;
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

		if(isset($email) && $email != ""){
			$this->email = $email;
		}

		try {
			$extra_validate = Validation::factory($args);
			if ($email != ""){

				$extra_validate->rule('email','unique_email');
			}
			$extra_validate->rule('password','not_empty');
			$extra_validate->rule('password','min_length', array(':value', 6));
			$extra_validate->rule('password','max_length', array(':value', 16));

			$extra_validate->rule('re_password','not_empty');
			$extra_validate->rule('re_password','min_length', array(':value', 6));
			$extra_validate->rule('re_password','max_length', array(':value', 16));
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

	public function follow($object)
	{

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
		if($primary = Model_Media_Base::find_most_voted_tag($this,'video',1))
		{
			$video_meta = $primary->get_types_and_meta_as_array();
		}
		return $video_meta;
	}
	
	public function getPositions()
	{
		$pos_arr = array();
		if(!$this->loaded()) return array();
		//loop through teams and get positions for each.

		foreach($this->utl->find_all() as $link)
		{
			$positions = $link->positions->find_all();
			foreach($positions as $position)
			{
				$pos_arr[$position->id] = $position;
			}
		}
		return $pos_arr;
	}

	public function getResumeDataTree()
	{
		if(!$this->loaded()) return false;

		$rdp = ORM::factory('User_Resume_Data_Profile');
		$rdps = $rdp->getRDPForUser($this,'array');


		$profiles = array();
		foreach($rdps as $rdp_id => $rdp)
		{
		//	print_r($rdp->as_array());

			$datagroups = $rdp->datagroups->find_all();
			foreach($datagroups as $group)
			{

				if(array_key_exists($group->id,$profiles))
				{
					if(!array_key_exists($rdp_id,$profiles[$group->id]["profiles"]))
					{
						$profiles[$group->id]["profiles"][$rdp_id] = array(
							"name" => $rdp->name
						);
					}
				}
				else
				{
					$profiles[$group->id] = array(
						"name" => $group->name,
						"description" => $group->description,
						"profiles" => array(
							$rdp_id=>array(
								"name" => $rdp->name
							)
						),
					);

					$resdata = $group->resdata->find_all();
					foreach($resdata as $data)
					{
						$val = $data->datavals->where('users_id','=',$this->id)->find();
						$profiles[$group->id]["data"][$data->id] = array(
							"name" => $data->name,
							"type" => $data->resume_data_type,
							"val" => $val->loaded() ? $val->user_value : false,
							"id" => $val->loaded() ? $val->id : 0,
							"resume_data_id" => $data->id,
						);
					}
				}
			}
		}

		return $profiles;

	}
	public function getUploadedVideos($obj, $sports_id = null)
	{
		return Model_Media_Video::getVideos($obj, $sports_id);
	}

	public function getVideos($obj=NULL, $sports_id = null)
	{
		if($obj===NULL) $obj = $this;
		$video = ORM::factory('Media_Video');
		return $video->getTagedVideos($obj, $sports_id);
	}

	public function getImages($obj, $sports_id = null){
		if($obj===NULL) $obj = $this;
		$image = ORM::factory('Media_Image');
		return $image->getTagedImages($obj, $sports_id);
	}

	public function getUploadedImages($sports_id = null)
	{
		$media = $this->media->where('media_type','=','image');
		if ($sports_id){
			$media->where('sports_id', '=', $sports_id);
		}
		$result_arr = null;

		foreach($media->find_all() as $single_media){
			$combine_object = new stdClass();
			$num_votes = Model_Site_Vote::getNumVotes($single_media->image);
			//$image_meta = $single_media->image->get_meta_as_array();
			$image_id = $single_media->image->id;
			//$image_title = $image_meta['title'];
			$combine_object->image_id = $image_id;
			//$combine_object->image_path = $image_meta['thumb_url'];
			//$combine_object->image_title = $image_title;
			$combine_object->num_votes = $num_votes;
			$result_arr[] = $combine_object;
			unset($combine_object);
		}
		$return_obj = new stdClass();
		$return_obj->result = $result_arr;
		return $return_obj;
	}


	public function getOrgs($sports_id,$groupby=NULL,$org_type=NULL)
	{
		$org_sport_link_obj = DB::select(
				array('users_teams_link.id', 'utl_id'),
				array('users.id', 'user_id'),
				array('orgs.id', 'org_id'),
				array('orgs.name', 'org_name'),
				'teams.*',
				array('sports.name','sport'),
				array('sports.id','sports_id'),
				array('teams.id', 'team_id'),
				array('complevels.name', 'complevel_name'),
				array('seasons.name', 'season'), 'statvals.statval',
				array('seasons.id', 'seasons_id')
			)
			->from('users')
			->join('users_teams_link')->on('users.id','=','users_teams_link.users_id')
			->join('teams')->on('teams.id','=','users_teams_link.teams_id')
			->join('org_sport_link')->on('org_sport_link.id','=','teams.org_sport_link_id')
			->join('sports')->on('org_sport_link.sports_id','=','sports.id')
			->join('orgs')->on('orgs.id','=','org_sport_link.orgs_id')
			->join('complevels', 'LEFT')->on('complevels.id','=','teams.complevels_id')
			->join('seasons', 'LEFT')->on('seasons.id','=','teams.seasons_id')
			->join('statvals', 'LEFT')->on('statvals.teams_id','=','teams.id')
			->where('users.id','=',$this->id);
		$classes_arr['User_Base'] = 'users';
		$classes_arr['User_Teamslink'] = 'users_teams_link';
		$classes_arr['Sportorg_Team'] = 'teams';
		$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';
		$classes_arr['Sportorg_Sport'] = 'sports';
		$classes_arr['Sportorg_Org'] = 'orgs';
		$classes_arr['Sportorg_Complevel_Base'] = 'complevels';
		$classes_arr['Sportorg_Seasons_Base'] = 'seasons';
		$classes_arr['Stats_Vals'] = 'statvals';

		if ($sports_id){
			$org_sport_link_obj->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if($org_type=='club')
		{
			$org_sport_link_obj->where('orgs.sports_club','=',1);
		}
		elseif(strstr($org_type,'school'))
		{
			$org_sport_link_obj->where('orgs.sports_club','=',0);
		}

		$org_sport_link_obj->group_by('teams.id')
			->order_by('org_id')
			->order_by('sports_id')
			->order_by('complevels_id');

		$org_sport_link_obj = ORM::_sql_exclude_deleted($classes_arr, $org_sport_link_obj);
		$res = $org_sport_link_obj->execute();

	//	print_r($res);

		$orgs = array(
			"groupby" => $groupby
		);

		foreach($res as $team)
		{
			if(!array_key_exists($team['org_id'],$orgs))
			{
				// Create the org array
				$orgs[$team['org_id']] = array(
					'org_id' => $team['org_id'],
					'org_name' => $team['org_name'],
				);
			}

			$org_position = ORM::factory('Sportorg_Position')
				->join('utl_position_link','LEFT')->on('sportorg_position.id','=','utl_position_link.positions_id')
				->where('users_teams_link_id','=',$team['utl_id']);
			$classes_arr = array();
			$classes_arr['Sportorg_Position'] = "sportorg_position";
			$classes_arr['User_Teamslink_Positionlink'] = "utl_position_link";

			$org_position = ORM::_sql_exclude_deleted($classes_arr, $org_position);
			$positions = $org_position->find_all();
			$positions_array = NULL;
			foreach($positions as $position)
			{
				$positions_array[] = $position->getBasics();
			}

			$this_org_item = array(
				'team_id' => $team['team_id'],
				'team_name' => $team['unique_ident'],
				'year' => $team['year'],
				'complevel' => $team['complevel_name'],
				'season' => $team['season'],
				'seasons_id' => $team['seasons_id'],
				'positions' => is_array($positions_array) ? array_values($positions_array) : null,
			);

			if($sports_id)
			{
				$orgs[$team['org_id']]["teams"][$team['team_id']] = $this_org_item;
			}
			else
			{
				if(!isset($orgs[$team['org_id']]["sports"][$team['sports_id']]))
				{
					$orgs[$team['org_id']]["sports"][$team['sports_id']] = array(
						"sports_name" => $team['sport'],
						"sports_id" => $team['sports_id'],
						"complevels" => array(),
					);
				}
				if(!isset($orgs[$team['org_id']]["sports"][$team['sports_id']]["complevels"][$team['complevels_id']]))
				{
					$orgs[$team['org_id']]["sports"][$team['sports_id']]["complevels"][$team['complevels_id']] =array(
						"name" => $team['complevel_name'],
						"complevels_id" => $team['complevels_id'],
						"seasons" => array(),
					);
				}
				$orgs[$team['org_id']]["sports"][$team['sports_id']]["complevels"][$team['complevels_id']]["seasons"][] = $this_org_item;
			}
		}
		// Get rid of unnecessary keys
		foreach($orgs as $key => &$org)
		{
			if($key=='groupby') continue;
			if(isset($org['sports']) && sizeof($org['sports']) > 0){
				foreach($org['sports'] as &$sport)
				{
					$sport["complevels"] = Util::strip_array_keys($sport["complevels"]);
				}
				$org["sports"] = Util::strip_array_keys($org["sports"]);
			}

		}

		//Return null as result if not value
		$std = new stdClass();
		if (empty($orgs)){
			$std->result = null;
			return $std;
		}

		//$orgs = Util::obj_arr_toggle($orgs);
		//$std->result = (object)$orgs;
		return array("result" =>$orgs);
	}

	public function getOrgs_bak($sports_id,$groupby=NULL,$org_type=NULL)
	{
		$org_sport_link_obj = DB::select(
			array('users_teams_link.id', 'utl_id'),
			array('users.id', 'user_id'),
			array('orgs.id', 'org_id'),
			array('orgs.name', 'org_name'),
			'teams.*',
			array('teams.id', 'team_id'),
			array('complevels.name', 'complevel_name'),
			array('seasons.name', 'season'), 'statvals.statval'
		)
			->from('users')
			->join('users_teams_link')->on('users.id','=','users_teams_link.users_id')
			->join('teams')->on('teams.id','=','users_teams_link.teams_id')
			->join('org_sport_link')->on('org_sport_link.id','=','teams.org_sport_link_id')
			->join('orgs')->on('orgs.id','=','org_sport_link.orgs_id')
			->join('complevels', 'LEFT')->on('complevels.id','=','teams.complevels_id')
			->join('seasons', 'LEFT')->on('seasons.id','=','teams.seasons_id')
			->join('statvals', 'LEFT')->on('statvals.teams_id','=','teams.id')
			->where('users.id','=',$this->id);
		if ($sports_id){
			$org_sport_link_obj->where('org_sport_link.sports_id', '=', $sports_id);
		}

		if($org_type=='club')
		{
			$org_sport_link_obj->where('orgs.sports_club','=',1);
		}
		elseif(strstr($org_type,'school'))
		{
			$org_sport_link_obj->where('orgs.sports_club','=',0);
		}

		$org_sport_link_obj->group_by('teams.id');


		$res = $org_sport_link_obj->execute();

		$orgs = array(
			"groupby" => $groupby
		);

		foreach($res as $team)
		{
			if(!array_key_exists($team['org_id'],$orgs))
			{
				// Create the org array
				$orgs[$team['org_id']] = array(
					'org_id' => $team['org_id'],
					'org_name' => $team['org_name'],
					'teams' => array()
				);
			}

			$positions = ORM::factory('Sportorg_Position')
				->join('utl_position_link','LEFT')->on('sportorg_position.id','=','utl_position_link.positions_id')
				->where('users_teams_link_id','=',$team['utl_id'])
				->find_all();

			$positions_array = NULL;
			foreach($positions as $position)
			{
				$positions_array[$position->id] = $position->getBasics();
			}

			$this_org_item = array(
				'team_id' => $team['team_id'],
				'team_name' => $team['unique_ident'],
				'year' => $team['year'],
				'complevel' => $team['complevel_name'],
				'season' => $team['season'],
				'positions' => $positions_array,
			);

			if($groupby == 'complevel')
			{
				$orgs[$team['org_id']]['teams'][$team['complevel_name']][] = $this_org_item;
			}
			else
			{
				$orgs[$team['org_id']]['teams'][] = $this_org_item;
			}

		}
		//Return null as result if not value
		$std = new stdClass();
		if (empty($orgs)){
			$std->result = null;
			return $std;
		}

		$orgs = Util::obj_arr_toggle($orgs);
		$std->result = (object)$orgs;
		return $std;
	}
	
	public function getSports($format='select',$sport_type_id=NULL)
	{
		$positions_qry = DB::select('positions_id')
			->from('utl_position_link')
			->where('is_primary','=','1')
			->and_where('users_teams_link_id', '=', DB::expr('`users_teams_link`.`id`'));

		$classes_arr = array('User_Teamslink_Positionlink' => 'utl_position_link');
		$positions_qry = ORM::_sql_exclude_deleted($classes_arr, $positions_qry);

		$utl = DB::select('org_sport_link.sports_id',array($positions_qry,'positions_id'),array(DB::expr('"team"'),'sport_type'))
			->from('users_teams_link')
			->join('teams')->on('users_teams_link.teams_id', '=', 'teams.id')
			->join('org_sport_link')->on('org_sport_link.id','=','teams.org_sport_link_id')
			->group_by('org_sport_link.sports_id')
			->where('users_teams_link.users_id', '=', $this->id);

		$classes_arr = array();
		$classes_arr['User_Teamslink'] = 'users_teams_link';
		$classes_arr['Sportorg_Team'] = 'teams';
		$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';


		if($sport_type_id != NULL)
		{
			$utl->join('sports')->on('sports.id','=','org_sport_link.sports_id')->where('sports.sport_type_id','=',$sport_type_id);
			$classes_arr['Sportorg_Sport'] = 'sports';
		}
		$utl = ORM::_sql_exclude_deleted($classes_arr, $utl);

		$classes_arr = array();
		$isports = DB::select('sports_id',array(DB::expr('NULL'),'positions_id'),array(DB::expr('"individual"'),'sport_type'))
			->union($utl)
			->from('user_sport_link')
			->where('users_id','=',$this->id);
		$classes_arr['User_Sportlink'] = 'user_sport_link';

		if($sport_type_id != NULL)
		{
			$isports->join('sports')->on('sports.id','=','sports_id')->where('sports.sport_type_id','=',$sport_type_id);
			$classes_arr['Sportorg_Sport'] = 'sports';
		}


		//exclude sports itself
		$isports = ORM::_sql_exclude_deleted($classes_arr, $isports);

		if($format=='select') return $isports;
		elseif($format=='array')
		{
			$sports_arr = array();
			$res = $isports->execute();
			foreach($res as $rs)
			{
				$sport = ORM::factory('Sportorg_Sport',$rs['sports_id']);
				if($sport->loaded())
				{
					if(!array_key_exists($sport->id,$sports_arr))
					{
						$sports_arr[$sport->id] = $sport;
					}
				}

			}
			return $sports_arr;
		}
	}

	public function getAwards($args = array()){
		extract($args);
		$awards_model = ORM::factory('User_Awards');
		if (isset($users_id)){
			$awards_model->where('users_id', '=', $users_id);
		}

		if (isset($sports_id)){
			$awards_model->where('sports_id', '=', $sports_id);
		}
		//exclude itself
		$classes_arr = array(
			'User_Awards' => 'user_awards'
		);
		$awards_model = ORM::_sql_exclude_deleted($classes_arr, $awards_model);

		return $awards_model;
	}

	public function getReferences($args = array()){
		extract($args);
		$references_model = ORM::factory('User_References');
		if (isset($users_id)){
			$references_model->where('users_id', '=', $users_id);
		}

		if (isset($sports_id)){
			$references_model->where('sports_id', '=', $sports_id);
		}

		//exclude itself
		$classes_arr = array(
			'User_References' => 'user_references'
		);
		$references_model = ORM::_sql_exclude_deleted($classes_arr, $references_model);

		return $references_model;
	}

	public function getContact($args = array()){
		extract($args);
		$contacts_model = ORM::factory('User_Contact');
		if (isset($users_id)){
			$contacts_model->where('users_id', '=', $users_id);
		}
		//exclude itself
		$classes_arr = array(
			'User_Contact' => 'user_contact'
		);
		$contacts_model = ORM::_sql_exclude_deleted($classes_arr, $contacts_model);
		return $contacts_model;
	}

	public function getRelated()
	{

	}

	public function getAvatar()
	{
		if ($this->user_picture > 0){
			$image = ORM::factory('Media_Image',$this->user_picture);
			return $image->getBasics(array('user'));
		}
	}

	public function getBasics()
	{
		$num_votes = Model_Site_Vote::getNumVotes($this);
		$num_followers = Model_User_Followers::num_followers($this);
		$user_picture = $this->getAvatar();

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
			"dob" => $this->dob,
			"ncaa" => $this->ncaa,
			"gender" => $this->gender
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

	public function getTeams($args = array())
	{
		extract($args);
		$team = $this->teams;
		if (isset($sport_id)){
			$team->join('org_sport_link')
				->on('org_sport_link.id', '=', 'sportorg_team.org_sport_link_id')
				->where('org_sport_link.sports_id', '=', $sport_id);
			$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';
		}
		//exclude itself
		$classes_arr['Sportorg_Team'] = 'sportorg_team';
		$team = ORM::_sql_exclude_deleted($classes_arr, $team);
		return $team;
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

		$res = $usersFitnessData->execute();
		foreach($res as $data)
		{
			$retArr[$data['id']] = $data;
		}

		return $retArr;
	}

	public function getSearch($args = array()){
		extract($args);

		$user_model = DB::select(array('users.id','users_id'))
			->from('users');

		if (isset($sports_id) || isset($complevels_id) || isset($positions_id))
		{
			$user_model->join('users_teams_link')->on('users_teams_link.users_id', '=', 'users.id');
			$user_model->join('teams')->on('users_teams_link.teams_id', '=', 'teams.id');
			$classes_arr['User_Teamslink'] = 'users_teams_link';
			$classes_arr['Sportorg_Team'] = 'teams';
		}

		if (isset($sports_id)){
			$user_model->join('org_sport_link')->on('org_sport_link.id', '=', 'teams.org_sport_link_id');
			$user_model->where('org_sport_link.sports_id', '=', $sports_id);
			$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';

		}

		if (isset($states_id)){
			$user_model->join('cities')->on('users.cities_id', '=', 'cities.id');
			$user_model->where('cities.states_id', '=', $states_id);
			$classes_arr['Location_City'] = 'cities';
		}

		if (isset($complevels_id)){
			$user_model->where('teams.complevels_id', '=', $complevels_id);
		}

		if (isset($positions_id)){
			$user_model->join('utl_position_link')->on('utl_position_link.users_teams_link_id', '=', 'users_teams_link.id');
			$user_model->where('utl_position_link.positions_id', '=', $positions_id);
			$classes_arr['User_Teamslink_Positionlink'] = 'utl_position_link';
		}

		if (isset($gradyear)){
			$user_model->where('users.grad_year', '=', $gradyear);
		}

		if (isset($cities_id)){
			$user_model->where('users.cities_id', '=', $cities_id);
		}

		$user_model = sizeof($classes_arr) > 0 ? ORM::_sql_exclude_deleted($classes_arr,$user_model) : $user_model;

		$enttype_id = Model_Site_Enttype::getMyEntTypeID($this);

		// NUM VOTES
		if (!isset($orderby) || $orderby == 'votes')
		{

			$num_votes = DB::select(array(DB::expr('COUNT(*)'),'num_votes'))
				->from('votes')
			//	->join('users','LEFT')->on('users.id','=','votes.subject_id')
				->where('subject_enttypes_id','=',$enttype_id)
				->where('votes.subject_id','=',DB::expr('`users`.`id`'));

			$vote_class['Site_Vote'] = '`votes`.`id`';
			$num_votes = ORM::_sql_exclude_deleted_abstract($vote_class, $num_votes);

			$user_model->select(array($num_votes,'num_votes'));
			$user_model->order_by('num_votes', 'desc');

		}
		// NUM FOLLOWERS
		else if ($orderby == 'followers')
		{

			$followers = DB::select(array(DB::expr('COUNT(*)'),'num_followers'))
				->from('followers')
				->where('subject_enttypes_id','=',$enttype_id)
				->where('subject_id','=',DB::expr('`users`.`id`'));

			$follower_class_arr['User_Follower'] = '`followers`.`id`';
			$followers = ORM::_sql_exclude_deleted_abstract($follower_class_arr, $followers);

			$user_model->select(array($followers,'num_followers'));
			$user_model->order_by('num_followers', 'desc');
		}
		else if ($orderby == 'regist_time')
		{
			$user_model->order_by('users.id', 'desc');
		}

		if (isset($searchtext))
		{
			$user_model->where(array(Db::expr('CONCAT(users.first_name," ",users.last_name)'), 'full_name'), 'like ','%'.$searchtext.'%');
		}
		$user_model->distinct(TRUE);
		$user_model->limit(50);

		$exclude_deleted_users_array['User_Base'] = 'users';
		$user_model = ORM::_sql_exclude_deleted($exclude_deleted_users_array, $user_model);
		return $user_model;
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

	public function addIdentity($uid,$provider)
	{
		if(!$this->loaded()) return false;
		$user_identity = ORM::factory('User_Identity')
			->where('provider','=',$provider)
			->and_where('users_id','=',$this->id)
			->find();

		if($user_identity->loaded())
		{
			$user_identity->identity = $uid;
			$user_identity->save();
		}
		else
		{
		//	DB::delete('user_identities')
		//		->where('provider','=',$provider)
		//		->and_where('identity','=',$uid)
		//		->execute();

			unset($user_identity);
			$user_identity = ORM::factory('User_Identity');
			$user_identity->provider = $provider;
			$user_identity->identity = $uid;
			$user_identity->users_id = $this->id;
			$user_identity->save();
		}
		return $user_identity;
	}

	public function add_from_facebook($facebook)
	{
		if($this->loaded()) return false;

		$args['firstname'] = $facebook['first_name'];
		$args['lastname'] = $facebook['last_name'];
		$args['email'] = $facebook['email'];
		$args['gender'] = $facebook['gender']=="female" ? "F" : "M";
		$args['dob'] = date('Y-m-d',strtotime($facebook['birthday']));
		$args['password'] = $args['re_password'] = Util::random_password();
		$result = $this->addRegister($args);

		/* this is a check that we can use to do something later
		if(get_class($result) == get_class($this))
		{
			// worked
		}
		else
		{
			// failed
		}
		*/
		if($this->loaded())
		{
			//TODO: get facebook city and match to our DB ID
			$this->addIdentity($facebook['id'],'facebook');
		}

		return $result;
	}

	/** Modified by Jeffrey
	 * @param $args
	 * @return user_model|ORM_Validation_Exception
	 */
	public function addTeam($args)
	{
		$resultArrary = array();
		extract($args);
		$teams_obj = ORM::factory('Sportorg_Team');
		$org_sport_link = ORM::factory('Sportorg_Orgsportlink');

		if (isset($orgs_id) && $orgs_id != "")
		{
			$org_sport_link->orgs_id = $orgs_id;
		}

		if (isset($sports_id) && $sports_id != "")
		{
			$org_sport_link->sports_id = $sports_id;
		}

		if (isset($complevels_id) && $complevels_id != "")
		{
			$teams_obj->complevels_id = $complevels_id;
		}

		if (isset($seasons_id))
		{
			if(is_array($seasons_arr))
			{
				array_push($seasons_arr,$seasons_id);
			}
			else
			{
				$seasons_arr = array($seasons_id);
			}
		}

		if (isset($year) && $year != "")
		{
			$teams_obj->year = $year;
		}

		if (isset($teams_id) && $teams_id != 0) // If team ID is provided add team
		{
			try
			{
				$user_teams_link = ORM::factory("User_Teamslink");
				$user_teams_link->users_id = $this->id;
				$user_teams_link->teams_id = $teams_id;
				$validate_array = array('users_id' => $users_id, 'teams_id' => $teams_id);
				$external_validate = Validation::factory($validate_array);
				$external_validate->rule('users_id', 'users_teams_exist', array($users_id, $teams_id));
				$user_teams_link->check($external_validate);
				$user_teams_link->save();
				return $this;
			} catch (ORM_Validation_Exception $e)
			{
				return $e;
			}
		}
		else
		{

			$result = array();

			foreach ($seasons_arr as $seasons_id)
			{
				try
				{
					//$org_sport_link->seasons_id = $seasons_id;
					$args = array('orgs_id' => $orgs_id, 'sports_id' => $sports_id);

					$combine_validate = Validation::factory($args);
					$combine_validate->rule('orgs_id', 'orgs_id_exist')
						->rule('sports_id', 'sports_id_exist');

					$org_sport_link->check($combine_validate);



					//Find Org / Sport link
					$org_sport_link = ORM::factory('Sportorg_Orgsportlink')
						->where('orgs_id', '=', $orgs_id)
						->and_where('sports_id', '=', $sports_id)
						->find();

					if (!$org_sport_link->loaded()) // This means the organization does not have this sport
					{

						unset($org_sport_link);
						//Add the Association
						$org_sport_link = ORM::factory('Sportorg_Orgsportlink');
						$org_sport_link->orgs_id = $orgs_id;
						$org_sport_link->sports_id = $sports_id;
						$org_sport_link->save();
					}

					$new_team = ORM::factory('Sportorg_Team')
						->where('org_sport_link_id', '=', $org_sport_link->id)
						->and_where('seasons_id', '=', $seasons_id)
						->and_where('complevels_id', '=', $complevels_id)
						->and_where('year', '=', $year)
						->find();

					// CHECK IF TEAM EXISTS AND CREATE IT IF IT DOESN'T
					if (!$new_team->loaded())
					{
						unset($new_team);
						$new_team = ORM::factory('Sportorg_Team');
						$new_team->org_sport_link_id = $org_sport_link->id;
						$new_team->complevels_id = $complevels_id;
						$new_team->seasons_id = $seasons_id;
						$new_team->year = $year;
						$new_team->save();
					}

					if (!$this->has('teams', $new_team)) // CHECK IF USER ALREADY HAS TEAM ASSOCIATION
					{
						$user_teams_link = ORM::factory("User_Teamslink");
						$user_teams_link->users_id = $this->id;
						$user_teams_link->teams_id = $new_team->id;
						$user_teams_link->save();
					}

					$result[] = $new_team;


				} catch (ORM_Validation_Exception $e)
				{
					return $e;
				}
			}
			if(sizeof($result) == 1) return $result[0];
			return $result;
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

		try {
			$extra_validate = Validation::factory($args);
			$extra_validate->rule('email','unique_email');
			$extra_validate->rule('password','not_empty');
			$extra_validate->rule('password','min_length', array(':value', 6));
			$extra_validate->rule('password','max_length', array(':value', 16));

			$extra_validate->rule('re_password','not_empty');
			$extra_validate->rule('re_password','min_length', array(':value', 6));
			$extra_validate->rule('re_password','max_length', array(':value', 16));
			$extra_validate->rule('re_password','matches', array(':validation', ':field', 'password'));

			$extra_validate->rule('gender', 'in_array', array(':value', array('M', 'F')));
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

	public function addComment($comment,$poster_id)
	{
		if(!$this->loaded()) return false;

		$subject_enttypes_id = Ent::getMyEntTypeID($this);

		$args = array(
			"comment" => $comment,
			"subject_enttypes_id" => $subject_enttypes_id,
			"subject_id" => $this->id,
			"users_id" => $poster_id
		);

		$comment = ORM::factory('Site_Comment');
		$comment->addComment($args);
		return $comment;

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
	 * Wrapper method for self::can() but throws an exceptiofuncn instead of bool
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

	public function delete_tests_score($args){
		$testscore_model = ORM::factory('Academics_Tests_Scores');
		$result = $testscore_model->where('users_id','=', $this->id)
			->where('academics_tests_topics_id', '=', $args['academics_tests_topics_id']);
		$classes_arr = array(
			'Academics_Tests_Scores' => 'academics_tests_scores'
		);

		$result = ORM::_sql_exclude_deleted($classes_arr, $result);
		$result = $result->find();

		if (!$result->id){
			return false;
		}else{
			$testscore_model = ORM::factory('Academics_Tests_Scores', $result->id);
			$testscore_model->delete_with_deps();
			return true;
		}
	}

	public function delete_contact(){
		$contact_model = ORM::factory('User_Contact');
		$result = $contact_model->where('users_id', '=', $this->id)->find();
		if ($result->id != ""){
			$new_contact_model = ORM::factory('User_Contact', $result->id);
			$new_contact_model->delete_with_deps();
			return true;
		}
		return false;
	}

	public function delete_position($args)
	{
		$teamlink = ORM::factory('User_Teamslink')
			->where('users_id','=',$args['users_id'])
			->where('teams_id','=',$args['teams_id'])
			->find();

		if($teamlink->loaded())
		{
			$utl_position_link = ORM::factory("User_Teamslink_Positionlink");

			$result = $utl_position_link->where('users_teams_link_id','=',$teamlink->id)
				->where('positions_id','=',$args['positions_id'])
				->find();
			if (!$result->id){
				return false;
			}else{
				$utl_position_link = ORM::factory('User_Teamslink_Positionlink', $result->id);
				$utl_position_link->delete_with_deps();
				return true;
			}
			return $position_link;
		}
		else
		{
			return false;
		}

	}

	public function delete_gpa($args){
		$gpa_model = ORM::factory('Academics_Gpa');
		$result = $gpa_model->where('users_id','=', $this->id)
			->where('year', '=', $args['year'])
			->find();

		if (!$result->id){
			return false;
		}else{
			$gpa_model = ORM::factory('Academics_Gpa', $result->id);
			$gpa_model->delete_with_deps();
			return true;
		}
	}

	function is_member_of_team($user_id, $team_id){
		//allowed enttypes
		$utl_link = ORM::factory("User_Teamslink");
		$utl_link->where('teams_id', '=', $team_id);
		$utl_link->where('users_id', '=', $user_id)->find();

		if ($utl_link->loaded()){
			return true;
		}
		return false;
	}

	function is_member_of_sport($user_id, $sport_id){
		$usl_link = ORM::factory("User_Sportlink");
		$usl_link->where('sports_id', '=', $sport_id);
		$usl_link->where('users_id', '=', $user_id)->find();

		if ($usl_link->loaded()){
			return true;
		}
		return false;
	}


}
