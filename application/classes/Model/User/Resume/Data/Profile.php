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

	public $error_message_path = 'models/user/resume/data';

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
		),
		'positions' => array(
			'model' => 'Sportorg_Position',
			'through' => 'rdp_sports_link',
			'foreign_key' => 'resume_data_profiles_id',
			'far_key' => 'positions_id'
		),
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
		try{
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
	public function getBasics($settings = array())
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
		$classes_arr = array('User_Resume_Data_Group' => 'user_resume_data_group');
		//exclude itself
		$datagroups = ORM::_sql_exclude_deleted($classes_arr, $datagroups);
		return $datagroups;
	}
	
	public function getSports()
	{
		$sports = $this->sports;

		$classes_arr = array('Sportorg_Sport' => 'sportorg_sport');
		//exclude itself
		$sports = ORM::_sql_exclude_deleted($classes_arr, $sports);
		return $sports;
	}

	public function getPositions()
	{
		$positions = $this->positions;
		return $positions;
	}

	/**
	 * This method retrieves a list of resume data profiles for a given user.
	 * It can return either the DB result (res) or a fully populated array.
	 *
	 * This method relies on the getPositions and getSports methods of the
	 * user class.
	 *
	 * @param user_model $user
	 * @param string $format is either res or something else.
	 * @return array|object depending on format
	 */
	public function getRDPForUser($user,$format='res')
	{
		//get positions for user
		$pos_arr = $user->getPositions();

		//get sports for user
		$sports_arr = $user->getSports('array');

		//select profiles and sports
		$qry = DB::select()->from('rdp_sports_link')
			->where_open();

		if(sizeof($pos_arr) > 0)
		foreach($pos_arr as $positions_id => $position)
		{
			$qry->or_where('positions_id','=',$positions_id);
		}
		$qry->where_close()->or_where_open();

		if(sizeof($sports_arr) > 0)
			foreach($sports_arr as $sports_id => $sport)
			{
				$qry->or_where('sports_id','=',$sports_id);
			}
		$res = $qry->or_where_close()->execute();

		if($format=='res') return $res;

		$rdps = array();
		foreach($res as $rs)
		{
			$rdp = ORM::factory('User_Resume_Data_Profile',$rs['resume_data_profiles_id']);
			if($rdp->loaded()) $rdps[$rdp->id] = $rdp;
		}

		return $rdps;
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
                $check_sports_id = ORM::factory('Sportorg_Sport',$sports_id);
                if($check_sports_id->loaded())
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