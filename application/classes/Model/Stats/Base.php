<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/7/13
 * Time: 2:04 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Stats_Base extends ORM
{
	
	protected $_table_name = 'stats';

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'sport2' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id2'
		),
		'stattab' => array(
			'model' => 'Stats_Tab',
			'foreign_key' => 'stattabs_id'
		)
	);

	protected $_has_many = array(
		'vals' => array(
			'model' => 'Stats_Vals',
			'foreign_key' => 'stats_id'
		),
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function updateStat($args = array())
	{
		extract($args);
		
		// name 
		// Change the name of this Statistic
		if( isset($name))
		{
			$this->name = $name;
		}
		// description 
		// Change the description of this Statistic
		if( isset($description))
		{
			$this->description = $description;
		}

		try {
			$this->save();
			return $this;
		} catch(ORM_Validation_Exception $e){
			return $e;
		}

		return $this;
	}
	
	public function getBasics($settings)
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"sports_id" => $this->sports_id,
			"sports_id2" => $this->sports_id2,
			"stattabs_id" => $this->stattabs_id,
			"sport" => $this->sport->getBasics(),
			"sport2" => $this->sport2->getBasics(),
			"stattab" => $this->stattab->getBasics(),
			"description" => $this->description,
			"datatype" => $this->datatype,
			"orderNum" => $this->orderNum,
			"field_size" => $this->field_size,
			"calc_formula" => $this -> calc_formula,
			"is_calc" => $this -> is_calc						
		);
	}
}