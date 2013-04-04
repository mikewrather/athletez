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
	}