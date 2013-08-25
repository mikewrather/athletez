<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 3:41 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Data extends ORM
{
	
	protected $_table_name = 'resume_data';

	public $error_message_path = 'models/user/resume';

	protected $_belongs_to = array(
		'resume_data_group' => array(
			'model' => 'User_Resume_Data_Group',
			'foreign_key' => 'resume_data_groups_id'
		)
	);
	
	protected $_has_many = array(
		'datavals' => array(
			'model' => 'User_Resume_Data_Vals',
			'foreign_key' => 'resume_data_id'
		),
	);

	public function rules(){

		return array
		(
			// resume_data_groups_id (int)
			'resume_data_groups_id'=>array(
				array('not_empty'),
				array('digit'),
				array('resume_data_groups_id_exist'),
			),

			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// resume_data_type (enum)
			'resume_data_type'=>array(
				array('not_empty'),
				array('in_array', array(':value', array('number','string','time')))
			),
		);
	}

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(
			//'resume_data_group' => 'resume_data_groups_id'
		),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'resume_data_groups_obj' => 'resume_data_group'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function getBasics($settings = array())
	{
		return array(
			"id" => $this->id,
			"resume_data_group" => $this->resume_data_group->getBasics(),
			"name" => $this->name,
			"resume_data_type" => $this->resume_data_type,
			"resume_data_groups_id" => $this->resume_data_groups_id
		);

		return parent::getBasics();
	}
	
	public function updateResumedata($args = array())
	{
		extract($args);
		
		if ( isset($name) )
		{
			$this->name = $name;
		}
		
		if ( isset($resume_data_type) )
		{
			$this->resume_data_type = $resume_data_type;
		}

		if ( isset($resume_data_groups_id) )
		{
			$this->resume_data_groups_id = $resume_data_groups_id;
		}

		try{
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}
	
	public function getListall($args = array())
	{
		extract($args);
		$resumedata = ORM::factory('User_Resume_Data');
		if ( isset($resume_data_groups_id) || isset($resume_data_profiles)){
			$resumedata->join('rdg_rdp_link')->on('rdg_rdp_link.resume_data_groups_id', '=', 'user_resume_data.resume_data_groups_id');
		}

		$classes_arr['User_Resume_Data_Group_Profilelink'] = 'rdg_rdp_link';
		if ( isset($resume_data_groups_id) )
		{
			
			$resumedata->where('rdg_rdp_link.resume_data_groups_id', '=', $resume_data_groups_id );
		}
		
		if ( isset($resume_data_profiles) )
		{
			$resumedata->where('rdg_rdp_link.resume_data_profiles_id', '=', $resume_data_profiles );
		}
		//exclude itself
		$classes_arr['User_Resume_Data'] = 'user_resume_data';
		$resumedata = ORM::_sql_exclude_deleted($classes_arr, $resumedata);
		return $resumedata;
	}
	
	public function getVals($args = array())
	{
		extract($args);
		$dataVals = $this->datavals;
		if(isset($users_id)){
			$dataVals->where('users_id', '=', $users_id);
		}
		//exclude itself
		$classes_arr['User_Resume_Data_Vals'] = 'user_resume_data_vals';
		$dataVals = ORM::_sql_exclude_deleted($classes_arr, $dataVals);
		return $dataVals;
	}

	public function owner(){
		if(!$this->id){
			return "";
		}
		return intval($this->users_id);
	}

	public function is_owner($user){
		if (is_object($user)){
			return intval($user->id) == $this->owner();
		}else{
			return intval($user) == $this->owner();
		}
	}
}