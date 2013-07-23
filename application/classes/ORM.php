<?php defined('SYSPATH') OR die('No direct script access.');

class ORM extends Kohana_ORM
{

	public function is_flagged()
	{
		if(!$this->loaded()) return false;

		$qry = DB::select()
			->from('flags')
			->where('subject_enttypes_id','=',Ent::getMyEntTypeID($this))
			->where('subject_id','=',$this->id)
			->where('resolved','=','0')
			->limit(1)->execute();

		if($qry->count() > 0) return true;
		return false;
	}

	/*
	 * $class_names should include the obj itself, comment by Jeffrey
	 *
	 * */
	public static function _sql_exclude_deleted($class_names,$qry)
	{
		$enttypes = array();
		$qry->and_where_open();
		foreach($class_names as $class => $table_name)
		{
			$this_ent = Ent::getMyEntTypeID($class);

			$del_subqry = DB::select(array(DB::expr("COUNT('*')"),'deleted'))->from('deleted')
				->where('subject_enttypes_id','=',$this_ent)
				->and_where('subject_id','=',DB::expr($table_name.'.id'));

			$qry->where($del_subqry,'=',0);
		}
		$qry->and_where_close();

		return $qry;
	}


	public static function _sql_exclude_deleted_abstract($class_names,$qry)
	{
		$enttypes = array();
		$qry->and_where_open();
		foreach($class_names as $class => $search_field)
		{
			if(is_object($search_field))
			{
				if($search_field->loaded())
				{
					$enttype = ORM::factory('Site_Enttype',Ent::getMyEntTypeID($search_field));
					$search_field = $enttype->id1;
				}
			}

			$this_ent = Ent::getMyEntTypeID($class);

			$del_subqry = DB::select(array(DB::expr("COUNT('*')"),'deleted'))->from('deleted')
				->where('subject_enttypes_id','=',$this_ent)
				->and_where('subject_id','=',DB::expr($search_field));

			$qry->where($del_subqry,'=',0);

		}
		$qry->and_where_close();

		return $qry;
	}


	public function undo_delete_with_deps()
	{
		$this->undo_delete_deps();
		$this->undo_delete(); // this method will add the row to the deleted table
	}

	public function undo_delete()
	{
		if(!$this->loaded()) return false;
		DB::delete('deleted')
			->where('subject_enttypes_id','=',Ent::getMyEntTypeID($this))
			->where('subject_id','=',$this->id)
			->where('users_id','=',Auth::instance()->get_user()->id)
			->execute();

		return true;
	}

	protected function undo_delete_deps()
	{
		//Get My Class Name Minus Model_
		$classname = str_replace('Model_','',get_class($this));

		// Get the dependencies for my class
		$deps = Kohana::$config->load('dependencies')->get($classname);

		// Check if there are any results
		if(is_array($deps))
		{
			// Loop through all dependencies
			foreach($deps as $model => $fkey)
			{
				// instantiate ORM model for all dependent rows
				$orm_models = ORM::factory($model)
					->where($fkey,'=',$this->id)
					->find_all();

				// For each row, recursively execute the delete_with_deps method
				foreach($orm_models as $orm_model)
				{
					$orm_model->undo_delete_with_deps();
				}
			}
		}
	}

	public function phantom_delete()
	{
		if(!$this->loaded()) return false;

		$qry = DB::insert('deleted',array(
			'subject_enttypes_id',
			'subject_id',
			'users_id'
			)
		)->values(
			array(
				Ent::getMyEntTypeID($this),
				$this->id,
				Auth::instance()->get_user()->id
			)
		)->execute();
		return;
	}

	public function delete_with_deps()
	{
		$this->delete_deps();
		$this->phantom_delete(); // this method will add the row to the deleted table
	}

	protected function delete_deps()
	{
		//Get My Class Name Minus Model_
		$classname = str_replace('Model_','',get_class($this));

		// Get the dependencies for my class
		$deps = Kohana::$config->load('dependencies')->get($classname);

		// Check if there are any results
		if(is_array($deps))
		{
			// Loop through all dependencies
			foreach($deps as $model => $fkey)
			{
				// instantiate ORM model for all dependent rows
				$orm_models = ORM::factory($model)
					->where($fkey,'=',$this->id)
					->find_all();

				// For each row, recursively execute the delete_with_deps method
				foreach($orm_models as $orm_model)
				{
					$orm_model->delete_with_deps();
				}
			}
		}
	}

	public function getTableName()
	{
		return $this->_table_name;
	}
}
