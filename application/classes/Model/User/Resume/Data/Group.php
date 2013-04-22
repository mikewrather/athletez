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

	public $error_message_path = 'models/user/resume/data';

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

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// description (varchar)
/*  I'm removing this chunk because the field doesn't exist in this table.
 * 			'resume_data_profiles_id'=>array(
				array('not_empty'),
				array('digit'),
				array('resume_data_profiles_id_exist'),
			),
*/
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

		try{
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}
	
	public function deleteResumedataGroup()
	{
		return $this->delete();
	}

	public function addToRdp($args = array())
	{
	   extract($args); 
       // add to the resumedata group table and get the resume_data_group_id 
       if(isset($name))                        
       {           
           $this->name = $name;              
       } 
       
       try
       {                
            $result = $this->getRDGIdByName($name);               
            
            if (!$result->loaded())
            {
                $this->save();
                $resume_data_groups_id = $this->pk();     
            }else
            {
                return $result;      
            } 
           
       }catch(ORM_Validation_Exception $e){           
            return $e;
       }                   
        // resume profile        
        try
        { 
              $new_link = DB::insert('rdg_rdp_link', array('resume_data_profiles_id', 'resume_data_groups_id'))->values(array($resume_data_profiles_id, $resume_data_groups_id));    
              $new_rdp = $new_link->execute();
              return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        } catch(Exception $e)
        {
            return $e;
        }
	}
     
    public function getRDGIdByName($name = null )
    {
        $result_obj = ORM::factory('User_Resume_Data_Group')
            ->select('id')
            ->where('name', '=', $name);
        return $result_obj->find();
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