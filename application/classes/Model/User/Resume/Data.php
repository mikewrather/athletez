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
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"resume_data_group" => $this->resume_data_group->getBasics(),
			"name" => $this->name,
			"resume_data_type" => $this->resume_data_type,
			"resume_data_groups_id" => $this->resume_data_groups_id
		);
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
		
		return $this->save();		
	}
	
	public function getListall($args = array())
	{
		extract($args);
		$resumedata = ORM::factory('User_Resume_Data')
		 		->join('rdg_rdp_link')->on('rdg_rdp_link.resume_data_groups_id', '=', 'user_resume_data.resume_data_groups_id')
				->where('user_resume_data.id', '=', $this->id);
				
		if ( isset($resume_data_groups_id) )
		{
			
			$resumedata->where('rdg_rdp_link.resume_data_groups_id', '=', $resume_data_groups_id );
		}
		
		if ( isset($resume_data_profiles) )
		{
			
			$resumedata->where('rdg_rdp_link.resume_data_profiles_id', '=', $resume_data_profiles );
		}
		
		return $resumedata; 
	}
	
	public function getVals()
	{
		return $this->datavals;
	} 
}