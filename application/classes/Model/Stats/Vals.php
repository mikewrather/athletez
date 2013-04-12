<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 3/7/13
 * Time: 5:31 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Stats_Vals extends ORM
{
	
	protected $_table_name = 'statvals';
	

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'team' => array(
			'model' => 'Sportorg_Team',
			'foreign_key' => 'teams_id'
		),
		'game' => array(
			'model' => 'Sportorg_Games_Base',
			'foreign_key' => 'games_id'
		),
		'context' => array(
			'model' => 'Stats_Context',
			'foreign_key' => 'stat_contexts_id'
		),
		'stat' => array(
			'model' => 'Stats_Base',
			'foreign_key' => 'stats_id'
		)
	);

	public function rules(){

		return array
		(
			// stats_id (int)
			'stats_id'=>array(
				array('not_empty'),
				array('digit'),
				array('stat_id_exist'),
			),

			// users_id (int)
			'users_id'=>array(
				array('not_empty'),
				array('digit'),
				array('not_equals', array(':value', 0))
			),

			// teams_id (int)
			'teams_id'=>array(
				array('not_empty'),
				array('digit'),
				array('not_equals', array(':value', 0))
			),

			// statval (varchar)
			'statval'=>array(
				array('not_empty'),
			),

			// statdate (date)
			'statdate'=>array(
				array('not_empty'),
				array('date'),
			),

			// games_id (int)
			'games_id'=>array(
				array('not_empty'),
				array('digit'),
				array('not_equals', array(':value', 0))
			),

			// stat_contexts_id (int)
			'stat_contexts_id'=>array(
				array('not_empty'),
				array('digit'),
				array('stat_contexts_id_exist')
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
			"stat" => $this->stat->getBasics(),
			"stats_id" => $this->stats_id,
			"user" => $this->user->getBasics(),
			"users_id" => $this->users_id,
			"team" => $this->team->getBasics(),
			"teams_id" => $this->teams_id,	
			"game" => $this->game->getBasics(),
			"games_id" => $this->games_id,
			"context" => $this->context->getBasics(),
			"stat_contexts_id" => $this->stat_contexts_id,
			"statdate" => $this->statdate,
			"statval" => $this->statval,
		);
	}
	
    public static function check_statvals_exist($args= array())
    {
        extract($args);
        if( isset($stats_id) && 
            isset($users_id) && 
            isset($teams_id) && 
            isset($statval) &&
            isset($statdate) &&
            isset($games_id) &&
            isset($stat_contexts_id) )
        {            
            $exists_obj = ORM::factory('Stats_Vals')
                            ->where('stats_id', '=', $stats_id)
                            ->and_where('users_id', '=', $users_id)
                            ->and_where('teams_id', '=', $teams_id)
                            ->and_where('statval', '=', $statval)
                            ->and_where('statdate', '=', $statdate)
                            ->and_where('games_id', '=', $games_id)
                            ->and_where('stat_contexts_id', '=', $stat_contexts_id)
                            ->find();
            
             if (!$exists_obj->loaded())
                return true;
            else
                return false;  
        }else
        {
            return true;
        }   
    }
    
	public function addStatvals($args = array())
	{
		extract($args);
		$result = array();
		// stats_id - NOT NULL
		// The ID of the statistic
		if ( isset($stats_id))
		{
			$this->stats_id = $stats_id;
		}  
			
		// users_id - NOT NULL
		// The ID of the user we are adding the value for
		if ( isset($users_id))
		{
			$this->users_id = $users_id;
		} 
		
		// teams_id
		// The Team that this statistic is associated with
		if( isset($teams_id) )
			$this->teams_id = $teams_id;
		
		// statval - NOT NULL
		// The user's value
		if ( isset($statval))
		{
			$this->statval = $statval;
		} 
		
		// statdate 
		// The date that this statistic took place on
		if ( isset($statdate))
		{
			$this->statdate = $statdate;
		}
		
		// games_id
		// The game that this statistic refers to
		if ( isset($games_id))
		{
			$this->games_id = $games_id;
		}
		
		// stat_contexts_id
		// The ID of the context for this statistic
		if ( isset($stat_contexts_id) )
		{
			$this->stat_contexts_id = $stat_contexts_id;
		}
		
        try {         
            $this->save();
            return $this;
        } catch(ORM_Validation_Exception $e){
            return $e;
        } 		
	}
}