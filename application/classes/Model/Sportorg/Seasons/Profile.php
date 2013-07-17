<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:59 PM
 */

class Model_Sportorg_Seasons_Profile extends ORM
{
	
	protected $_table_name = 'season_profiles';

	public $error_message_path = 'models/sportorg/seasons';

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
	
	public function getSeasons($args = array())
	{
		extract($args);
		$seasons = $this->seasons;

		$seasons->join("season_profiles", 'LEFT')
			->on('season_profiles.id', '=', 'sportorg_seasons_base.season_profiles_id');
		$classes_arr['Sportorg_Seasons_Profile'] = 'season_profiles';
		if (isset($orgs_id) && $orgs_id != ""){
			$seasons->join("orgs", 'LEFT')
				->on('orgs.season_profiles_id', '=', 'season_profiles.id');
			$seasons->where('orgs.id', '=', $orgs_id);
			$classes_arr['Sportorg_Org'] = 'orgs';
		}
		$seasons = ORM::_sql_exclude_deleted($classes_arr, $seasons);
		return $seasons;
	}

	public function getSeasons_as_array($args = array())
	{
		$seasons = ORM::factory('Sportorg_Seasons_Base')->where('season_profiles_id','=',$this->id)->find_all();
		foreach($seasons as $season)
		{
			$retArr[] = $season->getBasics();
		}
		return $retArr;
	}
	
	public function addSeasonprofile($name)
	{
		if(isset($name) && $name != "")
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