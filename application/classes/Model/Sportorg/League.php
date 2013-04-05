<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:52 PM
 */

class Model_Sportorg_League extends ORM
{
	
	protected $_table_name = 'leagues';
	

	protected $_belongs_to = array(
		'section' => array(
			'model' => 'Sportorg_Section',
			'foreign_key' => 'sections_id'
		)
	);

	protected $_has_many = array(
		'orgs' => array(
			'model' => 'Sportorg_org',
			'foreign_key' => 'leagues_id',
		)
	);

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"section" => $this->section->getBasics(),
			"name" => $this->name,			
			"sections_id" => $this->sections_id,
			"states_id" => $this->states_id,
		);
	}
	
	public function getOrgs()
	{
		if(!$this->loaded()) return false;
		$orgs = ORM::factory('Sportorg_Org')
			->join('leagues','LEFT')
				->on('leagues.id','=','sportorg_org.leagues_id')
			->where('sportorg_org.leagues_id','=',$this->id);
		 
		return $orgs;
	}
	
	public function updateLeague($args = array())
	{
		extract($args);
		// name 
		// Update the name of the league
		if(isset($name))
		{
			$this->name = $name;
		}
		// states_id 
		// Change the state of this league
		if(isset($states_id))
		{
			$this->states_id = $states_id;	
		}
		// sections_id 
		// Change the Section this league belongs to
		if(isset($sections_id))
		{
			$this->sections_id = $sections_id;
		}
		return $this;
	}
	
	public function addLeague($args = array())
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
			// states_id column 
			if(isset($states_id))
			{
				$this->states_id = $states_id;	
			}
			
			// sports_id column
			if(isset($sections_id))
			{
				$this->sections_id = $sections_id;
			}
			
			$this->save();
			return $this;
		} else
		{
			return $exists_obj->find();
		}
		
	}	
	
}