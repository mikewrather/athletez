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
	
	public function addCounty($name)
	{
		if(isset($name))
		{
			$this->name = $name;
		}
		$this->states_id = $this->id;
		$this->save();

		return $this;
	}
	 
	public function addLeague($args = array())
	{
		extract($args);
		// name column
		if(isset($name))
		{
			$this->name = $name;
		}
		// states_id column
		$this->states_id = $this->id;
		
		// sports_id column
		if(isset($sections_id))
		{
			$this->sections_id = $sections_id;
		}
		
		$this->save();
		return $this;
	}	
	
	public function addSection($args = array())
	{
		extract($args);
		// name column
		if(isset($name))
		{
			$this->name = $name;
		}
		// states_id column
		$this->states_id = $this->id;
		
		// sports_id column
		if(isset($sports_id))
		{
			$this->sports_id = $sports_id;
		}
		
		$this->save();
		return $this;
	}	
	
	public function addDivision($args = array() )
	{
		extract($args);
		// name column
		if(isset($name))
		{
			$this->name = $name;
		}
		
		// sections_id column
		if(isset($sections_id))
		{
			$this->sections_id = $sections_id;
		}
		
		// states_id colunn
		$this->states_id = $this->id;
		$this->save();
		return $this;
	}
	
	public function addState($args = array())
	{
		extract($args);
		if(isset($name))
		{
			$this->name = $name;
		}
 
		// counties_id (REQUIRED)
		// The county the city belongs to
		if(isset($counties_id))
		{
			$this->countries_id = $counties_id;
		}

		$this->save();

		return $this;
	}

}