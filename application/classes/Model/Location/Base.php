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
			'all_info'=>array(
				array('not_empty'),
			),
			// address (varchar)
			'address'=>array(
				array('not_empty'),
			),

			// cities_id (int)
			'cities_id'=>array(
				array('digit'),
				array('cities_id_exist')
			),

			// zip (varchar)
//			'zip'=>array(
//				array('not_empty'),
//			),

			// lon (float)
			'lon'=>array(
				array('numeric'),
			),

			// lat (float)
			'lat'=>array(
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

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'cities_obj' => 'city',
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function getBasics($settings = array())
	{
//		return array(
//			"id" => $this->id,
//			"address" => $this->address,
//			"city" => $this->city->getBasics(),
//			"cities_id" => $this->cities_id,
//			"lon" => $this->lon,
//			"lat" => $this->lat,
//			"location_type" => $this->location_type,
//			"loc_point" => $this->loc_point
//			// put point here
//		);
		return parent::getBasics($settings);
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

	public function google_verify($address){
		$final = array();

		$address = urlencode($address);

		$json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false");
		$json = get_object_vars(json_decode($json));


		if($json['status']=='ZERO_RESULTS'){
			return false;
		}

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
		return $final;
	}
	
	public function name()
	{
		return $this->address;
	}
	
	public function addLocation($args = array())
	{
		extract($args);
		if(isset($address))
		{
			if($g_results = $this->google_verify($address))
			{
				$match = ORM::factory('Location_Base')
					->where('lat','=',$g_results['lat'])
					->and_where('lon','=',$g_results['lon'])
					->find();

			//	print_r($match);

				if($match->loaded()) return $match;

				$this->address = $g_results['number']." ".$g_results['street'].", ".$g_results['city']." ".$g_results['state'].", ".$g_results['zip'];
				$this->full_address = $g_results['full_address'];
				$this->lat = $g_results['lat'];
				$this->lon = $g_results['lon'];
				$this->zip = substr($g_results['zip'],0,5);

				$this->loc_point = DB::expr("GeomFromText('POINT(".$g_results['lat']." ".$g_results['lon'].")')");
				$this->all_info = serialize($g_results);

				//get city
				$city = ORM::factory('Location_City')
					->join('states')->on('location_city.states_id','=','states.id')
					->where('location_city.name','=',$g_results['city'])
					->and_where('states.name','=',$g_results['state'])
					->find();

				if($city->loaded()){
					$this->cities_id = $city->id;
					$this->states_id = $city->states_id;
				}
			}
		}
		else
		{
			if(isset($cities_id))
			{
				$this->cities_id = $cities_id;
			}

			if(isset($lon))
			{
				$this->lon = $lon;
			}
			else $lon = 0;

			if(isset($lat))
			{
				$this->lat = $lat;
			}
			else $lat = 0;

			if(isset($loc_point))
			{
				$this->loc_point = $loc_point;
			}

			if(isset($zip))
			{
				$this->zip = $zip;
			}
			$this->loc_point = DB::expr("GeomFromText('POINT(".$lat." ".$lon.")')");
		}

		
		if(isset($location_type))
		{
			$this->location_type = $location_type;
		}
		else
		{
			$this->location_type = "Other";
		}

		         
		try{		 
//			$db = Database::instance();
//
//			$result = $db->query(Database::INSERT, "insert into locations (address, cities_id, lon, lat, loc_point, location_type, zip)
//				values('".$address."',".$cities_id.", ".$lon.", ".$lat.", Point(".$lat.", ".$lon."), '".$location_type."', ".$zip.") ");
//
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
			$classes_arr['Sportorg_Games_Teamslink'] = 'games_teams_link';
		}
		if (isset($sports_id) || isset($complevels_id)){
			$games_model->join('teams')->on('games_teams_link.teams_id', '=', 'teams.id');
			$games_model->join('org_sport_link')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
			$classes_arr['Sportorg_Team'] = 'teams';
			$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';
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
		//exclude itself
		$classes_arr['Sportorg_Games_Base'] = 'sportorg_games_base';
		$games_model = ORM::_sql_exclude_deleted($classes_arr, $games_model);
		$games_model->limit($limit);
		return $games_model;
	}

	public function search($args)
	{
		extract($args);

		$loc_search = DB::select('id',array('full_address','name'),array(DB::expr('"locations_id"'),'result_type'),array(DB::expr('"Location_Base"'),'class'))->from('locations')->limit(3);
		$city_search = DB::select('cities.id',array(DB::expr("CONCAT(`cities`.`name`,', ',`states`.`name`)"),'name'),array(DB::expr('"cities_id"'),'result_type'),array(DB::expr('"Location_City"'),'class'))
			->from('cities')
			->join('states','LEFT')
				->on('cities.states_id','=','states.id')
			->limit(6);
		$state_search = DB::select('id','name',array(DB::expr('"states_id"'),'result_type'),array(DB::expr('"Location_State"'),'class'))->from('states');

		if(isset($search_text))
		{
			$loc_search->where('full_address','LIKE',"$search_text%");
			$loc_search->where('address','LIKE',"$search_text%");
			$city_search->where('cities.name','LIKE',"$search_text%")
				->or_where(DB::expr("CONCAT(`cities`.`name`,', ',`states`.`name`)"),'LIKE',"$search_text%");
			$state_search->where('states.name','LIKE',"$search_text%");
		}

		$final = DB::select()->from(array($loc_search->union($city_search,TRUE)->union($state_search,TRUE),'final'))->limit(10);
		return $final;

	}
	
}