<?php defined('SYSPATH') or die('No direct script access.');
/**
 * USL Game Link links the user/sport link to specific game events
 *
 * Date: 2/17/13
 * Time: 2:22 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_User_Sportlink_Gamelink extends ORM
{
	
	protected $_table_name = 'usl_game_link';
	

	protected $_belongs_to = array(
		'usl' => array(
			'model' => 'User_Sportlink',
			'foreign_key' => 'user_sport_link_id'
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
			"usl" => $this->usl->getBasics(),
			"game" => $this->game->getBasics(),
			"result_time" => $this->result_time,
			"isWinner" => $this->isWinner,
			"games_id" => $this->games_id,
			"user_sport_link_id" => $this->user_sport_link_id
		);
	}

}