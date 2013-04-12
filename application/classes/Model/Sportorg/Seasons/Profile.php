<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:59 PM
 */

class Model_Sportorg_Seasons_Profile extends ORM
{
	
	protected $_table_name = 'season_profiles';

	protected $_has_many = array(
		'seasons' => array(
			'model' => 'Sportorg_Seasons_Base',
			'foreign_key' => 'season_profiles_id',
		),
		'orgs' => array(
			'model' => 'Sportorg_Orgs',
			'foreign_key' => 'season_profiles_id'
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

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name
		);
	}
	
	public function deleteSeasonprofile()
	{
		return $this->delete();
	}
	
	public function getSeasons()
	{
		return $this->seasons;
	}
	
	public function addSeasonprofile($name)
	{
		if(isset($name))
		{
			$this->name = $name;
		}
		
         try {
          $this->save();
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        } 
	}
    
    public static function check_name_exist($name)
    {           
        if(!isset($name))
            return false;
            
        $exists_obj = ORM::factory('Sportorg_Seasons_Profile')->where('name','=', $name)->find();
                                                                                               
        if (!$exists_obj->loaded())
            return true;
        else
            return false;
    }
}