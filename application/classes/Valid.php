<?php defined('SYSPATH') OR die('No direct script access.');
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-3-31
 * Time: 下午9:21
 * To change this template use File | Settings | File Templates.
 */

	class Valid extends Kohana_Valid{
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

		public static function identity_exist($id){
			if ($id == ""){
				return false;
			}
			$identity = DB::select('*')
				->from('user_identities')
				->where('identity','=', $id)
				->execute()->as_array();
			if (count($identity) > 0){
				return true;
			}
			return false;
		}

		public static function check_org_sport_id_exist($org_sport_id){
			if ($org_sport_id == ""){
				return false;
			}
			$org_sport_link_model = ORM::factory("Sportorg_Orgsportlink");
			$org_sport_link_model->select("id")
				->where('id', '=', $org_sport_id)
				->find();
			if ($org_sport_link_model->loaded()){
				return true;
			}
			return false;
		}

		public static function match_num_unique_in_one_game($value, $games_id){
			$games_match_model = ORM::factory("Sportorg_Games_Match");
			$games_match_model->select("id")
				->where('games_id', '=', $games_id)
				->and_where('match_num', '=', $value)
				->find();
			if ($games_match_model->loaded()){
				return false;
			}
			return true;
		}

		public static function fitness_datavalue_exist($fitness_data_id, $users_id){

			$games_match_model = ORM::factory("User_Fitness_Dataval");
			$games_match_model->select("id")
				->where('fitness_data_id', '=', $fitness_data_id)
				->and_where('users_id', '=', $users_id)
				->find();
			if ($games_match_model->loaded()){
				//$return_pk = $games_match_model->id;
				return true;
			}
			return false;
		}

		public static function game_match_id_exist($value){
			$games_match_model = ORM::factory("Sportorg_Games_Match");
			$games_match_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($games_match_model->loaded()){
				return true;
			}
			return false;
		}

		public static function teams_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$team_model = ORM::factory("Sportorg_Team");
			$team_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($team_model->loaded()){
				return true;
			}
			return false;
		}

		public static function countries_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$states_model = ORM::factory("Location_Country");
			$states_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($states_model->loaded()){
				return true;
			}
			return false;
		}

	public static function complevel_profiles_id_exist($value){
		if ($value == "" || $value == 0){
			return false;
		}
		$complevel_profile_model = ORM::factory("Sportorg_Complevel_Profile");
		$complevel_profile_model->select("id")
			->where('id', '=', $value)
			->find();
		if ($complevel_profile_model->loaded()){
			return true;
		}
		return false;
	}


		public static function state_entity_exist($state_name, $countries_id)
		{
			$exists_obj = ORM::factory('Location_State')
				->where('name','=', $state_name)
				->and_where('countries_id','=', $countries_id)->find();
			if ($exists_obj->loaded())
				return false;
			else
				return true;
		}

		public static function states_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$states_model = ORM::factory("Location_State");
			$states_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($states_model->loaded()){
				return true;
			}
			return false;
		}

		public static function city_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$cities_model = ORM::factory("Location_City");
			$cities_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($cities_model->loaded()){
				return true;
			}
			return false;
		}

		public static function complevels_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$complevels_model = ORM::factory("Sportorg_Complevel_Base");
			$complevels_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($complevels_model->loaded()){
				return true;
			}
			return false;
		}

		public static function sports_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$sports_model = ORM::factory("Sportorg_Sport");
			$sports_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($sports_model->loaded()){
				return true;
			}
			return false;
		}

		public static function roles_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$role_model = ORM::factory("Role");
			$role_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($role_model->loaded()){
				return true;
			}
			return false;
		}

		public static function orgs_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$orgs_model = ORM::factory("Sportorg_Org");
			$orgs_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($orgs_model->loaded()){
				return true;
			}
			return false;
		}

		public static function sections_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$sections_model = ORM::factory("Sportorg_Section");
			$sections_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($sections_model->loaded()){
				return true;
			}
			return false;
		}

		public static function seasons_id_exist($value){
			if ($value == "" || $value == 0){
				return false;
			}
			$seasons_model = ORM::factory("Sportorg_Seasons_Base");
			$seasons_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($seasons_model->loaded()){
				return true;
			}
			return false;
		}

		public static function stat_tab_id_exist($value){
			$stat_tab_model = ORM::factory("Stats_Tab");
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

		public static function resume_data_profiles_id_exist($value){
			$resume_data_profiles = ORM::factory("User_Resume_Data_Profile");
			$resume_data_profiles->select("id")
				->where('id', '=', $value)
				->find();
			if ($resume_data_profiles->loaded()){
				return true;
			}
			return false;
		}

		public static function resume_data_id_exist($value){
			$resume_data = ORM::factory("User_Resume_Data");
			$resume_data->select("id")
				->where('id', '=', $value)
				->find();
			if ($resume_data->loaded()){
				return true;
			}
			return false;
		}

		public static function sport_type_id_exist($value){
			$sport_types_model = ORM::factory("Sportorg_Sporttype");
			$sport_types_model->select("id")
				->where('id', '=', $value)
				->find();
			if ($sport_types_model->loaded()){
				return true;
			}
			return false;
		}

		public static function fitness_data_values_id_exist($value){
			$fitness_data_values = ORM::factory("User_Fitness_Dataval");
			$fitness_data_values->select("id")
				->where('id', '=', $value)
				->find();
			if ($fitness_data_values->loaded()){
				return true;
			}
			return false;
		}

		public static function stat_contexts_id_exist($value){
			$stat_contexts = ORM::factory("Stats_Context");
			$stat_contexts->select("id")
				->where('id', '=', $value)
				->find();
			if ($stat_contexts->loaded()){
				return true;
			}
			return false;
		}

		public static function stat_id_exist($value){
			$stat = ORM::factory("Stats_Base");
			$stat->select("id")
				->where('id', '=', $value)
				->find();
			if ($stat->loaded()){
				return true;
			}
			return false;
		}

		public static function resume_data_groups_id_exist($value){
			$resume_data_grp = ORM::factory("User_Resume_Data_Group");
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

			$reg="^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$";
			$return = preg_match($reg, $value);
			if ($return == 0){
				return false;
			}else{
				return true;
			}
		}

		public static function users_id_exist($value){
			$resume_data = ORM::factory("User_Base");
			$resume_data->select("id")
				->where('id', '=', $value)
				->find();
			if ($resume_data->loaded()){
				return true;
			}
			return false;
		}

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

		public static function unique_username(){
			//TODO, add by jeffrey
			return true;
		}

		public static function checkCountyExists($county)
		{
			$c = ORM::factory('Location_County',$county);
			if($c->loaded())return true;
			return false;
		}
	}