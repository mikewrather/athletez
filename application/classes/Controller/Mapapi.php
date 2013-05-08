<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Date: 5/8/13
 * Time: 12:02 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Mapapi extends Controller
{

	public function action_index()
	{
		$final = array();

		$address = urlencode("Crossroads School, Santa Monica");

		$json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false");
		$json = get_object_vars(json_decode($json));

		print_r($json);

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
	}
}