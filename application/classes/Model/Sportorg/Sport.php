<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/4/13
 * Time: 1:21 PM
 */

class Model_Sportorg_Sport extends ORM
{

	protected $_table_name = 'sports';

	protected $_belongs_to = array(
		'type' => array(
			'model' => 'Sportorg_Sporttype',
			'foreign_key' => 'sport_type_id'
		)
	);
	
	protected $_has_many = array(
		'sections' => array(
			'model' => 'Sportorg_Section',
			'foreign_key' => 'sports_id'
		),
		'usl' => array(
			'model' => 'User_Sportlink',
			'foreign_key' => 'sports_id'
		),
		'athletes' => array(
			'model' => 'Users_Base',
			'through' => 'user_sport_link',
			'foreign_key' => 'sports_id',
			'far_key' => 'users_id'
		),
		'media' => array(
			'model' => 'Media_Base',
			'foreign_key' => 'sports_id'
		),
		'positions' => array(
			'model' => 'Sportorg_Position',
			'foreign_key' => 'sports_id'
		),
		'orgs' => array(
			'model' => 'Sportorg_Orgs',
			'through' => 'org_sport_link',
			'foreign_key' => 'sports_id',
			'far_key' => 'orgs_id'
		),
	);

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// male (tinyint)
			'male'=>array(
				array('not_empty'),
				array('in_array', array(':value', array(0, 1))),
			),

			// female (tinyint)
			'female'=>array(
				array('not_empty'),
				array('in_array', array(':value', array(0, 1))),
			),

			// sport_type_id (int)
			'sport_type_id'=>array(
				array('not_empty'),
				array('digit'),
				array('sport_type_id_exist'),
			),
		);
	}


	public function updateType($sport_type_id)
	{
		$this->sport_type_id = $sport_type_id;
		return $this->save();
	}
	
	public function updateSport($args)
	{
		extract($args);
		if ( isset($name))
		{
			$this->name = $name;
		}
		
		if ( isset($male))
		{
			$this->male = $male;
		}
		
		if ( isset($female))
		{
			$this->female = $female;
		}
		
		if ( isset($sport_type_id))
		{
			$this->sport_type_id = $sport_type_id;
		}
		
		return $this->save();
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"male" => $this->male,
			"female" => $this->female,
			"sport_type_id" => $this->sport_type_id,
			"sport_type" => $this->type->getBasics()

		);
	}

	public function getListall($args = array()){
		extract($args);
		$sports = ORM::factory('Sportorg_Sport');
		if ($id != 0){
			$sports->where('id', '=', $this->id);
		}
		return $sports;
	}

	public function getPositions(){
		$positions = $this->positions;
		return $positions;
	}

	public function getSportType(){
		$type = $this->type;
		return $type;
	}

	public function getAthletes(){
		$athletes = $this->athletes;
		return $athletes;
	}
}