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
				array('not_equals', array(':value', 0))
			),

			// zip (varchar)
			'zip'=>array(
				array('not_empty'),
			),

			// lon (float)
			'lon'=>array(
				array('not_empty'),
			),

			// lat (float)
			'lat'=>array(
				array('not_empty'),
			),

			// loc_point (point), Comment by jeffrey, no this field in page, ignore
			/*
			'loc_point'=>array(
				array('not_empty'),
			),*/

			// location_type (enum)
			'location_type'=>array(
				array('not_empty'),
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
		return $this->save();
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
		} else
	        {
	            $args['address'] = '';
	        }
		
		if(isset($cities_id))
		{
			$this->cities_id = $cities_id;
		}else
	        {
	            $args['cities_id'] = '';
	        }
		 
		$error = array();
		

		if(isset($lon))
		{
			$this->lon = $lon;
		} else
	        {
	            $args['lon'] = '';
	        }
		
		if(isset($lat))
		{
			$this->lat = $lat;
		}else
	        {
	            $args['lat'] = '';
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
            $external_validate = Validation::factory($args)
                ->rule('address', 'not_empty')
                ->rule('cities_id', 'not_empty')
                ->rule('lon', 'not_empty')
                ->rule('lat', 'not_empty');
            
            if ($external_validate->check())
            {
                $new_location = $this->save($external_validate);    
            }               
			
            return $new_location;			
		} catch(ORM_Validation_Exception $e)
		{
        	return $e;
		} 	
		
		 
	}
	
}