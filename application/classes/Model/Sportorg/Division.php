<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 4:23 PM
 */

class Model_Sportorg_Division extends ORM
{
	
	protected $_table_name = 'divisions';

	public $error_message_path = "models/sportorg";

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

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// states_id (int)
			'states_id'=>array(
				array('not_empty'),
				array('digit'),
				array('states_id_exist')
			),

			// sections_id (int) -- I took out two rules here because section ID is only for some states
			'sections_id'=>array(
				array('digit'),
			),
		);
	}

	public function getBasics()
	{
		$orgsArray = null;
		foreach($this->orgs->find_all() as $org){
			$orgsArray[] = $org->getBasics();
		}
		return array(
			"id" => $this->id,
			"state" => $this->state->getBasics(),
			"name" => $this->name,
			"states_id" => $this->states_id,
			"sections_id" => $this->sections_id,
			"section" => $this->section->getBasics(),
			"orgs" =>$orgsArray
		);
	}
	
	public function updateDivision($args = array())
	{
		extract($args);

		if(isset($id))
		{
			$this->id = $id;
		}
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
		
		try{
			$validate_array = array('name'=>$name, 'states_id'=>$states_id);
			$external_validate = Validation::factory($validate_array);
			$external_validate->rule('name', 'division_exist', array($name, $states_id));
			if ($this->check($external_validate))
				$this->update();
			return $this;
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}
	
	public function deleteDivision()
	{
		return $this->delete();
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
		if(isset($states_id))
		{
			$this->states_id = $states_id;	
		}
		
        try {
			$validate_array = array('name'=>$name, 'states_id'=>$states_id);
			$external_validate = Validation::factory($validate_array);
			$external_validate->rule('name', 'division_exist', array($name, $states_id));
			if ($this->check($external_validate))
            	$this->save();
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        } 
	}
	
	public function getOrgs()
	{
		$orgs = $this->orgs;
		return $orgs;
	} 
}