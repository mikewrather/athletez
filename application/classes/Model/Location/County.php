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
	
    public static function check_county_exist($args = array())
    {
        extract($args);
        if(isset($name) && isset($states_id))
        {
            $exists_obj = ORM::factory('Location_County')
                        ->where('name','=', $name)
                        ->and_where('states_id','=', $states_id)->find();    
             if (!$exists_obj->loaded())
                return true;
            else
                return false;  
        }else
        {
            return true;
        }    
    }
	public function addCounty($args = array())	
	{
		extract($args);
		 
		if(isset($name))
        {
            $this->name = $name;
        }
        if(isset($states_id))
        {
            $this->states_id = $states_id;    
        }		
        
		try {         
            $this->save();
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
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
	
	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// states_id (int)
			'states_id'=>array(
				array('digit'),
				array('states_id_exist')
			),
		);
	}

	public function updateCounty($args = array()){
		extract($args);
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
}