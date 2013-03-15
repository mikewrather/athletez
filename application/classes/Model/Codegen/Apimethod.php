<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/7/13
 * Time: 12:57 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Codegen_Apimethod extends ORM
{
	
	protected $_table_name = 'apiaccess';
	

	protected $_belongs_to = array(
		'entlist' => array(
			'model' => 'Codegen_Entlist',
			'foreign_key' => 'entlist_id'
		)
	);

	protected $_has_many = array(
		'params' => array(
			'model' => 'Codegen_Apiparams',
			'foreign_key' => 'apiaccess_id'
		),
	);
/*
	protected $_has_one = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		)
	);
*/
	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getID1()
	{
		if($this->id1 != NULL)
		{
			return $this->id1;
		}
		return $this->entlist->id1;
	}

	public function getID2()
	{
		if($this->id2 != NULL)
		{
			return $this->id2;
		}
		return $this->entlist->id2;
	}

}