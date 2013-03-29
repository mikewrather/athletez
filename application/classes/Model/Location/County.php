<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:38 PM
 */

class Model_Location_County extends ORM
{
	
	protected $_table_name = 'counties';
	

	protected $_belongs_to = array(
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'states_id'
		)
	);
	
	protected $_has_many = array(
		'cities' => array(
			'model' => 'Location_City',
			'foreign_key' => 'counties_id'
		)
	);
	

	public function addCounty($args = array())	
	{
		extract($args);
		$exists_obj = $this->where('name', '=', $name)->and_where('states_id', '=', $states_id);
		$exists_obj->reset(FALSE);
		$count = $exists_obj->count_all();
		
		if ( $count == 0 )
		{
			if(isset($name))
			{
				$this->name = $name;
			}
			if(isset($states_id))
			{
				$this->states_id = $states_id;	
			}
			
			$this->save();
	
			return $this;
		} else {
			return $exists_obj->find();
		}
		
	}
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"state" => $this->state->getBasics(),
			"name" => $this->name,
			"states_id" => $this->states_id,
		);
	}
}