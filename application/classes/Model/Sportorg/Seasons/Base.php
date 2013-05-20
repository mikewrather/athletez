<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:59 PM
 */

class Model_Sportorg_Seasons_Base extends ORM
{
	
	protected $_table_name = 'seasons';

	public $error_message_path = 'models/sportorg/seasons';

	protected $_belongs_to = array(
		'seasonprofile' => array(
			'model' => 'Sportorg_Seasons_Profile',
			'foreign_key' => 'season_profiles_id'
		)
	);
	protected $_has_many = array(
		'teams' => array(
			'model' => 'Sportorg_Team',
			'foreign_key' => 'seasons_id'
		),
		'statvals' => array(
			'model' => 'Stats_Vals',
			'foreign_key' => 'seasons_id'
		)
	);
    
     public function rules(){

        return array
        (
            // name (varchar)
            'name'=>array(
                array('not_empty'),
            ),

            // season_profiles_id (int)
            'season_profiles_id'=>array(
                array('not_empty'),
                array('season_profiles_id_exist')
            ),
        );
     }
 

    public static function check_season_exist($args = array())
    {
        extract($args);
        if(isset($name) && isset($season_profiles_id))
        {
            $exists_obj = ORM::factory('Sportorg_Seasons_Base')
                        ->where('name','=', $name)
                        ->and_where('season_profiles_id','=', $season_profiles_id)->find();    
             if (!$exists_obj->loaded())
                return true;
            else
                return false;    
        }else
        {
            return true;
        }      
    }
    
    public function addSeasons($args = array())
    {
        extract($args);
        
        //name (string) - Name of the Season to add
        if(isset($name))
        {
            $this->name = $name;
        }
        // season profiles id
        if(isset($season_profiles_id))
        {
            $this->season_profiles_id = $season_profiles_id;
        }
        
        try {         
            $this->save();
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        }  
    }

	public function getBasics()
	{
		return array(
			"season_id" => $this->id,
			"seasonprofile" => $this->seasonprofile->getBasics(),			 
			"season_name" => $this->name,
			"season_profiles_id" => $this->season_profiles_id,
		);
	}
	
	public function getTeams($args = array())
	{
		extract($args);
		$teams = $this->teams;
		
		//$teams->where_open();
		// complevels_id
		// Filter teams for a certain season to only show those for a specific competition level
		if ( isset($complevels_id))
		{ 
			$orgs = $teams->where('complevels_id', '=', $complevels_id);
			
		} else
        {
            $orgs = $teams;
        } 	
		$orgs->join('org_sport_link')->on('org_sport_link.id', '=', 'sportorg_team.org_sport_link_id');	
		// orgs_id
		// Filter teams for a certain season to only show those for a specific organization
		if ( isset($orgs_id) )
		{
			$orgs->where('org_sport_link.orgs_id', '=', $orgs_id); 
		}		
		
		// sports_id
		// Filter teams for a certain season to only show those for a specific sport
		if ( isset($sports_id) )
		{
			$orgs->where('org_sport_link.sports_id', '=', $sports_id);			
		}
		
		$orgs->join('orgs')->on('orgs.id', '=', 'org_sport_link.orgs_id');
		// divisions_id
		// Filter teams for a certain season to only show those for a specific division
		if ( isset( $divisions_id ) )
		{
			$orgs->where('orgs.divisions_id', '=', $divisions_id);
		}
		if (isset($leagues_id) || isset($sections_id) || isset($states_id))
			$orgs->join('leagues')->on('leagues.id', '=', 'orgs.leagues_id');
		// leagues_id
		// Filter teams for a certain season to only show those for a specific league
		if ( isset($leagues_id) )
		{
			$orgs->where('orgs.leagues_id', '=', $leagues_id);
		}
		
		// sections_id
		// Filter teams for a certain season to only show those for a specific section
		if ( isset($sections_id) )
		{
			$orgs->where('leagues.sections_id', '=', $sections_id);
		}
		
		// states_id 
		// Filter teams for a certain season to only show those for a specific state
		if ( isset($states_id) )
		{
			$orgs->where('leagues.states_id', '=', $states_id);
		}
		return $teams;
	}
	
}