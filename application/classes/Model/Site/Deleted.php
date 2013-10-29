<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 10/27/13
 * Time: 1:59 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Deleted extends ORM
{
	
	protected $_table_name = 'deleted';
	protected $deleted_ent;
/*
	protected $_belongs_to = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		)
	);
	
	protected $_has_many = array(
		'_alias_' => array(
			'model' => '_model_name_', 
			'foreign_key' => '_column_'
		),
		'_alias_' => array(
			'model' => '_model_name_', 
			'through' => '_pivot_table_',
			'foreign_key' => '_column_',
			'far_key' => '_column_'
		)
	);
	
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
		$this->populate_ent();
	}

	protected function populate_ent()
	{
		if(!$this->loaded()) return false;
		echo "\n".$this->subject_enttypes_id.",".$this->subject_id."\n";
		if($this->subject_enttypes_id > 0 && $this->subject_id){
			$this->deleted_ent = Ent::eFact($this->subject_enttypes_id,$this->subject_id);
		}
	}

	public function delete_ent(){
		if(is_object($this->deleted_ent) && $this->deleted_ent->loaded())
		{
			if(method_exists($this->deleted_ent, 'delete'))
			{
				echo "Performing Real Delete\n";
				echo get_class($this->deleted_ent);
				$this->deleted_ent->delete();

			}
			else
			{
				//do manual db delete
			}
		}
		else
		{
			echo "Ent not instantiated\n";
		}
		$this->delete();
	}
}