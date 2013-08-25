<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:38 PM
 */

class Model_Location_County extends ORM
{
	
	protected $_table_name = 'counties';

	public $error_message_path = "models/location";

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

	public function getCities(){
		$cities_model = $this->cities;
		//exclude itself
		$classes_arr = array('Location_City' => 'location_city');
		$cities_model = ORM::_sql_exclude_deleted($classes_arr, $cities_model);
		return $cities_model;
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

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'states_obj' => 'state'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function getBasics($settings = array())
	{
//		return array(
//			"id" => $this->id,
//			"state" => $this->state->getBasics(),
//			"name" => $this->name,
//			"states_id" => $this->states_id,
//		);

		return parent::getBasics($settings);
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

	public function getOrgs($county_id){
		$org_model = ORM::factory("Sportorg_Org");
		$org_model->join('locations')->on('sportorg_org.locations_id', '=', 'locations.id');
		$org_model->join('cities')->on('cities.id', '=', 'locations.cities_id');
		$org_model->where('cities.counties_id', '=', $county_id);

		$classes_arr['Location_Base'] = 'locations';
		$classes_arr['Location_City'] = 'cities';
		//exclude itself
		$classes_arr['Sportorg_Org'] = 'sportorg_org';
		$org_model = ORM::_sql_exclude_deleted($classes_arr, $org_model);
		return $org_model;
	}

	public function name(){
		return "";
	}
}