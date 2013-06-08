<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 6/5/13
 * Time: 1:00 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Test extends Controller_Template
{

	public function action_index()
	{
		set_time_limit(0);
		ini_set('max_execution_time', 3600*12);

	//	ini_set('max_input_time', 1800);
		@ini_set('track_errors', 1);

		$this->action_sportsdata_schools();
		$this->action_orig_schools();
		$this->action_scraped_schools();
	}

	public function action_sportsdata_schools()
	{
		set_time_limit(0);
		ini_set('max_execution_time', 3600*12);

		//	ini_set('max_input_time', 1800);
		@ini_set('track_errors', 1);

		$qry = DB::select()
			->from('sportsdata.schools')
			->where('google_address','=','')
			->or_where('google_address','IS','NULL')
		//	->limit(25000)->offset(3418)
			->execute();

		foreach($qry as $row)
		{
			print_r($row);
			$this->geo($row,0);
		}
	}

	public function action_orig_schools()
	{
		set_time_limit(0);
		ini_set('max_execution_time', 3600*12);

		//	ini_set('max_input_time', 1800);
		@ini_set('track_errors', 1);

		$qry = DB::select()
			->from('sportsdata.schools_orig')
			->where('google_address','=','')
			->or_where('google_address','IS','NULL')
		//	->limit(10)->offset(0)
			->execute();

		foreach($qry as $row)
		{
			print_r($row);
			$this->geo($row,0,'sportsdata.schools_orig');
		}
	}

	public function action_scraped_schools()
	{
		set_time_limit(0);
		ini_set('max_execution_time', 3600*12);

		//	ini_set('max_input_time', 1800);
		@ini_set('track_errors', 1);

		$qry = DB::select()
			->from('schools.schools')
			->where('google_address','=','')
			->or_where('google_address','IS','NULL')
		//	->limit(100)->offset(0)
			->execute();

		foreach($qry as $row)
		{
			print_r($row);
			$this->geo($row,0,'schools.schools');
		}
	}

	protected function geo($arr,$attempt,$table="sportsdata.schools")
	{
		if($attempt==0 && isset($arr["county"])) $address = $arr["name"].", ".$arr['county'].", ".$arr['city'].", ".$arr["state"];
		elseif($attempt==0) $address = $arr["name"].", ".$arr['city'].", ".$arr["state"];
		elseif($attempt==1 && isset($arr["address"])) $address = $arr["name"].", ".$arr['address'];
		elseif($attempt>1 && isset($arr['address'])) $address = $arr['address'];

		$address = urlencode($address);

		$json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false");
		$json = get_object_vars(json_decode($json));


		if(empty($json["results"])) return false;

		//print_r($json);

		foreach($json["results"] as $key=>$res)
		{
			if(is_object($res)) $res = get_object_vars($res);

			// Get full address, longitude and latitude
			$final['full_address'] = $res['formatted_address'];
			$final['lon'] = $res['geometry']->location->lng;
			$final['lat'] = $res['geometry']->location->lat;

			// Parse Address components and assign to correct array keys
			foreach($res['address_components'] as $subkey=>$comp)
			{
				if(is_object($comp)) $comp = get_object_vars($comp);

				foreach($comp['types'] as $ckey=>$cval)
				{
					switch ($cval)
					{
						case "street_number":
							$final['number'] = $comp['long_name'];
							break;
						case "route":
							$final['street'] = $comp['long_name'];
							break;
						case "country":
							$final['country'] = $comp['long_name'];
							break;
						case "postal_code":
							$final['zip'] = $comp['long_name'];
							break;
						case "locality":
							$final['city'] = $comp['long_name'];
							break;
						case "neighborhood":
							$final['neighborhood'] = $comp['long_name'];
							break;
						case "administrative_area_level_1":
							$final['state'] = $comp['long_name'];
							break;
						case "administrative_area_level_2":
							$final['county'] = $comp['long_name'];
							break;
						case "colloquial_area":
							$final['colloquial_area'] = $comp['long_name'];
							break;
						case "park":
							$final['park'] = $comp['long_name'];
							break;
						case "intersection":
							$final['intersection'] = $comp['long_name'];
							break;
						default:
							break;
					}
				}
			}
		}
		print_r($final);
		if(isset($final['number']))
		{
			if($table=='sportsdata.schools')
			{
				DB::update($table)
					->set(array('google_address'=>$final['full_address']))
					->where('mp_school_id','=',$arr['mp_school_id'])
					->execute();
			}
			elseif($table=='sportsdata.schools_orig')
			{
				DB::update($table)
					->set(array('google_address'=>$final['full_address']))
					->where('id','=',$arr['id'])
					->execute();
			}
			elseif($table=='schools.schools')
			{
				DB::update($table)
					->set(array('google_address'=>$final['full_address']))
					->where('school_id','=',$arr['school_id'])
					->and_where('source','=',$arr['source'])
					->execute();
			}

		}
		elseif($attempt<=2)
		{
			$attempt++;
			$this->geo($arr,$attempt);
		}


	}

	public function action_make_games()
	{

	}
	
}