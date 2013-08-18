<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/30/13
 * Time: 2:45 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_College_Base extends ORM
{
	
	protected $_table_name = 'colleges';

	protected $_belongs_to = array(
		'region' => array(
			'model' => 'College_Region',
			'foreign_key' => 'college_region_id'
		),
		'division' => array(
			'model' => 'College_Division',
			'foreign_key' => 'college_divisions_id'
		),
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'states_id'
		),
		'city' => array(
			'model' => 'Location_City',
			'foreign_key' => 'cities_id'
		),
	);
	
	protected $_has_many = array(
		'coaches' => array(
			'model' => 'College_Coach',
			'foreign_key' => 'college_id'
		),
		'_alias_' => array(
			'model' => '_model_name_', 
			'through' => '_pivot_table_',
			'foreign_key' => '_column_',
			'far_key' => '_column_'
		)
	);

/*	public function getBasics($settings = array()){
		return array(
			'id' => $this->id,
			'name' => $this->name,
			'city_id' => $this->cities_id,
			'college_city' => $this->college_city,
			'states_id' => $this->states_id,
			'school_type' => $this->school_type,
		);
	}
*/
	public function getSearch($args = array()){
		extract($args);
		$college_model =  ORM::factory("College_Base");
		$college_model->select(DB::expr("distinct('college_base.id')"));
		$college_model->join('college_coaches')->on('college_coaches.college_id', '=', 'college_base.id');
		if (isset($sports_id)){
			$college_model->where('college_coaches.sport_id', '=', $sports_id);
			//$college_model->where('college_coaches.id', 'is not', null);
		}

		if(isset($divisions)){
			$college_model->join('college_divisions')->on('college_divisions.id', '=', 'college_base.college_divisions_id')
				->where('college_divisions.id', 'in', $divisions);
		}

		if(isset($regions)){
			$college_model->join('college_regions')->on('college_regions.id', '=', 'college_base.college_region_id')
				->where('college_regions.id', 'in', $regions);
		}

		if (isset($academics)){
			$college_model->where('academic', 'in', $academics);
		}

		if (isset($states_id)){
			$college_model->where('states_id', '=', $states_id);
		}

		if (isset($private) || isset($public)){
			$college_model->and_where_open();
		}

		if (isset($private) && $private == 1){
			$college_model->or_where('school_type', '=', 'Private');
		}

		if (isset($public) && $public == 1){
			$college_model->or_where('school_type', '=', 'Public');
		}

		if (isset($private) || isset($public)){
			$college_model->and_where_close();
		}
		return $college_model;
	}


}