<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 4:22 PM
 */

class Model_Sportorg_Position extends ORM
{
	
	protected $_table_name = 'positions';

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'stattab' => array(
			'model' => 'Stats_Tab',
			'foreign_key' => 'stattab_id'
		)
	);
	
	protected $_has_many = array(
		'utlposlink' => array(
			'model' => 'User_Teamslink_Positionslink',
			'foreign_key' => 'positions_id'
		)
	);
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"sports_id" => $this->sports_id,
			"stattab_id" => $this->stattab_id,
			"stattab" => $this->stattab->getBasics(),
			"sport" => $this->sport->getBasics()
		);
	}

	public function addPosition($args=array())
	{
		extract($args);

		if(isset($name))
		{
			$this->name = $name;
		}
		
		if(isset($sports_id))
		{
			$this->sports_id = $sports_id;
		}
		
		if(isset($stattab_id))
		{
			$this->stattab_id = $stattab_id;
		}
		
		$this->save();
		return $this;
	}
}