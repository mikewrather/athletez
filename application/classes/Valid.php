<?php defined('SYSPATH') OR die('No direct script access.');
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-3-31
 * Time: 下午9:21
 * To change this template use File | Settings | File Templates.
 */

	class Valid extends Kohana_Valid{

		//Checked exclude
		public static function utl_position_link_exist($users_teams_link_id, $positions_id){
			$utl_positoin_link = ORM::factory("User_Teamslink_Positionlink");
			$classes_arr = array(
				'User_Teamslink_Positionlink' => 'user_teamslink_positionlink'
			);
			$utl_positoin_link = ORM::_sql_exclude_deleted($classes_arr, $utl_positoin_link);

			$utl_positoin_link->where("users_teams_link_id", '=', $users_teams_link_id);
			$utl_positoin_link->where("positions_id", '=', $positions_id);
			$utl_positoin_link = $utl_positoin_link->find();
			if ($utl_positoin_link->positions_id != ""){
				return false;
			}else{
				return true;
			}
		}
		//checked exclude
		public static function academics_tests_topics_id_exist($value){
			$topics = ORM::factory("Academics_Tests_Topics");

			$classes_arr = array(
				'Academics_Tests_Topics' => 'academics_tests_topics'
			);

			$topics = ORM::_sql_exclude_deleted($classes_arr, $topics);
			$topics->where('id', '=', $value)->find();

			if ($topics->loaded()){
				return true;
			}else{
				return false;
			}
		}
		//checked exclude
		public static function user_has_contact($users_id){
			$contact = ORM::factory("User_Contact");

			$classes_arr = array(
				'User_Contact' => 'user_contact'
			);

			$contact = ORM::_sql_exclude_deleted($classes_arr, $contact);

			$contact->where('users_id', '=', $users_id)->find();

			if ($contact->loaded()){
				return true;
			}else{
				return false;
			}
		}
		//checked exclude
		public static function languages_id_exist($value){
			$languages = ORM::factory("Site_Language");
			$languages->where('id', '=', $value)->find();

			$classes_arr = array(
				'Site_Language' => 'languages'
			);

			$languages = ORM::_sql_exclude_deleted($classes_arr, $languages);

			if ($languages->loaded()){
				return true;
			}else{
				return false;
			}
		}
		//checked exclude
		public static function users_teams_exist($users_id, $teams_id){
			$user_team_link = ORM::factory("User_Teamslink");
			$classes_arr = array(
				'User_Teamslink' => 'user_teamslink'
			);

			$user_team_link = ORM::_sql_exclude_deleted($classes_arr, $user_team_link);

			$user_team_link->where('users_id', '=', $users_id)
				->and_where('teams_id', '=', $teams_id)->find();
			if ($user_team_link->users_id != ""){
				return false;
			}else{
				return true;
			}
		}
		//checked exclude
		public static function division_exist($name, $states_id){
			$division = ORM::factory('Sportorg_Division');
			$classes_arr = array(
				'Sportorg_Division' => 'sportorg_division'
			);

			$division = ORM::_sql_exclude_deleted($classes_arr, $division);
			$division->where('name', '=', $name)
				->and_where('states_id', '=', $states_id)->find();

			if (!$division->loaded())
				return true;
			else
				return false;
		}
		//checked exclude
		public static function users_sports_exist($users_id, $sports_id){
			$user_sport_link = ORM::factory("user_sportlink");
			$classes_arr = array(
				'User_Sportlink' => 'user_sport_link'
			);

			$user_sport_link = ORM::_sql_exclude_deleted($classes_arr, $user_sport_link);
			$user_sport_link->where('users_id', '=', $users_id)
				->and_where('sports_id', '=', $sports_id)->find();

			if ($user_sport_link->users_id != ""){
				return false;
			}else{
				return true;
			}
		}
		//checked exclude
		public static function roles_users_exist($user_id, $role_id){
			$roles_users = ORM::factory("RolesUsers");
			$classes_arr = array(
				'RolesUsers' => 'rolesusers'
			);

			$roles_users = ORM::_sql_exclude_deleted($classes_arr, $roles_users);
			$roles_users->where('user_id', '=', $user_id)
				->and_where('role_id', '=', $role_id)->find();

			if ($roles_users->user_id != ""){
				return false;
			}else{
				return true;
			}
		}

		public static function valid_age_frame($value){
			$current_year = intval(date('Y'));
			$dob_year = intval(date('Y', strtotime($value)));
			$config = Kohana::$config->load('sysconfig');
			if ($current_year - $dob_year >= $config->get('regist_min_age')){
				return true;
			}
			return false;
		}

		public static function not_equals($value, $null_value)
		{
			if ($value == ""){
				return false;
			}
			return ($value != $null_value);
		}

		public static function is_true_or_false($value){
			if (in_array(strtolower($value), array('true', 'false'))){
				return true;
			}else{
				return false;
			}
		}

		public static function location_type_exist($value){
			if (in_array($value, array('High School', 'Park', 'Other'))){
				return true;
			}else{
				return false;
			}
		}

		//Checked exclude
		public static function positions_id_exist($value){
			$positions = ORM::factory("Sportorg_Position");
			$classes_arr = array(
				'Sportorg_Position' => 'sportorg_position'
			);

			$positions = ORM::_sql_exclude_deleted($classes_arr, $positions);
			$positions->where('id', '=', $value)->find();

			if ($positions->loaded()){
				return true;
			}else{
				return false;
			}
		}

		public static function resume_data_type_exist($value){
			if (in_array($value, array('number', 'string', 'time'))){
				return true;
			}else{
				return false;
			}
		}
		//checked exclude
		public static function identity_exist($id){
			if ($id == ""){
				return false;
			}
			$identity = ORM::factory('User_Identity');
			$classes_arr = array(
				'User_Identity' => 'user_identity'
			);

			$identity = ORM::_sql_exclude_deleted($classes_arr, $identity);
			$identity->where('identity', '=', $id)
				->find();
			if ($identity->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function check_org_sport_id_exist($org_sport_id){
			if ($org_sport_id == ""){
				return false;
			}
			$org_sport_link_model = ORM::factory("Sportorg_Orgsportlink");
			$classes_arr = array(
				'Sportorg_Orgsportlink' => 'sportorg_orgsportlink'
			);

			$org_sport_link_model = ORM::_sql_exclude_deleted($classes_arr, $org_sport_link_model);

			$org_sport_link_model->select("id")
				->where('id', '=', $org_sport_id)
				->find();
			if ($org_sport_link_model->loaded()){
				return true;
			}
			return false;
		}
		//TODO, add by jeffrey, No other action invoke it.
		public static function match_num_unique_in_one_game($value, $games_id){
			$games_match_model = ORM::factory("Sportorg_Games_Match");

			$classes_arr = array(
				'Sportorg_Games_Match' => 'game_matches'
			);

			$games_match_model = ORM::_sql_exclude_deleted($classes_arr, $games_match_model);
			$games_match_model->select("id")
				->where('games_id', '=', $games_id)
				->and_where('match_num', '=', $value)
				->find();
			if ($games_match_model->loaded()){
				return false;
			}
			return true;
		}
		//checked exclude
		public static function complevel_name_exist($name, $complevel_profiles_id)
		{
			$complevel = ORM::factory('Sportorg_Complevel_Base');
			$classes_arr = array(
				'Sportorg_Complevel_Base' => 'sportorg_complevel_base'
			);

			$complevel = ORM::_sql_exclude_deleted($classes_arr, $complevel);
			$complevel->where('name', '=', $name)
				->and_where('complevel_profiles_id', '=', $complevel_profiles_id)->find();
			if (!$complevel->loaded())
				return true;
			else
				return false;
		}
		//checked exclude
		public static function user_sport_link_exist($users_id, $sports_id){
			$usl_model = ORM::factory("User_Sportlink");
			$classes_arr = array(
				'User_Sportlink' => 'user_sportlink'
			);

			$usl_model = ORM::_sql_exclude_deleted($classes_arr, $usl_model);
			$usl_model->select("id")
				->where('sports_id', '=', $sports_id)
				->and_where('users_id', '=', $users_id)
				->find();
			if ($usl_model->loaded()){
				return true;
			}
			return false;
		}

		//checked exclude
		public static function uslgamelink_link_not_exist($user_sport_link_id, $games_id){
			$usl_games_model = ORM::factory("User_Sportlink_Gamelink");
			$classes_arr = array(
				'User_Sportlink_Gamelink' => 'user_sportlink_gamelink'
			);

			$usl_games_model = ORM::_sql_exclude_deleted($classes_arr, $usl_games_model);
			$usl_games_model->select("id")
				->where('user_sport_link_id', '=', $user_sport_link_id)
				->and_where('games_id', '=', $games_id)
				->find();
			if (!$usl_games_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function user_score_not_exist($topic_id, $users_id){
			$test_score_model = ORM::factory("Academics_Tests_Scores");
			$classes_arr = array(
				'Academics_Tests_Scores' => 'academics_tests_scores'
			);

			$test_score_model = ORM::_sql_exclude_deleted($classes_arr, $test_score_model);
			$test_score_model->select("id")
				->where('academics_tests_topics_id', '=', $topic_id)
				->and_where('users_id', '=', $users_id)
				->find();
			if (!$test_score_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function game_match_id_exist($value){
			$games_match_model = ORM::factory("Sportorg_Games_Match");

			$classes_arr = array(
				'Sportorg_Games_Match' => 'sportorg_games_match'
			);

			$games_match_model = ORM::_sql_exclude_deleted($classes_arr, $games_match_model);
			$games_match_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($games_match_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function teams_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$team_model = ORM::factory("Sportorg_Team");

			$classes_arr = array(
				'Sportorg_Team' => 'sportorg_team'
			);

			$team_model = ORM::_sql_exclude_deleted($classes_arr, $team_model);
			$team_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($team_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function games_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$games_model = ORM::factory("Sportorg_Games_Base");

			$classes_arr = array(
				'Sportorg_Games_Base' => 'sportorg_games_base'
			);

			$games_model = ORM::_sql_exclude_deleted($classes_arr, $games_model);
			$games_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($games_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function countries_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$country_model = ORM::factory("Location_Country");

			$classes_arr = array(
				'Location_Country' => 'location_country'
			);

			$country_model = ORM::_sql_exclude_deleted($classes_arr, $country_model);
			$country_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($country_model->loaded()){
				return true;
			}
			return false;
		}
	//checked exclude
	public static function complevel_profiles_id_exist($value){
		if ($value == "" || $value == 0){
			return false;
		}
		$complevel_profile_model = ORM::factory("Sportorg_Complevel_Profile");

		$classes_arr = array(
			'Sportorg_Complevel_Profile' => 'sportorg_complevel_profile'
		);

		$complevel_profile_model = ORM::_sql_exclude_deleted($classes_arr, $complevel_profile_model);
		$complevel_profile_model->select("id")
			->where('id', '=', $value)
			->find();
		if ($complevel_profile_model->loaded()){
			return true;
		}
		return false;
	}
	//checked exclude
	public static function leagues_id_exist($value){
		if ($value == "" || $value == 0){
			return false;
		}
		$leagues_model = ORM::factory("Sportorg_League");

		$classes_arr = array(
			'Sportorg_League' => 'sportorg_league'
		);

		$leagues_model = ORM::_sql_exclude_deleted($classes_arr, $leagues_model);
		$leagues_model->select("id")
			->where('id', '=', $value)
			->find();
		if ($leagues_model->loaded()){
			return true;
		}
		return false;
	}
	/*
	 * Current no function invoke this function, comment it first
	public static function video_services_id_exist($value){
		if ($value == "" || $value == 0){
			return false;
		}
		$video_service_model = ORM::factory("Media_Videoservice");

		$classes_arr = array(
			'Media_Videoservice' => 'video_services'
		);

		$video_service_model = ORM::_sql_exclude_deleted($classes_arr, $video_service_model);
		$video_service_model->select("id")
			->where('id', '=', $value)
			->find();
		if ($video_service_model->loaded()){
			return true;
		}
		return false;
	}
	*/
	//checked exclude
	public static function divisions_id_exist($value){
		if ($value == "" || $value == 0){
			return false;
		}
		$divisions_model = ORM::factory("Sportorg_Division");

		$classes_arr = array(
			'Sportorg_Division' => 'sportorg_division'
		);

		$divisions_model = ORM::_sql_exclude_deleted($classes_arr, $divisions_model);
		$divisions_model->select("id")
			->where('id', '=', $value)
			->find();
		if ($divisions_model->loaded()){
			return true;
		}
		return false;
	}

	//checked exclude
	public static function season_profiles_id_exist($value){
		if ($value == "" || $value == 0){
			return false;
		}
		$complevel_profile_model = ORM::factory("Sportorg_Seasons_Profile");

		$classes_arr = array(
			'Sportorg_Seasons_Profile' => 'sportorg_seasons_profile'
		);

		$complevel_profile_model = ORM::_sql_exclude_deleted($classes_arr, $complevel_profile_model);
		$complevel_profile_model->select("id")
			->where('id', '=', $value)
			->find();
		if ($complevel_profile_model->loaded()){
			return true;
		}
		return false;
	}

		//checked exclude
		public static function state_entity_exist($state_name, $countries_id)
		{
			$state_model = ORM::factory('Location_State');

			$classes_arr = array(
				'Location_State' => 'location_state'
			);

			$state_model = ORM::_sql_exclude_deleted($classes_arr, $state_model);
			$state_model->where('name','=', $state_name)
				->and_where('countries_id','=', $countries_id)->find();
			if ($state_model->loaded())
				return false;
			else
				return true;
		}
		//checked exclude
		public static function states_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$states_model = ORM::factory("Location_State");

			$classes_arr = array(
				'Location_State' => 'location_state'
			);

			$states_model = ORM::_sql_exclude_deleted($classes_arr, $states_model);
			$states_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($states_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function cities_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$cities_model = ORM::factory("Location_City");

			$classes_arr = array(
				'Location_City' => 'location_city'
			);

			$cities_model = ORM::_sql_exclude_deleted($classes_arr, $cities_model);
			$cities_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($cities_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function complevels_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$complevels_model = ORM::factory("Sportorg_Complevel_Base");

			$classes_arr = array(
				'Sportorg_Complevel_Base' => 'sportorg_complevel_base'
			);

			$complevels_model = ORM::_sql_exclude_deleted($classes_arr, $complevels_model);
			$complevels_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($complevels_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function sports_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$sports_model = ORM::factory("Sportorg_Sport");

			$classes_arr = array(
				'Sportorg_Sport' => 'sportorg_sport'
			);

			$sports_model = ORM::_sql_exclude_deleted($classes_arr, $sports_model);
			$sports_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($sports_model->loaded()){
				return true;
			}
			return false;
		}

		public static function valid_time($val){
			$regex = '/^([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/';

			return (bool) preg_match($regex, $val);
		}
		//checked exclude
		public static function locations_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$location_model = ORM::factory("Location_Base");

			$classes_arr = array(
				'Location_Base' => 'location_base'
			);

			$location_model = ORM::_sql_exclude_deleted($classes_arr, $location_model);
			$location_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($location_model->loaded()){
				return true;
			}
			return false;
		}

		public static function media_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$media_model = ORM::factory("Media_Base");

			$classes_arr = array(
				'Media_Base' => 'media_base'
			);

			$media_model = ORM::_sql_exclude_deleted($classes_arr, $media_model);
			$media_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($media_model->loaded()){
				return true;
			}
			return false;
		}
		/* Not used for far, add by jeffrey
		public static function roles_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$role_model = ORM::factory("Role");

			$classes_arr = array(
				'Role' => 'roles'
			);

			$role_model = ORM::_sql_exclude_deleted($classes_arr, $role_model);
			$role_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($role_model->loaded()){
				return true;
			}
			return false;
		}
		*/
		//checked exclude
		public static function orgs_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$orgs_model = ORM::factory("Sportorg_Org");

			$classes_arr = array(
				'Sportorg_Org' => 'sportorg_org'
			);

			$orgs_model = ORM::_sql_exclude_deleted($classes_arr, $orgs_model);
			$orgs_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($orgs_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function sections_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$sections_model = ORM::factory("Sportorg_Section");

			$classes_arr = array(
				'Sportorg_Section' => 'sportorg_section'
			);

			$sections_model = ORM::_sql_exclude_deleted($classes_arr, $sections_model);
			$sections_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($sections_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function seasons_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$seasons_model = ORM::factory("Sportorg_Seasons_Base");

			$classes_arr = array(
				'Sportorg_Seasons_Base' => 'sportorg_seasons_base'
			);

			$seasons_model = ORM::_sql_exclude_deleted($classes_arr, $seasons_model);
			$seasons_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($seasons_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function stat_tab_id_exist($value){
			$stat_tab_model = ORM::factory("Stats_Tab");

			$classes_arr = array(
				'Stats_Tab' => 'stats_tab'
			);

			$stat_tab_model = ORM::_sql_exclude_deleted($classes_arr, $stat_tab_model);
			$stat_tab_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($stat_tab_model->loaded()){
				return true;
			}
			return false;
		}

		/**
		 * first param param is :validation, second param is enttype_id,third param is subject_id
		 * @param $validate_element
		 * @param $enttype
		 * @param $subject
		 * @return bool
		 * @author Jeffrey
		 */
		public static function subject_id_exist($validate_element, $enttype, $subject)
		{
			$data = $validate_element->data();
			$enttype_id = $data[$enttype];
			$subject_id = $data[$subject];
			$enttypes_obj = Ent::eFact($enttype_id,$subject_id);
			if($enttypes_obj->loaded()){
				return true;
			}
			return false;
		}
		/*
		 * Invalid now, b/c the column no longer in the table
		public static function resume_data_profiles_id_exist($value){
			$resume_data_profiles = ORM::factory("User_Resume_Data_Profile");

			$classes_arr = array(
				'User_Resume_Data_Profile' => 'resume_data_profiles'
			);

			$resume_data_profiles = ORM::_sql_exclude_deleted($classes_arr, $resume_data_profiles);
			$resume_data_profiles->select("id")
				->where('id', '=', $value)
				->find();
			if ($resume_data_profiles->loaded()){
				return true;
			}
			return false;
		}
		*/
		//checked exclude
		public static function resume_data_id_exist($value){
			$resume_data = ORM::factory("User_Resume_Data");

			$classes_arr = array(
				'User_Resume_Data' => 'user_resume_data'
			);

			$resume_data = ORM::_sql_exclude_deleted($classes_arr, $resume_data);
			$resume_data->select("id")
				->where('id', '=', $value)
				->find();
			if ($resume_data->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function sport_type_id_exist($value){
			$sport_types_model = ORM::factory("Sportorg_Sporttype");

			$classes_arr = array(
				'Sportorg_Sporttype' => 'sportorg_sporttype'
			);

			$sport_types_model = ORM::_sql_exclude_deleted($classes_arr, $sport_types_model);
			$sport_types_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($sport_types_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function stat_contexts_id_exist($value){
			$stat_contexts = ORM::factory("Stats_Context");
			$classes_arr = array(
				'Stats_Context' => 'stats_context'
			);

			$stat_contexts = ORM::_sql_exclude_deleted($classes_arr, $stat_contexts);

			$stat_contexts->select("id")
				->where('id', '=', $value)
				->find();
			if ($stat_contexts->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function stat_id_exist($value){
			$stat = ORM::factory("Stats_Base");

			$classes_arr = array(
				'Stats_Base' => 'stats_base'
			);

			$stat = ORM::_sql_exclude_deleted($classes_arr, $stat);
			$stat->select("id")
				->where('id', '=', $value)
				->find();
			if ($stat->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function resume_data_groups_id_exist($value){
			$resume_data_grp = ORM::factory("User_Resume_Data_Group");

			$classes_arr = array(
				'User_Resume_Data_Group' => 'user_resume_data_group'
			);

			$resume_data_grp = ORM::_sql_exclude_deleted($classes_arr, $resume_data_grp);
			$resume_data_grp->select("id")
				->where('id', '=', $value)
				->find();
			if ($resume_data_grp->loaded()){
				return true;
			}
			return false;
		}

		/**
		 * date format must like "2013-04-05 12:12:12"
		 * @param $value
		 * @return bool
		 * @author Jeffrey
		 */
		public static function correct_date_format($value){
			$value = date("Y-m-d H:i:s",strtotime($value));
			if ($value === false) {
				return false;
			}

			if (substr($value,0,10) == '1969-12-31' || substr($value,0,10) == '0000-00-00') {
				return false;
			}

			$year = substr($value,0, 4);
			$month = substr($value,5, 2);
			$day = substr($value,8, 2);
			if (!checkdate($month, $day, $year)){
				return false;
			}
			$reg= "/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/";
			$return = preg_match($reg, $value);
			if ($return == 0){
				return false;
			}else{
				return true;
			}
		}
		//checked exclude
		public static function users_id_exist($value){
			$user_model = ORM::factory("User_Base");

			$classes_arr = array(
				'User_Base' => 'user_base'
			);

			$user_model = ORM::_sql_exclude_deleted($classes_arr, $user_model);
			$user_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($user_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function coaches_id_exist($value){
			$coaches_data = ORM::factory("College_Coach");

			$classes_arr = array(
				'College_Coach' => 'college_coach'
			);

			$coaches_data = ORM::_sql_exclude_deleted($classes_arr, $coaches_data);
			$coaches_data->select("id")
				->where('id', '=', $value)
				->find();
			if ($coaches_data->loaded()){
				return true;
			}
			return false;
		}
		//it don't need to do exclude sql
		public static function unique_email($value){
			$user_model = ORM::factory("User_Base");
			$user_model->select("id")
				->where('email', '=', $value)
				->find();
			if (!$user_model->loaded()){
				return true;
			}
			return false;
		}
		//checked exclude
		public static function gamesteams_combine_primary_key_exist($teams_id, $games_id){
			$exists_obj = DB::select('*')
				->from("games_teams_link")
				->where('teams_id', '=', $teams_id)
				->and_where('games_id', '=', $games_id);

			$classes_arr = array(
				'Sportorg_Games_Teamslink' => 'games_teams_link'
			);

			$exists_obj = ORM::_sql_exclude_deleted($classes_arr, $exists_obj);
			$count = count($exists_obj->execute()->as_array());
			if ($count == 0)
				return true;
			else
				return false;
		}

		public static function unique_username(){
			//TODO, add by jeffrey
			return true;
		}
		//checked exclude
		public static function checkCountyExists($county)
		{
			$county_model = ORM::factory('Location_County',$county);

			$classes_arr = array(
				'Location_County' => 'location_county'
			);

			$county_model = ORM::_sql_exclude_deleted($classes_arr, $county_model);
			if($county_model->loaded()) return true;
			return false;
		}
	}