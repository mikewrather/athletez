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