<?php defined('SYSPATH') OR die('No direct script access.');

class Util {

	public static function convert_to_boolean($value){
		$value = strtolower(trim($value));
		if ($value == ""){
			return null;
		}

		if (in_array($value, array('on', 'off'))){
			if ($value == 'on'){
				return 1;
			}else{
				return 0;
			}
		}

		if (in_array($value, array('true', 'false'))){
			if ($value == 'true'){
				return 1;
			}else{
				return 0;
			}
		}

		if (in_array($value, array('f', 'm'))){
			if ($value == 'm'){
				return 1;
			}else{
				return 0;
			}
		}

		if (in_array($value, array(0, 1))){
			return $value;
		}
		//Can't convert to boolean
		return null;
	}

	public static function format_date($day){
		return date("F j, Y", strtotime($day));
	}

	public static function format_time($time){
		return date("g:i A", strtotime($time));
	}
}