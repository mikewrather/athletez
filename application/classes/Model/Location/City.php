<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:39 PM
 */

class Model_Location_City extends ORM
{
	
	protected $_table_name = 'cities';


	protected $_belongs_to = array(
		'county' => array(
			'model' => 'Location_County',
			'foreign_key' => 'county_id'
		)
	);

	protected $_has_many = array(
		'locations' => array(
			'model' => 'Location_Base',
			'foreign_key' => 'cities_id'
		)
	);

	public function __construct()
	{
		parent::__construct();
	}
	
	public function getBasics()
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"county_id" => $this->county_id,
			"county" => $this->county->getBasics(),
		);
	}

	/**
	 * @param array $args is an array of parameters to filter the games we are selecting
	 * @return $games DB::select object
	 */
	public function getGames($args = array())
	{

		extract($args);

		$games = DB::select('*')
			->from('games')
				->join('locations','LEFT')
					->on('games.locations_id','=','locations.id')
				->join('cities','LEFT')
					->on('locations.cities_id','=','cities.id')
				->where('cities.id','=',$this->id);

		$games->where_open();

		// CHECK FOR PARAMETERS:
		// games_before
		// Filter games associated with a given city to only show those before a given date

		if($games_before != "")
		{
			// Format as date
			$gameDay = date("Y-m-d",strtotime($games_before));
			$gameTime = date("H:i:s",strtotime($games_before));

			$games
				->and_where_open()
				->where('gameDay','<',$gameDay)
				->and_where('gameTime','<',$gameTime)
				->and_where_close();
		}

		// games_after
		// Filter games associated with a given city to only show those before a given date

		if(isset($games_after))
		{
			// Format as date
			$gameDay = date("Y-m-d",strtotime($games_after));
			$gameTime = date("H:i:s",strtotime($games_after));

			$games
				->and_where_open()
				->where('gameDay','>',$gameDay)
				->and_where('gameTime','>',$gameTime)
				->and_where_close();
		}

		if(isset($sports_id) ||isset($complevels_id) || sset($teams_id))
		{
			// SET UP JOINS WE NEED FOR THESE TABLES
			$games
				->join('games_teams_link','LEFT')
				->on('games.id','=','games_teams_link.games_id')
				->join('teams','LEFT')
				->on('games_teams_link.teams_id','=','teams.id')
				->join('org_sport_link','LEFT')
				->on('teams.org_sport_link_id','=','org_sport_link.id');
		}
		// sports_id
		// Filter games associated with a given city to only show those for a specific sport

		if(isset($sports_id))
		{
			$games->where('org_sport_link.sports_id','=',$sports_id);
		}

		// complevels_id
		// Filter games associated with a given city to only show those of a specific competition level

		if(isset($complevels_id))
		{
			$games->where('teams.complevels_id','=',$complevels_id);
		}

		// teams_id
		// Filter games associated with a given city to only show those for a specific team

		if(isset($teams_id))
		{
			$games->where('teams.id','=',$teams_id);
		}

		$games->where_close();


		return $games;
	}
}