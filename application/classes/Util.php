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
		// male/female
		if (in_array($value, array('f', 'm'))){
			if ($value == 'm'){
				return 1;
			}else{
				return 0;
			}
		}
		//yes/no
		if (in_array($value, array('y', 'n'))){
			if ($value == 'y'){
				return 1;
			}else{
				return 0;
			}
		}

		if (in_array($value, array('0', '1'))){
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

	public static function obj_arr_toggle($value) {
		if (is_object($value)) {
			// Gets the properties of the given object
			// with get_object_vars function
			$value = get_object_vars($value);
		}

		if (is_array($value)) {
			$replica = new stdClass();
			foreach($value as $key => $val)
			{
				$replica->$key = is_array($val) ? Util::obj_arr_toggle($val) : $val;
			}
			return $replica;
		}
		else {
			// Return array
			return $value;
		}
	}

	public static function strip_array_keys(&$arr,$is_recursive=false)
	{
		if(!is_array($arr)) return false;
		$arr = array_values($arr);

		if($is_recursive)
		{
			foreach($arr as &$item)
			{
				if($result = self::strip_array_keys($item))
				{
					$item = $result;
				}
			}
		}

		return $arr;

	}

	public static function random_password($length=16)
	{
		return Text::random('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`~@#%^&*()-_=+[]{}\|;:\'",.<>/?',$length);
	}

	public static function get_bucket_name($url)
	{
		if(strstr($url,'s3://'))
		{
			$url = substr($url,5);
			$urlarr = explode("/",$url);
			return $urlarr[0];
		}
		elseif(strstr($url,'s3.amazonaws.com'))
		{
			if(strstr($url,'://s3.amazonaws.com/'))
			{
				$urlarr1 = explode('://s3.amazonaws.com/',$url);
				$urlarr2 = explode('/',$urlarr1[1]);
				return $urlarr2[0];
			}
			else
			{
				$urlarr1 = explode('://',$url);
				$urlarr2 = explode('.',$urlarr1[1]);
				return $urlarr2[0];
			}
		}
		return false;
	}

	public static function get_cdn($url,$streaming=false)
	{
		if(strstr($url,'s3://'))
		{
			$url = substr($url,5);
			$urlarr = explode("/",$url);
			$bucket = $urlarr[0];
			$remainder = substr($url,strlen($urlarr[0]));
		}
		elseif(strstr($url,'s3.amazonaws.com'))
		{
			if(strstr($url,'://s3.amazonaws.com/'))
			{
				$urlarr1 = explode('://s3.amazonaws.com/',$url);
				$remainder = $urlarr1[1];
				$urlarr2 = explode('/',$urlarr1[1]);
				$bucket = $urlarr2[0];
			}
			else
			{
				$urlarr1 = explode('://',$url);
				$urlarr2 = explode('.',$urlarr1[1]);
				$bucket = $urlarr2[0];
				$remainder = substr($urlarr1[1],strlen($bucket.".s3.amazonaws.com"));
			}
		}
		else
		{
			return;
		}

		$cdntype = $streaming ? "streaming" : "download";
		$cdn = Kohana::$config->load('cdn');
		foreach($cdn[$bucket] as $type)
		{
			if($type['type']==$cdntype){ return "http://".$type['domain'].$remainder; }
		}
		return false;
	}
}