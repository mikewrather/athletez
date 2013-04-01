<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:53 PM
 */

class Model_Sportorg_Complevel_Base extends ORM
{
	
	protected $_table_name = 'complevels';
	

	protected $_belongs_to = array(
		'complevelprofile' => array(
			'model' => 'Sportorg_Complevel_Profile',
			'foreign_key' => 'complevel_profiles_id'
		)
	);
	
	protected $_has_many = array(
		'teams' => array(
			'model' => 'Sportorg_Team',
			'foreign_key' => 'complevels_id'
		),
	);
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"complevelprofile" => $this->complevelprofile->getBasics(),
			"name" => $this->name,
			"min_age" => $this->min_age,		
			"max_age" => $this->max_age,
			"complevel_profiles_id" => $this->complevel_profiles_id
		);
	}
	
	public function addComplevel($args = array())
	{
		extract($args); 
		 
		// insert to the complevel table
		// validate
		$exists_obj =  ORM::factory('Sportorg_Complevel_Base')->where('name', '=', $name)->and_where('complevel_profiles_id', '=', $complevel_profiles_id);
		$exists_obj->reset(FALSE);
		$count = $exists_obj->count_all();
		 
		if ( $count == 0 )
		{
			// name 
			// Name of the new Competition Level
			if(isset($name))
			{
				$this->name = $name;
			}
	 
			// complevel_profiles_id
			// The Competition Level Profile the Complevel belongs to
			if(isset($complevel_profiles_id))
			{
				$this->complevel_profiles_id = $complevel_profiles_id;
			}
			
			$this->save();
			return $this;
		} else
		{
			return $exists_obj->find();
		} 
	}
	
	//Custom Validation
	public static function check_complevel_exist($name, $complevel_profiles_id)
	{		
		$complevel_obj = ORM::factory("Sportorg_Complevel_Base");
		$complevel_obj->select("id");
		if (!empty($name))
			$complevel_obj->where('name', '=', $name);
		
		if (!empty($complevel_profiles_id))	
			$complevel_obj->where('complevel_profiles_id','=', $complevel_profiles_id);
			
		$complevel_obj->find();
		if ($complevel_obj->loaded()){
			return true;
		}
		return false;
	}
}