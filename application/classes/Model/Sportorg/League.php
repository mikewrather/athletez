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

	public function get_orgs(){
		$orgsArray = null;
		$orgs = $this->orgs;

		$classes_arr = array(
			'Sportorg_Org' => 'sportorg_org'
		);

		$orgs = ORM::_sql_exclude_deleted($classes_arr, $orgs);
		foreach($orgs->find_all() as $org){
			$orgsArray[] = $org->getBasics();
		}
		return $orgsArray;
	}

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'states_obj' => 'state',
			'sections_obj' => 'section'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(
			'orgs' => 'get_orgs'
		),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function getBasics($settings = array())
	{
//		//TODO, add by Jeffrey. Here need to align with Mike
//		$orgsArray = null;
//		foreach($this->orgs->find_all() as $org){
//			$orgsArray[] = $org->getBasics();
//		}
//		return array(
//			"id" => $this->id,
//			"section" => $this->section->getBasics(),
//			"name" => $this->name,
//			"sections_id" => $this->sections_id,
//			"states_id" => $this->states_id,
//			"orgs" => $orgsArray
//		);
		return parent::getBasics($settings);
	}
	
	public function getOrgs()
	{
		$orgs = ORM::factory('Sportorg_Org')
			->join('leagues','LEFT')
				->on('leagues.id','=','sportorg_org.leagues_id')
			->where('sportorg_org.leagues_id','=',$this->id);
		$classes_arr['Sportorg_League'] = 'leagues';

		$classes_arr['Sportorg_Org'] = 'sportorg_org';
		$orgs = ORM::_sql_exclude_deleted($classes_arr, $orgs);
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