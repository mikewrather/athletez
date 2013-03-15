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
		)
	);


	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function getBasics()
	{
		return array(
			"user" => $this->user->getBasics(),
			"team" => $this->team->getBasics(),	
			"game" => $this->game->getBasics(),
			"context" => $this->context->getBasics(),
			"statdate" => $this->statedate,
			"statval" => $this->statval,
		);
	}
}