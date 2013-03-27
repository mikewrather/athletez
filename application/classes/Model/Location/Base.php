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
		
		if(isset($address))
		{
			$this->address = $address;
		}
		
		if(isset($cities_id))
		{
			$this->cities_id = $cities_id;
		}
		
		if(isset($states_id))
		{
			$this->states_id = $states_id;
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
		
		// states_id
		// State the city belongs to
		if(isset($states_id))
		{
			$this->state_id = $states_id;
		}
		
		if(isset($location_type))
		{
			$this->location_type = $location_type;
		}
		
		$this->save();
		return $this;
	}
	
}