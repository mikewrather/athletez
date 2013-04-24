<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/15/13
 * Time: 2:29 PM
 */

class Model_Sportorg_Section extends ORM
{
	
	protected $_table_name = 'sections';
	

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'state' => array(
			'model' => 'Location_State',
			'foreign_key'=>'states_id'
		)
	);

	protected $_has_many = array(
		'leagues' => array(
			'model' => 'Sportorg_League',
			'foreign_key' => 'sections_id'
		),
		'divisions' => array(
			'model' => 'Sportorg_Divisions',
			'foreign_key' => 'sections_id'
		),
	);

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// sports_id (int)
			'sports_id'=>array(
				array('not_empty'),
				array('sports_id_exist')
			),

			// states_id (int)
			'states_id'=>array(
				array('not_empty'),
				array('states_id_exist')
			),
		);
	}

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"sports_id" => $this->sports_id,
			"states_id" => $this->states_id,
			"sports" => $this->sport->getBasics(),
			"states" => $this->state->getBasics()
		);
	}
	
	public function updateSection($args = array())
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
		
		// sports_id column
		if(isset($sports_id))
		{
			$this->sports_id = $sports_id;
		}
		
		$this->save();
		return $this;
	}
	
	public function deleteSection()
	{
		return $this->delete();
	}
    
    public static function check_section_exist($args = array())
    {
        extract($args);
        if(isset($name) && isset($states_id) && isset($sports_id))
        {            
            $exists_obj = ORM::factory('Sportorg_Section')
                        ->where('name', '=', $name)
                        ->and_where('states_id', '=', $states_id)
                        ->and_where('sports_id', '=', $sports_id)->find();
            
             if (!$exists_obj->loaded())
                return true;
            else
                return false;  
        }else
        {
            return true;
        }     
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
		if(isset($states_id))
		{
			$this->states_id = $states_id;	
		}
		
		// sports_id column
		if(isset($sports_id))
		{
			$this->sports_id = $sports_id;
		}
		
		 
		try {         
            $this->save();
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        } 
	}	
	

}