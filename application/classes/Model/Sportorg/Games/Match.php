<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:57 PM
 */

class Model_Sportorg_Games_Match extends ORM
{
	
	protected $_table_name = 'game_matches';
	

	protected $_belongs_to = array(
		'game' => array(
			'model' => 'Sportorg_Games_Base',
			'foreign_key' => 'games_id'
		)
	);

	protected $_has_many = array(
		'players' => array(
			'model' => 'Sportorg_Games_Matchplayer',
			'foreign_key' => 'game_matches_id'
		),
	);

	public function getBasics()
	{
		return array(		
		 
			"game" => $this->game->getBasics()			
		);
	}

}