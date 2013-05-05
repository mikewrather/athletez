<?php defined('SYSPATH') OR die('No direct script access.');

class Util {

	public static function contert_to_boolean($value){
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

		if (in_array($value, array(0, 1))){
			return $value;
		}
		//Can't convert to boolean
		return null;
	}
}