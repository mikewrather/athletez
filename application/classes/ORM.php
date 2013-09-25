<?php defined('SYSPATH') OR die('No direct script access.');

class ORM extends Kohana_ORM
{

	public $get_basics_obj; //this will hold the object that can be manipulated
	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public static function factory($model, $id = NULL)
	{
		$model = parent::factory($model,$id);
		return $model;
	}

	public function __construct($id = NULL)
	{
		parent::__construct($id);
		if(!is_object($this->get_basics_obj))
		{
			$this->populate_get_basics_obj();
		}
	}

	public function populate_get_basics_obj()
	{
		$this->get_basics_obj = new GetBasicsExceptions($this->get_basics_class_standards);
		return $this->get_basics_obj;
	}

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

		$qry->and_where_open();
		foreach($class_names as $class => $search_field)
		{
			if(is_object($search_field))
			{
				if($search_field->loaded())
				{

					$et_config = Kohana::$config->load('enttypes');
					$enttype = $et_config->get($search_field);
					if(is_array($enttype)) $search_field = $enttype['db_table'];
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

	public function phantom_delete($is_phantom_delete = true)
	{
		//do real delete
		if (!$is_phantom_delete){
			$this->real_delete($this);
		}else{

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

		}
		return;
	}

	public function delete_with_deps($is_phantom_delete = true)
	{
		$this->delete_deps($is_phantom_delete);
		$this->phantom_delete($is_phantom_delete); // this method will add the row to the deleted table
	}

	protected function delete_deps($is_phantom_delete)
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
					$orm_model->delete_with_deps($is_phantom_delete);
				}
			}
		}
	}

	public function restore_deleted_entity($enttypes_id, $subject_id){
		//TODO, add by Jeffrey, Need to delete recursively, DB::delete()
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
	public function getBasics($settings = array())
	{
		//get the current user for later use
		$logged_user = Auth::instance()->get_user();

		// Pulls the standard settings for this class
		$class_settings_arr = is_object($this->get_basics_obj) ? $this->get_basics_obj->getSettings() : $this->populate_get_basics_obj()->getSettings();

		// Set defaults for settings ////////////////////////////////////////////////////////////////////////////
		// get_sub_objects, if set to false, will not attempt to generate objects for foreign key columns
		$settings['get_sub_objects'] = is_bool($settings['get_sub_objects']) ? $settings['get_sub_objects'] : TRUE;

		// says whether to return the enttypes_id this object
		$settings['return_enttypes_id'] = is_bool($settings['return_enttypes_id']) ? $settings['return_enttypes_id'] : TRUE;

		// This counts how many levels deep we are on sub_object recursion.  adds 1 here.
		$settings['recursion_count'] = is_integer($settings['recursion_count']) ? $settings['recursion_count'] + 1 : 0;

		// Single Item allows us to retrieve the value for a single column.  here we check if it is a string (column name)
		$settings['single_item'] = is_string($settings['single_item']) ? $settings['single_item'] : FALSE;

		// Get whether to return vote / follow information for this item
		$settings['get_vote_and_follow'] = is_bool($settings['get_vote_and_follow']) ? $settings['single_item'] : TRUE;
		
		// exclude list can hold a list of columns to exclude from the results
		$class_settings_arr['exclude_columns'] = (is_array($class_settings_arr['exclude_columns']) && !empty($class_settings_arr['exclude_columns'])) ?
			$class_settings_arr['exclude_columns'] : array();

		//////////////////////////////////////////////////////////////////////////////////////////////////////////

		//store enttype of this object
		$current_enttype = Ent::getMyEntTypeID($this);

		// check settings to see if we can return vote and follow
		if($settings['get_vote_and_follow'])
		{
			//get whether logged user has cast a vote for this item
			$has_voted = Ent::has_voted($current_enttype,$this->id);

			//get whether logged user is following this item
			$is_following = Ent::is_follower($this);
		}

		//add current enttype to list of types not to call in recursive calls.  This will protect from infinite recursion.
		$settings['called_entities'][] = $current_enttype;

		// Create return array variable and set the enttype ID of the current object
		$retArr = ($settings['return_enttypes_id'] === TRUE) ? array("enttypes_id" => $current_enttype) : array();

		// if these vars are set it means the settings calls for it to be returned, so add them to return array
		if(isset($has_voted)) $retArr['has_voted'] = $has_voted;
		if(isset($is_following)) $retArr['is_following'] = $is_following;

		//check to see if the logged user is the owner of this object
		if($logged_user) $retArr['is_owner'] = (method_exists($this,'is_owner')) ? $this->is_owner($logged_user) : false;

		// Loop through all columns
		foreach($this->table_columns() as $column=>$column_meta)
		{
			// This will use the '$get_basics_exceptions' property to alter the column's name if necessary
			// If that config array is empty just use the column name
			// also check if array key exists and if it does than use the alternate naming
			$column_key = (
					!(empty($class_settings_arr['column_name_changes']))
				&&  array_key_exists($column,$class_settings_arr['column_name_changes'])
			) ? $class_settings_arr['column_name_changes'][$column] : $column;

			//Check if we just want a single item and if we do, only continue if this is the correct item *USES COLUMN KEY FROM ABOVE
			if($settings['single_item'] !== FALSE && $settings['single_item'] != $column_key && $settings['recursion_count'] == 0) continue;

			//Check if this key is manually excluded in the settings  *USES COLUMN KEY FROM ABOVE
			if(in_array($column_key,$class_settings_arr['exclude_columns'])) continue;

			// add this column's value to the return array
			$retArr[$column_key] = utf8_encode($this->$column);
		//	$retArr[$column_key] = $this->$column;

			// Allows us to turn off sub-objects when set to false
			if($settings['get_sub_objects'] === TRUE)
			{
				// Check that this is an integer and not a primary key (id) so we don't try to create an object out of a string or something
				if($column_meta['type'] == 'int' && $column_meta['key'] != 'PRI')
				{
					// Check for an alternative fk name and if one exists for this column use it
					$real_fk_name = (
							is_array($class_settings_arr['alternate_fk_names'])
						&&  !empty($class_settings_arr['alternate_fk_names'])
						&&  array_key_exists($column,$class_settings_arr['alternate_fk_names'])
					) ?	$class_settings_arr['alternate_fk_names'][$column] : $column;

					// Check if it exists as an id1 and if it does try to create an object from it.  If that fails then ignore the next section.
					if(is_object($sub_object = Ent::get_obj_for_fk_name($real_fk_name,(int)$this->$column))) //passes the column name and id of fk
					{
						//Set up the string we will use as the key
						$sub_obj_key = str_replace('_id','',$column).'_obj';

						// This will use the '$get_basics_exceptions' property to alter the column's name if necessary
						// check if array key exists and if it does than use the alternate naming
						$sub_obj_key = (
								!empty($class_settings_arr['column_name_changes'])
							&&  array_key_exists($sub_obj_key,$class_settings_arr['column_name_changes'])
						) ? $class_settings_arr['column_name_changes'][$sub_obj_key] : $sub_obj_key;


						//Check if current object type exists in the list of previously called entities
						$recursion_is_safe = !(in_array(Ent::getMyEntTypeID($sub_object),$settings['called_entities'])) ? TRUE : FALSE;

						// If there is no infinite recursion protection in place, call getBasics function
						// for this sub object, passing settings array down
						if($recursion_is_safe) $retArr[$sub_obj_key] = $sub_object->getBasics($settings);
						else $retArr[$sub_obj_key] = "recursion protection";
					}
				}
			}
		}

		// this section of code will add additional items that get their value from functions
		if(is_array($class_settings_arr['added_function_calls']) &&  !empty($class_settings_arr['added_function_calls']))
		{
			foreach($class_settings_arr['added_function_calls'] as $key_name => $callback)
			{
				// if the callback is an array then there are additional instructions to be parsed
				if(is_array($callback))
				{
					// Parse array into instructions
				}

				// If a function was provided, call that function and use the returned data
				if(method_exists($this,$callback)) $retArr[$key_name] = $this->$callback();

				// If a property name was passed, call that property and use the value
				elseif(property_exists($this,$callback)) $retArr[$key_name] = $this->$callback;

			}
		}

		return $retArr;
	}

	public function real_delete($obj){
		/*
			Not completed section

		//delete the enttypes rows related to delete obj.
		$classname = str_replace('Model_','',get_class($this));
		$enttypes_in_table_array = array(
			'Site_Vote', 'Site_View', 'Site_Tag', 'Site_Flag', 'User_Followers', 'Site_Feed', 'Site_Comment'
		);
		if (in_array($classname, $enttypes_in_table_array)){
			$enttypes_id = Ent::getMyEntTypeID($this);
			$model = ORM::factory($classname);
			$results = $model->where('subject_enttypes_id', '=', $enttypes_id)
				->where('subject_id', '=', $this->id)->find_all();
			if (!empty($results)){
				print_r($results);
				foreach($results as $result){
					echo "<br>====";
					print_r($result);
					echo "xxxxxx";
					$result->delete();
				}
			}
		}
		*/

		$obj->delete();
	}

}
