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

	public $get_basics_class_standards = array(

		// key = name of the column in the table, val = standard fk name that's used as id1
		'alternate_fk_names' => array(
			'player_users_id' => 'users_id',
			'voter_user_id' => 'users_id'
		),

		// key = current name of column, val = name getBasics will return
		'column_name_changes' => array(
			'player_users_obj' => 'player',
			'voter_user_obj' => 'voter',
			'games_obj' => 'game'
		),

		// key = the key that will appear in the returned results, val = the name of the function / property to invoke for the value
		'added_function_calls' => array(),

		// array of values only.  Each value is the name of a column to exclude
		'exclude_columns' => array(),
	);

	public function getBasics($settings = array())
	{
//		return array(
//			"id" => $this->id,
//			"timePosted" => $this->timePosted,
//			"player_users_id" => $this->player_users_id,
//			"player" => $this->player->getBasics(),
//			"voter_user_id" => $this->voter_user_id,
//			"voter" => $this->voter->getBasics(),
//			"game" => $this->game->getBasics(),
//		);
		return parent::getBasics($settings);
	}

	public function name(){
		return;
	}
}