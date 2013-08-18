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

	public static function enttypes_is_deleted($enttypes_id, $subject_id){
		$deleted_model = DB::select('id')->from('deleted')->where('subject_enttypes_id' ,'=', $enttypes_id)
			->where('subject_id', '=', $subject_id);
		$result = $deleted_model->execute()->as_array();
		if (count($result) > 0){
			return true;
		}
		return false;
	}


	public static function _sql_exclude_deleted_abstract($class_names,$qry)
	{
		$enttypes = array();

		//print_r(get_class($qry));

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

	public function get_new_basics($show_basic_info_only = false){
		$classname = str_replace('Model_','',get_class($this));
		$deps = Kohana::$config->load('dependencies')->as_array();
		$its_foreign_keys = array();
		foreach($deps as $model => $related_model){
			if (array_key_exists($classname, $related_model)){
				$its_foreign_keys[] = $related_model[$classname];
			}
		}

		$columns = array_keys($this->table_columns());
		$results = array();
		foreach($columns as $column){
			$results[$column] = $this->{$column};
		}

		if ($show_basic_info_only){
			return $results;
		}

		if (empty($its_foreign_keys)){
			return $results;
		}

		$class_foreign_relationships = $its_foreign_keys;
		foreach(array_unique($class_foreign_relationships) as $id1){
			$class = Ent::getClassByID1($id1);
			if ($class){
				if (!$results[$id1]){
					$results[$id1.'_obj'] = null;
				}else{
					$model = ORM::factory($class, $results[$id1]);
					$results[$id1.'_obj'] = $model->get_new_basics();
				}
			}
		}
		return $results;
	}

	// This will force column name changes
	protected $get_basics_exceptions = array(
		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'sport_type_obj' => 'sport_type'
		),
		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(
			'voter_users_id' => 'users_id', //would be used in votes table
			'flagger_users_id' => 'users_id' //would be used in the flags table
		)
	);

	/**
	 * Mike's implementation of getBasics uses the id1 column of enttypes for recursion and
	 * loops through columns instead of dependencies config
	 *
	 * Features include protection against infinite recursion and the ability to override default column names.
	 * Also has the ability to shut off sub-object generation or exclude fields from being included
	 *
	 * @param $settings array - array that holds settings for the current getBasics call
	 * @return array
	 */
	public function getBasics($settings)
	{
		// Set defaults for settings ////////////////////////////////////////////////////////////////////////////
		// get_sub_objects, if set to false, will not attempt to generate objects for foreign key columns
		$settings['get_sub_objects'] = is_bool($settings['get_sub_objects']) ? $settings['get_sub_objects'] : TRUE;

		// exclude list can hold a list of columns to exclude from the results
		$settings['exclude_list'] = (is_array($settings['exclude_list']) && !empty($settings['exclude_list'])) ?
			$settings['exclude_list'] : array();

		$settings['return_enttypes_id'] = is_bool($settings['return_enttypes_id']) ? $settings['return_enttypes_id'] : TRUE;

		//////////////////////////////////////////////////////////////////////////////////////////////////////////

		//store enttype of this object
		$current_enttype = Ent::getMyEntTypeID($this);

		//add current enttype to list of types not to call in recursive calls
		$settings['called_entities'][] = $current_enttype;

		// Create return array variable and set the enttype ID of the current object
		$retArr = ($settings['return_enttypes_id'] === TRUE) ? array("enttypes_id" => $current_enttype) : array();

		// Loop through all columns
		foreach($this->table_columns() as $column=>$column_meta)
		{
			// This will use the '$get_basics_exceptions' property to alter the column's name if necessary
			// If that config array is empty just use the column name
			if(empty($this->get_basics_exceptions['column_name_changes'])) $column_key = $column;
			else // but if it's not empty than see if the current column name exists in that array's keys
			{
				// check if array key exists and if it does than use the alternate naming
				$column_key = array_key_exists($column,$this->get_basics_exceptions['column_name_changes']) ?
					$this->get_basics_exceptions['column_name_changes'][$column] : $column;
			}

			$retArr[$column_key] = $this->$column;

			// Allows us to turn off sub-objects
			if($settings['get_sub_objects'] === TRUE)
			{
				// Check that this is an integer and not a primary key (id) so we don't try to create an object out of a string
				if($column_meta['type'] == 'int' && $column_meta['key'] != 'PRI')
				{
					// Check for an alternative fk name and if one exists for this column use it
					$real_fk_name = (
						is_array($this->get_basics_exceptions['alternate_fk_names'])
						&& !empty($this->get_basics_exceptions['alternate_fk_names'])
						&& array_key_exists($column,$this->get_basics_exceptions['alternate_fk_names'])
					) ?	$this->get_basics_exceptions['alternate_fk_names'][$column] : $column;

					// Check if it exists as an id1 and if it does try to create an object from it.  If that fails then ignore the next section.
					if(is_object($sub_object = Ent::get_obj_for_fk_name($real_fk_name,(int)$this->$column))) //passes the column name and id of fk
					{
						//Set up the string we will use as the key
						$sub_obj_key = str_replace('_id','',$column).'_obj';

						// This will use the '$get_basics_exceptions' property to alter the column's name if necessary
						// The only difference between the one above is that we are using the constructed key name instead of the column name
						if(empty($this->get_basics_exceptions['column_name_changes'])) $sub_obj_key = $sub_obj_key;
						else
						{
							// check if array key exists and if it does than use the alternate naming
							$sub_obj_key = array_key_exists($sub_obj_key,$this->get_basics_exceptions['column_name_changes']) ?
								$this->get_basics_exceptions['column_name_changes'][$sub_obj_key] : $sub_obj_key;
						}

						//Check if current object type exists in the list of previously called entities
						$recursion_is_safe = !(in_array(Ent::getMyEntTypeID($sub_object),$settings['called_entities'])) ? TRUE : FALSE;

						// If there is no infinite recursion protection in place, call getBasics function
						// for this sub object, passing settings array down
						if($recursion_is_safe) $retArr[$sub_obj_key] = $sub_object->getBasics($settings);
					}
				}
			}
		}

		return $retArr;
	}

	public function delete($is_real_delete = false){

	}
}
