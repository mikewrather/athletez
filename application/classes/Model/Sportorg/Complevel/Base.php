<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:53 PM
 */

class Model_Sportorg_Complevel_Base extends ORM
{
	
	protected $_table_name = 'complevels';
	public $error_message_path = 'models/sportorg/complevel';

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

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// min_age (int)
			'min_age'=>array(
				array('digit'),
			),

			// max_age (int)
			'max_age'=>array(
				array('digit'),
			),

			// complevel_profiles_id (int)
			'complevel_profiles_id'=>array(
				array('not_empty'),
				array('complevel_profiles_id_exist')
			),
		);
	}

	public function getBasics($settings = array())
	{
		return array(
			"complevel_id" => $this->id,
			"complevelprofile" => $this->complevelprofile->getBasics(),
			"complevel_name" => $this->name,
			"min_age" => $this->min_age,		
			"max_age" => $this->max_age,
			"complevel_profiles_id" => $this->complevel_profiles_id
		);
	}

	public function getTeamsBasics()
	{
		return array(
			"id" => $this->id,
			"complevelprofile" => $this->complevelprofile->getBasics(),
			"name" => $this->name,
			"min_age" => $this->min_age,
			"max_age" => $this->max_age,
			"complevel_profiles_id" => $this->complevel_profiles_id,
			"teams" => $this->teams->getBasics()
		);
	}
	
	public function updateComplevel($args = array())
	{
		extract($args);
		// name 
		// Change the name of the Competition Level
		if(isset($name))
		{
			$this->name = $name;
		}
		// complevel_profiles_id 
		// Change the Competition Profile
		if(isset($complevel_profiles_id))
		{
			$this->complevel_profiles_id = $complevel_profiles_id;
		}
		// min_age 
		// Change Minimum Age for this Comp Level
		if(isset($min_age))
		{
			$this->min_age = $min_age;
		}
		// max_age 
		// Change Maximum Age for this Comp Level
		if(isset($max_age))
		{
			$this->max_age = $max_age;
		}

		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
		return $this;
	}
	
	public function addComplevel($args = array())
	{
		extract($args); 		 
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

		if(isset($min_age))
		{
			$this->min_age = $min_age;
		}

		if(isset($max_age))
		{
			$this->max_age = $max_age;
		}

        try {
			$external_validate = Validation::factory(array('name' => $name));

			$external_validate->rule('name', 'complevel_name_exist', array($name, $complevel_profiles_id));
			if ($this->check($external_validate)){
				$this->save();
			}
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        } 
	}

	public function getTeams($args = array()){
		extract($args);
		$teams_obj = ORM::factory("Sportorg_Team");
		$teams_tb_alias = "sportorg_team";
		$org_sport_link_tb_alias ='org_sport_link';
		$orgs_tb_alias = 'orgs';
		$divisions_tb_alias = 'divisions';
		//always join tables
		$teams_obj->join($org_sport_link_tb_alias, 'LEFT')
			->on($teams_tb_alias.'.org_sport_link_id', '=', $org_sport_link_tb_alias.'.id');
		$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';

		$teams_obj->join($orgs_tb_alias, 'left')
			->on($org_sport_link_tb_alias.'.orgs_id', '=', $orgs_tb_alias.'.id');
		$classes_arr['Sportorg_Org'] = 'orgs';
		$teams_obj->join($divisions_tb_alias, 'left')
			->on($orgs_tb_alias.'.divisions_id', '=', $divisions_tb_alias.".id");
		$classes_arr['Sportorg_Division'] = 'divisions';

		if (isset($complevels_id) && $complevels_id !=""){
			$teams_obj->and_where($teams_tb_alias.'.complevels_id', '=', $complevels_id);
		}
		$teams_obj->and_where_open();

		if (isset($seasons_id) && $seasons_id !=""){
			$teams_obj->where($teams_tb_alias.'.seasons_id', '=', $seasons_id);
		}

		if (isset($orgs_id) && $orgs_id !=""){
			$teams_obj->and_where($org_sport_link_tb_alias.'.orgs_id', '=', $orgs_id);
		}

		if (isset($sports_id) && $sports_id !=""){
			$teams_obj->and_where($org_sport_link_tb_alias.'.sports_id', '=', $sports_id);
		}

		if (isset($divisions_id) && $divisions_id !=""){

			$teams_obj->and_where($orgs_tb_alias.'.divisions_id', '=', $divisions_id);
		}

		if (isset($leagues_id) && $leagues_id !=""){
			$teams_obj->and_where($orgs_tb_alias.'.leagues_id', '=', $leagues_id);
		}

		if ((isset($sections_id) && $sections_id !="") && (isset($divisions_id) && $divisions_id !="")){
			$teams_obj->and_where($divisions_tb_alias.'.sections_id', '=', $sections_id);
		}

		if ((isset($states_id) && $states_id !="") && (isset($divisions_id) && $divisions_id !="")){
			$teams_obj->and_where($divisions_tb_alias.'.states_id', '=', $states_id);
		}

		$teams_obj->and_where_close();
		//exclude itself
		$classes_arr['Sportorg_Team'] = 'sportorg_team';
		$teams_obj = ORM::_sql_exclude_deleted($classes_arr, $teams_obj);
		return $teams_obj;
	}

	public function getListAll($args = array()){
		extract($args);
		$complevels = ORM::factory('Sportorg_Complevel_Base');

		if(isset($complevel_profiles_id) && $complevel_profiles_id != "")
		{
			$complevels->where('complevel_profiles_id', '=', $complevel_profiles_id);
		}
		//exclude itself
		$classes_arr = array('Sportorg_Complevel_Base' => 'sportorg_complevel_base');
		$complevels = ORM::_sql_exclude_deleted($classes_arr, $complevels);

		return $complevels;
	}


}