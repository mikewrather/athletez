<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:56 PM
 */

class Model_Sportorg_Games_Base extends ORM
{
	
	protected $_table_name = 'games';

	protected $_belongs_to = array
	(
		'location' => array(
			'model' => 'Location_Base',
			'foreign_key' => 'locations_id'
		)
	);
	
	protected $_has_many = array
	(
		'matches' => array(
			'model' => 'Sportorg_Games_Match',
			'foreign_key' => 'games_id'
		),
		'teams' => array(
			'model' => 'Sportorg_Team',
			'through' => 'games_teams_link',
			'foreign_key' => 'games_id',
			'far_key' => 'teams_id'
		),
		'uslgamelink' => array(
			'model' => 'User_Sportlink_Gamelink',
			'foreign_key' => 'games_id'
		)
	);

	public function rules(){

		return array
		(
			/* TODO, below fields not exist in post add page,need set it's value manually.
			 * Use "correct_date_format" to check the origin date format
			 *
			// gameDay (date)
			'gameDay'=>array(
				array('not_empty'),
			),

			// gameTime (time)
			'gameTime'=>array(
				array('not_empty'),
			),
			*/
			// locations_id (int)
			'locations_id'=>array(
				array('not_empty'),
				array('not_equals', array(':value', 0))
			),
		);
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"locations_id" => $this->locations_id,
			"location" => $this->location->getBasics(),
			"gameDay" => $this->gameDay,
			"gameTime" => $this->gameTime,						
		);
	}

	public function name()
	{
		$name = "";
		$teams = $this->teams->find_all();
		foreach($teams as $team)
		{
			$name .= $team->name().", ";
		}
		return rtrim($name,', ');
	}

	public function addGame(){
		//TODO
	}
}