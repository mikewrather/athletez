<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 4:23 PM
 */

class Model_Sportorg_Division extends ORM
{
	
	protected $_table_name = 'divisions';

	protected $_belongs_to = array(
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'states_id'
		),
		'section' => array(
			'model' => 'Sportorg_Section',
			'foreign_key' => 'sections_id'
		)
	);
	
	protected $_has_many = array(
		'orgs' => array(
			'model' => 'Sportorg_org',
			'foreign_key' => 'divisions_id'
		)
	);
	public function getBasics()
	{
		
			return array(
				"id" => $this->id,
				"state" => $this->state->getBasics(),			 
				"name" => $this->name,			
				"states_id" => $this->states_id,
				"sections_id" => $this->sections_id,
				"section" => $this->section->getBasics(),
			);
			
	}
	
	public function updateDivision($args = array())
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
		if(isset($states_id))
		{
			$this->states_id = $states_id;	
		}
		
		$this->save();
		return $this;
	}
	
	public function deleteDivision()
	{
		return $this->delete();
	}
	
	public function addDivision($args = array() )
	{
		extract($args);
		$exists_obj = $this->where('name', '=', $name)->and_where('states_id', '=', $states_id)->and_where('sections_id', '=', $sections_id);
		$exists_obj->reset(FALSE);
		$count = $exists_obj->count_all();
		
		if ( $count == 0 )
		{
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
			if(isset($states_id))
			{
				$this->states_id = $states_id;	
			}
			 
			$this->save();
			return $this;
		} else
		{
			return $exists_obj->find();
		}
		
	}
}