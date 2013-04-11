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

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// countries_id (int)
			'countries_id'=>array(
				array('not_empty'),
				array('digit'),
				array('not_equals', array(':value', 0))
			),
		);
	}

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
    
    public $error_message_path = 'models/location';
    
	public function getSections()
	{
		return $this->sections;
	}
	
	public function getCountries()
	{
		return $this->counties;
	}
	
	public function getDivisions()
	{
		return $this->divisions;
	}
	
	public function getLeagues()
	{
		$leagues = ORM::factory('Sportorg_League')
					->join('states')
					->on('states.id', '=', 'sportorg_league.states_id')
					->where('states.id', '=', $this->id);
		
	 		
		return $leagues;	
	}
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,			 
			"countries_id" => $this->countries_id,
			"country" => $this->country->getBasics()
		);
	}
	
	public function updateState($args = array())
	{
		extract($args);
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
	}
	public static function check_state_exist($args = array())
    {
        extract($args);
        if(isset($name) && isset($countries_id))
        {
            $exists_obj = ORM::factory('Location_State')
                        ->where('name','=', $name)
                        ->and_where('countries_id','=', $countries_id)->find();    
             if (!$exists_obj->loaded())
                return true;
            else
                return false;  
        }else
        {
            return true;
        }        
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
        if(isset($countries_id))
        {
            $this->countries_id = $countries_id;
        }		
		
        try {         
            $this->save();
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        }  
	}
    
     

}