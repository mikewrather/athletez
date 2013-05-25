<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:52 PM
 */

class Model_Sportorg_League extends ORM
{
	
	protected $_table_name = 'leagues';

	public $error_message_path = 'models/sportorg/league';

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

	public function deleteBasic(){
		$result = $this->orgs->find_all()->as_array();
		if (count($result) > 0){
			return false;
		}else{
			$this->delete();
			return true;
		}
	}

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// sections_id (int)
			'sections_id'=>array(
				array('digit'),
				array('sections_id_exist'),
			),

			// states_id (int)
			'states_id'=>array(
				array('digit'),
				array('states_id_exist')
			),
		);
	}

	public function getBasics()
	{
		//TODO, add by Jeffrey. Here need to align with Mike
		$orgsArray = null;
		foreach($this->orgs->find_all() as $org){
			$orgsArray[] = $org->getBasics();
		}
		return array(
			"id" => $this->id,
			"section" => $this->section->getBasics(),
			"name" => $this->name,			
			"sections_id" => $this->sections_id,
			"states_id" => $this->states_id,
			"orgs" => $orgsArray
		);
	}
	
	public function getOrgs()
	{
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

		if(isset($sections_id))
		{
			$this->sections_id = $sections_id;
		}

		if(isset($id))
		{
			$this->id = $id;
		}

		try {
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}
	
    public function check_league_exist($args = array())
    {
        extract($args);
        if(isset($name) && isset($states_id) && isset($sections_id))
        {            
            $exists_obj = ORM::factory('Sportorg_League')
                        ->where('name', '=', $name)
                        ->and_where('states_id', '=', $states_id)
                        ->and_where('sections_id', '=', $sections_id)->find();
            
             if (!$exists_obj->loaded())
                return true;
            else
                return false;  
        }else
        {
            return true;
        }    
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
		if(isset($states_id))
		{
			$this->states_id = $states_id;	
		}
		
		// section_id column
		if(isset($sections_id))
		{
			$this->sections_id = $sections_id;
		}
		try {         
            $this->save();
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        } 
	}	
	
}