<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:46 PM
 */

class Model_Location_Base extends ORM
{
	
	protected $_table_name = 'locations';
	public $error_message_path = "models/location";

	protected $_belongs_to = array(
		'city' => array(
			'model' => 'Location_City',
			'foreign_key' => 'cities_id'
		)
	);

	protected $_has_many = array(
		'games' => array(
			'model' => 'Sportorg_Games_Base',
			'foreign_key' => 'locations_id'
		),
		'orgs' => array(
			'model' => 'Sportorg_Org',
			'foreign_key' => 'locations_id'
		)
	);

	public function rules(){

		return array
		(
			// address (varchar)
			'address'=>array(
				array('not_empty'),
			),

			// cities_id (int)
			'cities_id'=>array(
				array('not_empty'),
				array('digit'),
				array('cities_id_exist')
			),

			// zip (varchar)
//			'zip'=>array(
//				array('not_empty'),
//			),

			// lon (float)
			'lon'=>array(
				array('not_empty'),
				array('numeric'),
			),

			// lat (float)
			'lat'=>array(
				array('not_empty'),
				array('numeric'),
			),

			// loc_point (point), Comment by jeffrey, no this field in page, ignore
			/*
			'loc_point'=>array(
				array('not_empty'),
			),
			*/
			'location_type'=>array(
				array('not_empty'),
				array('location_type_exist')
			),
		);
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"address" => $this->address,
			"city" => $this->city->getBasics(),
			"cities_id" => $this->cities_id,
			"lon" => $this->lon,
			"lat" => $this->lat,
			"location_type" => $this->location_type,
			"loc_point" => $this->loc_point
			// put point here
		);
	}
	
	public function updateLocation($args = array())
	{
		extract($args);
		
		// address 
		// Change the address of this location

		if ( isset($id) )
		{
			$this->id = $id;
		}

		if ( isset($address) )
		{
			$this->address = $address;
		}
		
		// cities_id
		// Change the city of the location
		if ( isset($cities_id) )
		{
			$this->cities_id = $cities_id;
		}
		
		// lon 
		// Change the longitude of this location
		if ( isset($lon) )
		{
			$this->lon = $lon;
		}
		// lat 
		// Change the latitude of this location
		if ( isset($lat) )
		{
			$this->lat = $lat;
		}
		
		// location_type
		// Change the location type of this location
		if ( isset($location_type) )
		{
			$this->location_type = $location_type;
		}

		try{
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}
	
	public function name()
	{
		return $this->address;
	}
	
	public function addLocation($args = array())
	{
		//TODO: This shit should all be moved to a validation method.  Also, we want to store the formatted results from google, not the user's info.
		$address = urlencode($args['address']);

		$json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false");
		$json = json_decode($json);

		if($json->{status} == 'OK')
		{

			$json = get_object_vars($json);
			foreach($json["results"] as $key=>$res)
			{
				if(is_object($res)) $res = get_object_vars($res);

				// Get full address, longitude and latitude
				$args['full_address'] = $res['formatted_address'];
				$args['lon'] = $res['geometry']->location->lng;
				$args['lat'] = $res['geometry']->location->lat;

				// Parse Address components and assign to correct array keys
				foreach($res['address_components'] as $subkey=>$comp)
				{
					if(is_object($comp)) $comp = get_object_vars($comp);

					foreach($comp['types'] as $ckey=>$cval)
					{
						switch ($cval)
						{
							case "street_number":
								$args['number'] = $comp['long_name'];
								break;
							case "route":
								$args['street'] = $comp['long_name'];
								break;
							case "country":
								$args['country'] = $comp['long_name'];
								break;
							case "postal_code":
								$args['zip'] = $comp['long_name'];
								break;
							case "locality":
								$args['city'] = $comp['long_name'];
								break;
							case "neighborhood":
								$args['neighborhood'] = $comp['long_name'];
								break;
							case "administrative_area_level_1":
								$args['state'] = $comp['long_name'];
								break;
							case "administrative_area_level_2":
								$args['county'] = $comp['long_name'];
								break;
							case "colloquial_area":
								$args['colloquial_area'] = $comp['long_name'];
								break;
							case "park":
								$args['park'] = $comp['long_name'];
								break;
							case "intersection":
								$args['intersection'] = $comp['long_name'];
								break;
							default:
								break;
						}
					}
				}

				foreach($res['types'] as $type)
				{

				}
			}
		}
		else
		{
			throw new Kohana_Exception("That address could not be verified");
		}

		print_r($args);

		extract($args);

		if(isset($number) && isset($street))
		{
			$this->address = $number." ".$street;
		}

		if(isset($full_address))
		{
			$this->full_address = $full_address;
		}

		$city = ORM::factory('Location_City');
		$city_res = $city->getCityIDFromName($args);

		if(is_array($city_res))
		{
			$this->cities_id = $city_res['cities_id'];
		}

		if(isset($lon))
		{
			$this->lon = $lon;
		}
		
		if(isset($lat))
		{
			$this->lat = $lat;
		}

		if(isset($zip))
		{
			$this->zip = $zip;
		}
		
		if(isset($location_type))
		{
			$this->location_type = $location_type;
		}
		else
		{
			$this->location_type = 'Other';
		}

		$this->loc_point = DB::expr("(POINTFROMTEXT('POINT($lat $lon)'))");
		         
		try{
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
        	return $e;
		} 	
	}

	public function getGames($args = array()){
		extract($args);
		$games_model = $this->games;
		if (isset($games_before)){
			$games_model->where(DB::expr("concat( gameDay , ' ',  gameTime')"), '<', $games_before);
		}
		if (isset($games_after)){
			$games_model->where(DB::expr("concat('gameDay', ' ', 'gameTime')"), '>', $games_after);
		}
		if (isset($sports_id) || isset($complevels_id) || isset($teams_id)){
			$games_model->join('games_teams_link')->on('games_teams_link.games_id', '=', 'sportorg_games_base.id');
		}
		if (isset($sports_id) || isset($complevels_id)){
			$games_model->join('teams')->on('games_teams_link.teams_id', '=', 'teams.id');
			$games_model->join('org_sport_link')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
		}
		if (isset($sports_id)){
			$games_model->where('org_sport_link.sports_id', '=', $sports_id);
		}
		if (isset($complevels_id)){
			$games_model->where('teams.complevels_id', '=', $complevels_id);
		}
		if (isset($teams_id)){
			$games_model->where('games_teams_link.teams_id', '=', $teams_id);
		}
		if (!isset($limit)){
			$e = Kohana::$config->load('sysconfig');
			$display_qty = $e->get('defaultGamesToDisplay');
			$limit = $display_qty;
		}
		$games_model->limit($limit);
		return $games_model;
	}

	public function gmapsParse($address)
	{
		$final = array();

		$address = urlencode($address);

		$json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false");
		$json = get_object_vars(json_decode($json));


		if(empty($json["results"])) return false;

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

	//order by distance
	//SELECT id, lon,lat, ( 3959 * acos( cos( radians(39) ) * cos( radians( lat ) ) * cos( radians( lon ) - radians(-73) ) + sin( radians(39) ) * sin( radians( lat ) ) ) ) AS distance FROM locations;

}