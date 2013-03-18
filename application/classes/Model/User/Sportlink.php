<?php defined('SYSPATH') or die('No direct script access.');
/**
 * USL or User Sport Link links up users with sports for sports that don't involve teams
 *
 * Date: 2/6/13
 * Time: 12:59 PM
 *
 * @author mike
 */

class Model_User_Sportlink extends ORM
{
	
	protected $_table_name = 'user_sport_link';

	protected $_belongs_to = array(
		'user' => array(
			'model' => 'User_Base',
			'foreign_key' => 'users_id'
		),
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		)
	);

	protected $_has_many = array(
		'gamelinks' => array(
			'model' => 'User_Sporlink_Gamelink',
			'foreign_key' => 'user_sport_link_id'
		),
		'games' => array(
			'model' => 'Sportorg_Game_Base',
			'through' => 'usl_game_link',
			'foreign_key' => 'user_sport_link_id',
			'far_key' => 'games_id'
		)
	);
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"user" => $this->user->getBasics(),
			"sport" => $this->sport->getBasics(),
			"sports_id" => $this->sports_id,
			"users_id" => $this->users_id,				
		);
	}

}