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
				array('city_id_exist')
			),

			// zip (varchar)
			'zip'=>array(
				array('not_empty'),
			),

/*			// lon (float)
			'lon'=>array(
				array('not_empty'),
			),

			// lat (float)
			'lat'=>array(
				array('not_empty'),
			), */

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
		extract($args);
		if(isset($address))
		{
			$this->address = $address;
		}

		if(isset($cities_id))
		{
			$this->cities_id = $cities_id;
		}

		if(isset($lon))
		{
			$this->lon = $lon;
		}
		
		if(isset($lat))
		{
			$this->lat = $lat;
		}

		if(isset($loc_point))
		{
			$this->loc_point = $loc_point;
		}

		if(isset($zip))
		{
			$this->zip = $zip;
		}
		
		if(isset($location_type))
		{
			$this->location_type = $location_type;
		}
		         
		try{		 
            $new_location = $this->save();    
            return $new_location;			
		} catch(ORM_Validation_Exception $e)
		{
        	return $e;
		} 	
	}
	
}