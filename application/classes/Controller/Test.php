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

		ini_set('upload_max_filesize', '500M');
		ini_set('post_max_size', '500M');
		ini_set('max_execution_time', 3800);

		ini_set('max_input_time', 1800);
		@ini_set('track_errors', 1);

		$qry = DB::select()
			->from('sportsdata.schools')
			->limit(2100)->offset(2100)
			->execute();

		foreach($qry as $row)
		{
			print_r($row);
			$this->geo($row);
		}
	}

	protected function geo($arr)
	{
		$address = $arr["name"].", ".$arr['address'];

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
			DB::update('sportsdata.schools')
				->set(array('google_address'=>$final['full_address']))
				->where('mp_school_id','=',$arr['mp_school_id'])
				->execute();
		}

	}
	
}