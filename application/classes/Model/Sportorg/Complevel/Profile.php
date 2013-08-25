<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:55 PM
 */

class Model_Sportorg_Complevel_Profile extends ORM
{
	
	protected $_table_name = 'complevel_profiles';

	public $error_message_path = 'models/sportorg/complevel';
	
	protected $_has_many = array(
		'orgs' => array(
			'model' => 'Sportorg_Org',
			'foreign_key' => 'complevel_profiles_id'
		),
		'complevels' => array(
			'model' => 'Sportorg_Complevel_Base',
			'foreign_key' => 'complevel_profiles_id'
		)
	);

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),
		);
	}


	function addComplevelprofile($args){
		extract($args);
		if (isset($id)){
			$this->id = $id;
		}
		if (isset($name)){
			$this->name = $name;
		}
		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getComplevels($args = array()){
		extract($args);
		$complevels_model = $this->complevels;
		if (isset($orgs_id)){
			$complevels_model->join('orgs')
				->on('orgs.complevel_profiles_id', '=', 'sportorg_complevel_base.complevel_profiles_id');
			$complevels_model->where('orgs.id', '=', $orgs_id);

			$classes_arr['Sportorg_Org'] = 'orgs';
		}

		//exclude itself
		$classes_arr['Sportorg_Complevel_Base'] = 'sportorg_complevel_base';
		$complevels_model = ORM::_sql_exclude_deleted($classes_arr, $complevels_model);

		return $complevels_model;
	}

	public function getComplevels_as_array($args = array()){
		$retArr = array();
		$complevels = ORM::factory('Sportorg_Complevel_Base')->where('complevel_profiles_id','=',$this->id)->find_all();
		foreach($complevels as $comp_level)
		{
			$retArr[] = $comp_level->getBasics();
		}
		return $retArr;
	}

	public function getBasics($settings = array())
	{
//		return array(
//			"id" => $this->id,
//			"name" => $this->name,
//		);

		return parent::getBasics($settings);
	}

}