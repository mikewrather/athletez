<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 2/18/13
 * Time: 3:46 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Resume_Data_Profile extends ORM
{
	
	protected $_table_name = 'resume_data_profiles';

	protected $_has_many = array(
		'datagroups' => array(
			'model' => 'User_Resume_Data_Group',
			'through' => 'rdg_rdp_link',
			'foreign_key' => 'resume_data_profiles_id',
			'far_key' => 'resume_data_groups_id'
		),
		'sports' => array(
			'model' => 'Sportorg_Sport',
			'through' => 'rdp_sports_link',
			'foreign_key' => 'resume_data_profiles_id',
			'far_key' => 'sports_id'
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
			"name" => $this->name
		);
	}
	
	public function getDatagroups()
	{
		// get the data groups		 
		$datagroups = $this->datagroups;		
		return $datagroups;
	}
	
	public function getSports()
	{
		$sports = $this->sports;
		return $sports;
	}
	
	public function addLinksport($args = array())
	{
		extract($args); 
		$exists_obj = DB::select('*')
				->from('rdp_sports_link')				
					->where('resume_data_profiles_id','=',$resume_data_profiles_id)
					->and_where('sports_id', '=', $sports_id)->execute();
					
		 
		$count = count($exists_obj);		
		
		if ( $count == 0)
		{
			return DB::insert('rdp_sports_link', array('resume_data_profiles_id', 'sports_id'))->values(array($resume_data_profiles_id, $sports_id))->execute();	
		} else
		{			
			return $exists_obj;
		}				
			
	}

	public function addRdg($args = array())
	{
		extract($args);
		$exists_obj = DB::select('*')
				->from('rdg_rdp_link')				
					->where('resume_data_profiles_id','=',$resume_data_profiles_id)
					->and_where('resume_data_groups_id', '=', $resume_data_groups_id)->execute();
					
		 
		$count = count($exists_obj);		
		
		if ( $count == 0)
		{
			return DB::insert('rdg_rdp_link', array('resume_data_profiles_id', 'resume_data_groups_id'))->values(array($resume_data_profiles_id, $resume_data_groups_id))->execute();	
		} else
		{			
			return $exists_obj;
		}	
	}

	public function addRdp($args = array())
	{
		extract($args);
		// check exists 
		$exists_obj = $this->where('name', '=', $name);
		$exists_obj->reset(FALSE);
		$count = $exists_obj->count_all();
		
		if(isset($name))
		{
			$this->name = $name;			
		}
		
		try
		{
			if ( $count == 0)
			{
				$new_rdp = $this->save();
	 		 
				if(isset($sports_array))
				{
					$temp = explode(',',$sports_array);
					  
					foreach($temp as $sports_id)
					{	
						DB::insert('rdp_sports_link', array('resume_data_profiles_id', 'sports_id'))->values(array($new_rdp->id, $sports_id))->execute();
					}	
				}	
			} else
			{
				$new_rdp = $exists_obj->find();
			}				
		} catch(Exception $e)
		{
			// Create Array for Error Data
			$error_array = array(
				"error" => "Unable to save User",
				"desc" => $e->getMessage()
			);

			// Set whether it is a fatal error
			$is_fatal = true;

			// Call method to throw an error
			return $error_array;
		}		 
		
		return $new_rdp;
	}
}