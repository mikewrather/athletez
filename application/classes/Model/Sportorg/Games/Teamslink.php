<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:56 PM
 */

class Model_Sportorg_Games_Teamslink extends ORM
{
	
	protected $_table_name = 'games_teams_link';

	protected $_belongs_to = array(
		'team' => array(
			'model'=>'Sportorg_Team',
			'foreign_key'=>'teams_id'
		),
		'game' => array(
			'model'=>'Sportorg_Games_Base',
			'foreign_key'=>'games_id'
		)
	);

	public function rules(){
		//TODO, add by Jeffrey
		return array(
//			'games_id' => array(
//				array(''),
//			),
//			'game_datetime' => array(
//				array(''),
//			),
//			'locations_id' => array(
//				array(''),
//			),
//			'home_team' => array(
//				array(''),
//			),
//			'tournaments_id' => array(
//				array(''),
//			),
		);
	}

	public function getBasics()
	{
		return array(
			"points_scored" => $this->points_scored,
			"points_against" => $this->points_against,
			"isWinner" => $this->isWinner,
			"teams_id" => $this->teams_id,
			"games_id" => $this->games_id,
			"is_home_team" => $this->is_home_team,
			"team" => $this->team->getBasics(),
			"game" => $this->game->getBasics()			
		);
	}
}