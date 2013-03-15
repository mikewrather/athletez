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
		'secondsport' => array(
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

	public function getBasics()
	{
		return array(
			"name" => $this->name,
			"sport" => $this->sport->getBasics(),
			"secondsport" => $this->sport->getBasics(),
			"stattab" => $this->stattab->getBasics(),
			"description" => $this->description,
			"datatype" => $this->datatype,
			"orderNum" => $this->orderNumb,
			"field_size" => $this->field_size,
			"calc_formula" => $this -> calc_formula,
			"is_calc" => $this -> is_calc						
		);
	}
}