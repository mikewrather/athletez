<?php defined('SYSPATH') or die('No direct script access.');
/**
 * POG is Player of the Game
 *
 * @author Mike Wrather
 */

class Model_Site_Pog extends ORM
{
	
	protected $_table_name = 'player_of_game';

	protected $_belongs_to = array(
		'player' => array(
			'model' => 'User_Base',
			'foreign_key' => 'player_users_id'
		),
		'voter' => array(
			'model' => 'User_Base',
			'foreign_key' => 'voter_users_id'
		),
		'game' => array(
			'model' => 'Sportorg_Game_Base',
			'foreign_key' => 'games_id'
		)
	);


	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getBasics()
	{
		return array(
			"id" => $this->id,			
			"timePosted" => $this->timePosted,
			"player_users_id" => $this->player_users_id,
			"player" => $this->player->getBasics(),
			"voter_user_id" => $this->voter_user_id,
			"voter" => $this->voter->getBasics(),
			"game" => $this->game->getBasics(),
		);
	}
}