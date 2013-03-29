<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:40 PM
 */

class Model_Location_State extends ORM
{
	
	protected $_table_name = 'states';
	

	protected $_belongs_to = array(
		'country' => array(
			'model' => 'Location_Country',
			'foreign_key' => 'countries_id'
		)
	);
	
	protected $_has_many = array(
		'divisions' => array(
			'model' => 'Sportorg_Division',
			'foreign_key' => 'states_id'
		),
		'sections' => array(
			'model' => 'Sportorg_Section',
			'foreign_key' => 'states_id'
		),
		'counties' => array(
			'model' => 'Location_County',
			'foreign_key' => 'states_id'
		)
	);

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,			 
			"countries_id" => $this->countries_id,
			"country" => $this->country->getBasics()
		);
	}
	 	
	public function addState($args = array())
	{
		extract($args);
		
		// validate
		$exists_obj = $this->where('name', '=', $name)->and_where('countries_id', '=', $countries_id);
		$exists_obj->reset(FALSE);
		$count = $exists_obj->count_all();
	 
		if ( $count == 0 )
		{
			if(isset($name))
			{
				$this->name = $name;
			}
	 
			// counties_id (REQUIRED)
			// The county the city belongs to
			if(isset($countries_id))
			{
				$this->countries_id = $countries_id;
			}
			
			$this->save();
			return $this;
		} else
		{
			return $exists_obj->find();
		}
		
	}

}