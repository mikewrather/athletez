<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:46 PM
 */

class Model_Location_Base extends ORM
{
	
	protected $_table_name = 'locations';
	

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
		)
	);


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

	public function name()
	{
		return $this->address;
	}
	
	public function addLocation($args = array())
	{
		extract($args);
		$result = array();
		
		if(isset($address))
		{
			$this->address = $address;
		}
		
		if(isset($cities_id))
		{
			$this->cities_id = $cities_id;
		}
		$blMsg = false;
		$error = array();
		if ( empty($address) || empty($cities_id) )
		{
			$blMsg = true;
			$error_array = array(
				"error" => "You should input the adress or city",
				"desc" => "You should input the adress or city",
			);
			$result['error_array'] = $error_array;			
		}

		if(isset($lon))
		{
			$this->lon = $lon;
		}
		
		if(isset($lat))
		{
			$this->lat = $lat;
		}
		
		if ( empty($lon) || empty($lat) )
		{
			$blMsg = true;
			$error_array = array(
				"error" => "You should input the longitude or latitude",
				"desc" => "You should input the longitude or latitude"	);
			
			$result['error_array'] = $error_array;
		}
		
		if(isset($loc_point))
		{
			$this->loc_point = $loc_point;
		}
		
		if(isset($location_type))
		{
			$this->location_type = $location_type;
		}
		
		try{
			if ( $blMsg == false)
			$new_location = $this->save();
			$result['new_location'] = $new_location;
		} catch(ErrorException $e)
		{
			$error_array = array(
				"error" => "Unable to save",
				"desc" => "You should input the longitude or latitude"	);

			// Set whether it is a fatal error
			$is_fatal = true;
			// Call method to throw an error		
			$result['error_array'] = $error_array;	
		} 	
		
		return $result;
	}
	
}