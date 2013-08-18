<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:53 PM
 */

class Model_Stats_Tab extends ORM
{
	
	protected $_table_name = 'stattabs';
	

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'sport2' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'stattab' => array(
			'model' => 'Stats_Tab',
			'foreign_key' => 'stattab_id'
		)
	);
	
	protected $_has_many = array(
		'stattabs' => array(
			'model' => 'Stats_Tab',
			'foreign_key' => 'stattab_id'
		),
		'stats' => array(
			'model' => 'Stats_Base',
			'foreign_key' => 'stattabs_id'
		)
	);



	public function getBasics($settings)
	{
		return array(
			"id" => $this->id,			
			"stattab_id" => $this->stattab_id,
			"sport_id" => $this->sports_id,
			"sport_id2" => $this->sport_id2,
			"sport" => $this->sport->getBasics(),
			"sport2" => $this->sport2->getBasics(),
			"name" => $this->name,
			"classname" => $this->classname,
			"is_root" => $this->is_root,
			"defaultChild" => $this->defaultChild,
			"orderNum" => $this->orderNum,
		);
	}
}