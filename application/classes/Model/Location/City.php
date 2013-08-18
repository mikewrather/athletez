<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/6/13
 * Time: 12:39 PM
 */

class Model_Location_City extends ORM
{
	
	protected $_table_name = 'cities';

	public $error_message_path = 'models/location';

	protected $_belongs_to = array(
		'county' => array(
			'model' => 'Location_County',
			'foreign_key' => 'counties_id'
		),
		'state' => array(
			'model' => 'Location_State',
			'foreign_key' => 'states_id'
		),
	);

	protected $_has_many = array(
		'locations' => array(
			'model' => 'Location_Base',
			'foreign_key' => 'cities_id'
		)
	);

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),
			// county_id (int)
			'counties_id'=>array(
				array('not_empty'),
				array('digit'),
				array('checkCountyExists',array(':value'))
			),
		);
	}
	// end rules for Location_City

	
	public function getBasics($settings = array())
	{
		if(!$this->loaded()) return false;
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"county_id" => $this->counties_id,
			"county" => $this->county->getBasics(),
		);
	}

	public function addCity($args = array())
	{
		extract($args);

		if(isset($name))
		{
			$this->name = $name;
		}

		if(isset($counties_id))
		{
			$this->counties_id = $counties_id;
			$county = ORM::factory('Location_County',$counties_id);

			// Get State for County
			$this->states_id = $county->state->id;
		}

		if(isset($id)){
			$this->id = $id;
		}

		try
		{
			$this->save();
			return $this;
		}
		catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}

	/**
	 * @param array $args is an array of parameters to filter the games we are selecting
	 * @return $games DB::select object
	 */
	public function getGames($args = array())
	{

		extract($args);

		$games = DB::select('games.id')
			->from('games')
				->join('locations','LEFT')
					->on('games.locations_id','=','locations.id')
				->join('cities','LEFT')
					->on('locations.cities_id','=','cities.id')
				->where('cities.id','=',$this->id);
		$classes_arr['Location_Base'] = 'locations';
		$classes_arr['Location_City'] = 'cities';

		$games->where_open();
		$games->where('games.id','>','0'); //This is added to solve an error of AND () if no params are provided

		if(isset($games_before))
		{
			// Format as date
			$gameDay = date("Y-m-d",strtotime($games_before));
			$gameTime = date("H:i:s",strtotime($games_before));

			$games
				->and_where_open()
				->where('gameDay','<',$gameDay)
			//	->and_where('gameTime','<',$gameTime)
				->and_where_close();
		}
		// games_after
		if(isset($games_after))
		{
			// Format as date
			$gameDay = date("Y-m-d",strtotime($games_after));
			$gameTime = date("H:i:s",strtotime($games_after));

			$games
				->and_where_open()
				->where('gameDay','>',$gameDay)
			//	->and_where('gameTime','>',$gameTime)
				->and_where_close();
		}

		if(isset($sports_id) ||isset($complevels_id) || isset($teams_id))
		{
			// SET UP JOINS WE NEED FOR THESE TABLES
			$games
				->join('games_teams_link','LEFT')
				->on('games.id','=','games_teams_link.games_id')
				->join('teams','LEFT')
				->on('games_teams_link.teams_id','=','teams.id')
				->join('org_sport_link','LEFT')
				->on('teams.org_sport_link_id','=','org_sport_link.id');

			$classes_arr['Sportorg_Games_Teamslink'] = 'games_teams_link';
			$classes_arr['Sportorg_Team'] = 'teams';
			$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';
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
		//exclude itself
		$classes_arr['Sportorg_Games_Base'] = 'games';
		$games = ORM::_sql_exclude_deleted($classes_arr, $games);
		return $games;
	}

	/**
	 * @param array $args can be empty or hold:
	 * loc_type (location type)
	 *
	 * @return ORM the unexecuted ORM object with the query built
	 */
	public function getLocations($args = array())
	{
		$locations = $this->locations;
		if(isset($args['loc_type']))
		{
			$locations->where('location_type','=',$args['loc_type']);
		}
		//exclude itself
		$classes_arr['Location_Base'] = 'location_base';
		$locations = ORM::_sql_exclude_deleted($classes_arr, $locations);
		return $locations;
	}

	public function getOrgs()
	{
		$orgs = ORM::factory('Sportorg_Org')
			->join('locations','LEFT')
				->on('sportorg_org.locations_id','=','locations.id')
			->where('locations.cities_id','=',$this->id);
		$classes_arr['Location_Base'] = 'locations';

		//exclude itself
		$classes_arr['Sportorg_Org'] = 'sportorg_org';
		$orgs = ORM::_sql_exclude_deleted($classes_arr, $orgs);
		return $orgs;
	}

	public function getCities($args = array()){
		extract($args);
		$cities = ORM::factory("Location_City");
		if(isset($city_name))
			$cities->where('name', 'like', "%$city_name%");

		return $cities;
	}

	/** Jeffrey commented it, b/c currently no other functions use this function
	public function getCityIDFromName($args,$autoAdd=FALSE)
	{
		extract($args);
		if(empty($args["city"]) || empty($args['county']) || empty($args['state']))
		{
			return false;
		}


		$qry = DB::select(array('cities.id','cities_id'),array('states.id','state_id'),array('counties.id','county_id'))
			->from('cities')
			->join('counties','LEFT')
				->on('cities.county_id','=','counties.id')
			->join('states','LEFT')
				->on('counties.states_id','=','states.id')
			->where('cities.name','=',$args['city'])
			->and_where('counties.name','LIKE','%'.$args['county'].'%')
			->and_where('states.name','LIKE','%'.$args['state'].'%');

		$res = $qry->execute();

		print_r($res);
		print_r($res[0]);

		if($res->count()==1)
		{
			return array(
				"cities_id" => $res[0]['cities_id'],
			);
		}
		elseif($res->count>1)
		{
			return "More Than One Match Exists.";
		}
		else
		{
			if($autoAdd)
			{
				//add the city, county and state
			}
			else
			{
				return "No Matching Cities/Counties/States Exist.";
			}
		}
	}
	 * */
}