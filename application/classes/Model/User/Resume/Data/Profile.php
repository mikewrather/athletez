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

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),
		);
	}

	public function updateResumedataprofile($name)
	{
		$this->name = $name;
		return $this->save();
	}
	
	public function deleteResumedataprofile()
	{
		return $this->delete();
	}
	
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
				
        try {
            if ( isset($sports_id))
            {                     
                $new_rdp_sports_obj = DB::insert('rdp_sports_link', array('resume_data_profiles_id', 'sports_id'))->values(array($this->id, $sports_id))->execute();                    
            }  
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        }   
	}

    public static function check_sports_link_exist($args = array())
    {
        extract($args);
        $exists_obj = DB::select('*')
            ->from('rdp_sports_link')                
                ->where('resume_data_profiles_id','=',$resume_data_profiles_id)
                ->and_where('sports_id', '=', $sports_id)->execute();
        
        $count = count($exists_obj);        
        if ($count == 0)
            return true;
        else
            return false;
    }
    
    public static function check_rdg_rdp_link_exist($args = array())
    {
        extract($args);
        $exists_obj = DB::select('*')
                ->from('rdg_rdp_link')                
                    ->where('resume_data_profiles_id','=',$resume_data_profiles_id)
                    ->and_where('resume_data_groups_id', '=', $resume_data_groups_id)->execute();
                    
             
        $count = count($exists_obj);    
        if ($count == 0)
            return true;
        else
            return false;
    }
	public function addRdg($args = array())
	{		
		extract($args);
        try
        {
		    if ( isset($resume_data_groups_id))
		    {
                $new_rdg_rdp_link_obj = DB::insert('rdg_rdp_link', array('resume_data_profiles_id', 'resume_data_groups_id'))->values(array($resume_data_profiles_id, $resume_data_groups_id))->execute();    
		    } 		
			return $this;
		} catch(ORM_Validation_Exception $e){
            return $e;
        }  
	}
    
    public function rules()
    {
        return array(
            'name' => array(
                array('not_equals', array(':value', '')),
                array('not_empty'),
            )
        );
    }
    
	public function addRdp($args = array())
	{
		extract($args);
        //to check that the sport exists before adding the association
        $sports_ids = array();
        if(isset($sports_array))
        {
            // check exists             
            foreach($sports_array as $sports_id)
            {
                $check_sports_id = ORM::factory('Sportorg_Sport')->check_sports_id_exist($sports_id);
                if($check_sports_id)
                {
                    array_push($sports_ids, $sports_id);                    
                }
            }            
        }
        
		// check exists 
		if(isset($name))
		{
			$this->name = $name;			
		}
        
		try {
            $rdp_model = $this->save();
            $rdp_pk = $rdp_model->pk();
            foreach($sports_ids as $sports_id)
            {    
                DB::insert('rdp_sports_link', array('resume_data_profiles_id', 'sports_id'))->values(array($rdp_pk, $sports_id))->execute();
            }
            return $rdp_model;
        } catch(ORM_Validation_Exception $e){
            return $e;
        }    
	}
}