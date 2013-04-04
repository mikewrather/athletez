<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 3:42 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Data_Group extends ORM
{
	
	protected $_table_name = 'resume_data_groups';

	protected $_has_many = array(
		'resdata' => array(
			'model' => 'User_Resume_Data',
			'foreign_key' => 'resume_data_groups_id'
		),
		'profiles' => array(
			'model' => 'User_Resume_Data_Profile',
			'through' => 'rdg_rdp_link',
			'foreign_key' => 'resume_data_groups_id',
			'far_key' => 'resume_data_profiles_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"description" => $this->description,
		);
	}
	public function updateResumedataGroup($args = array())
	{
		extract($args);
		
		if ( isset($description))
		{
			$this->description = $description;
		}
		
		if ( isset($name) )
		{
			$this->name = $name;
		}
		return $this->save();		
	}
	
	public function deleteResumedataGroup()
	{
		return $this->delete();
	}
	
	public function addtordp($args = array())
	{
		extract($args);
		 
		if (isset($name))
		{	
			$temp = $this->where('name', '=', $name)->find();			 
			if ( $temp->loaded())
			{ 
				$new_rdg = $temp->getBasics();
				$resume_data_groups_id = $new_rdg['id'];				 
			} else
			{
				$this->name = $name;
				$resume_data_groups	= $this->save();
				$new_rdg = $resume_data_groups->getBasics();
				$resume_data_groups_id = $new_rdg['id'];						
			}
			
		} 
		
		$new_link = DB::insert('rdg_rdp_link', array('resume_data_profiles_id', 'resume_data_groups_id'))->values(array($resume_data_profiles_id, $resume_data_groups_id));
	 	try
		{
			$new_link->execute();			 
		} catch(Exception $e)
		{	
			// Create Array for Error Data
			$error_array = array(
				"error" => "Unable to save User",
				"desc" => $e->getMessage()
			);

			// Set whether it is a fatal error
			$is_fatal = true;
		}
		return $this;
	}
	public function getResumeprofile()
	{
		return $this->profiles;
	}
	
	public function getResumedata()
	{
		return $this->resdata;		
	}
}