<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:40 PM
 */

class Model_Location_State extends ORM
{
	
	protected $_table_name = 'states';

	public $error_message_path = 'models/location';

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
				array('countries_id_exist')
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
    
	public function getSections()
	{
		$sections = $this->sections;

		//exclude itself
		$classes_arr = array('Sportorg_Section' => 'sportorg_section');
		$sections = ORM::_sql_exclude_deleted($classes_arr, $sections);
		return $sections;
	}
	
	public function getCounties()
	{
		$counties = $this->counties;
		//exclude itself
		$classes_arr = array('Location_County' => 'location_county');
		$counties = ORM::_sql_exclude_deleted($classes_arr, $counties);
		return $counties;
	}
	
	public function getDivisions()
	{
		$divisions = $this->divisions;

		//exclude itself
		$classes_arr = array('Sportorg_Division' => 'sportorg_division');
		$divisions = ORM::_sql_exclude_deleted($classes_arr, $divisions);
		return $divisions;
	}
	
	public function getLeagues()
	{
		$leagues = ORM::factory('Sportorg_League')
					->join('states')
					->on('states.id', '=', 'sportorg_league.states_id')
					->where('states.id', '=', $this->id);
		$classes_arr['Location_State'] = 'states';

		//exclude itself
		$classes_arr['Sportorg_League'] = 'sportorg_league';
		$leagues = ORM::_sql_exclude_deleted($classes_arr, $leagues);
		return $leagues;
	}

	public function get_search($args = array()){
		if (empty($args)){
			return $this;
		}else{
			extract($args);
			$this
				->where('name', 'like', $name."%")
				->or_where('abbr','=',$name);
		}

		return $this;
	}

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'countries_obj' => 'country'
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
//			"name" => $this->name,
//			"countries_id" => $this->countries_id,
//			"country" => $this->country->getBasics()
//		);

		return parent::getBasics($settings);
	}
	
	public function updateState($args = array())
	{
		extract($args);

		if(isset($id))
		{
			$this->id = $id;
		}

		if(!isset($name))
		{
			$name = $this->name;
		}
 
		// counties_id (REQUIRED)
		// The county the city belongs to
		if(isset($countries_id))
		{
			$this->countries_id = $countries_id;
		}else{
			$countries_id = $this->countries_id;
		}


		try{

			if ($this->check()){
				$exteral_validate = Validation::factory($args);
				$exteral_validate->rule("name", "state_entity_exist", array($name, $countries_id));
				if ($this->check($exteral_validate) && $args['name'] != $this->name){
					 $this->name = $args['name'];
					$this->update($exteral_validate);
				}
			}

			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
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
			$exteral_validate = Validation::factory($args);
			$exteral_validate->rule("name", "state_entity_exist", array($name, $countries_id));
			$this->save($exteral_validate);

            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        }  
	}
}