<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 4:22 PM
 */

class Model_Sportorg_Position extends ORM
{
	
	protected $_table_name = 'positions';

	public $error_message_path = 'models/sportorg';

	protected $_belongs_to = array(
		'sport' => array(
			'model' => 'Sportorg_Sport',
			'foreign_key' => 'sports_id'
		),
		'stattab' => array(
			'model' => 'Stats_Tab',
			'foreign_key' => 'stattab_id'
		)
	);
	
	protected $_has_many = array(
		'utlposlink' => array(
			'model' => 'User_Teamslink_Positionslink',
			'foreign_key' => 'positions_id'
		)
	);

	public function rules(){

		return array
		(
			// name (varchar)
			'name'=>array(
				array('not_empty'),
			),

			// sports_id (int)
			'sports_id'=>array(
				array('not_empty'),
				array('sports_id_exist')
			),

			// stattab_id (int)
			'stattab_id'=>array(
				array('stat_tab_id_exist')
			),
		);
	}

	public function getBasics($settings)
	{
		return array(
			"id" => $this->id,
			"name" => $this->name,
			"sports_id" => $this->sports_id,
			"stattab_id" => $this->stattab_id,
			"stattab" => $this->stattab->getBasics(),
			"sport" => $this->sport->getBasics()
		);
	}
	
	public function getStattab($args = array())
	{
		extract($args);
		$stattab_model = ORM::factory("Stats_Tab");
		$stattab_model->join('positions')
			->on('stats_tab.id', '=', 'positions.stattab_id');

		$stattab_model->where('positions.id', '=', $id);
		$classes_arr = array(
			'Sportorg_Position' => 'positions',
			'Stats_Tab' => 'stats_tab'
		);
		$stattab_model = ORM::_sql_exclude_deleted($classes_arr, $stattab_model);
		//print_r($stattab_model->find_all());
		return $stattab_model;
	}

	public function getSport($args = array())
	{
		extract($args);
		$sport_model = ORM::factory("Sportorg_Sport");
		$sport_model->join('positions')
			->on('sportorg_sport.id', '=', 'positions.sports_id');
		$classes_arr = array(
			'Sportorg_Position' => 'positions',
			'Sportorg_Sport' => 'sportorg_sport'
		);
		$sport_model = ORM::_sql_exclude_deleted($classes_arr, $sport_model);

		$sport_model->where('positions.id', '=', $id);

		return $sport_model;
	}
		
	public function getMedia($args = array())
	{
		extract($args);
		$medias = ORM::factory('Media_Base')
				->join('positions')->on('positions.sports_id', '=', 'media_base.sports_id')
				->where('positions.id', '=', $this->id );

		$classes_arr = array(
			'Media_Base' => 'media_base',
			'Sportorg_Position' => 'positions',
		);
		// orgs_id 
		// Filter images to those for players who play a certain position within a specific organization.
		if(isset($orgs_id))
		{
			$medias->join('org_sport_link')->on('org_sport_link.sports_id', '=', 'positions.sports_id')
					->where('org_sport_link.orgs_id', '=', $orgs_id );
			$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';
		}
		// cities_id 
		// Filter images to players of a certain position within a certain city.
		if(isset($cities_id))
		{
			$medias->join('users')->on('users.id', '=', 'media_base.users_id')
					->where('users.cities_id', '=', $cities_id );
			$classes_arr['User_Base'] = 'users';
		}

		$medias = ORM::_sql_exclude_deleted($classes_arr, $medias);
		$arr = array();
		if ( $type == 'image'){
			foreach($medias->find_all() as $m){
				$arr[] = $m->image;
			}
		}
		else if($type == 'video') {
			foreach($medias->find_all() as $m){
				$arr[] = $m->video;
			}
		}
		$result = new stdClass();
		$result->result = $arr;
		return $result;
	}
	public function getListall($args = array())
	{
		extract($args);	
	//	$positions = ORM::factory('Sportorg_Position');

		$positions = DB::select()->from(array('positions','sportorg_position'));
		// sports_id 
		// Filter list of positions to a given sport.
		if(isset($sports_id))
		{ 
			$positions->where('sportorg_position.sports_id', '=', $sports_id);
		}
		// users_id 
		// Filter positions to a list of all positions for a given user
		if(isset($users_id))
		{
			$positions->join('org_sport_link')->on('org_sport_link.sports_id', '=', 'sportorg_position.sports_id');
			$positions->join('teams')->on('teams.org_sport_link_id', '=', 'org_sport_link.id');
			$positions->join('users_teams_link')->on('users_teams_link.teams_id', '=', 'teams.id');
			$positions->join('utl_position_link')->on('utl_position_link.users_teams_link_id', '=', 'users_teams_link.id');

			$positions->and_where_open()
				->where('users_teams_link.users_id', '=', $users_id)
				->and_where('utl_position_link.positions_id','=',DB::expr('sportorg_position.id'))
				->and_where_close();
			$classes_arr = array(
				'Sportorg_Orgsportlink' => 'org_sport_link',
				'Sportorg_Team' => 'teams',
				'User_Teamslink' => 'users_teams_link',
				'User_Teamslink_Positionlink' => 'utl_position_link'
			);
			$positions = ORM::_sql_exclude_deleted($classes_arr,$positions);
		}
		$positions = ORM::_sql_exclude_deleted(array('Sportorg_Position' => 'sportorg_position'), $positions);
		$positions->group_by('sportorg_position.id');
		return $positions;
	}
	
	public function getPlayers($args = array())
	{
		extract($args);
		$players = ORM::factory('User_Base')->distinct(TRUE)
						->join('user_sport_link')->on('user_sport_link.users_id', '=', 'user_base.id')
						->join('positions')->on('positions.sports_id', '=', 'user_sport_link.sports_id')
						->where('positions.id', '=', $this->id );
		$classes_arr = array(
			'Sportorg_Position' => 'positions',
			'User_Sportlink' => 'user_sport_link'
		);

		// orgs_id 
		// Filter the players for a given position to a specific organization
		if(isset($orgs_id))
		{
			$players->join('org_sport_link')->on('org_sport_link.sports_id', '=', 'positions.sports_id')
					->where('org_sport_link.orgs_id','=', $orgs_id);
			$classes_arr['Sportorg_Orgsportlink'] = 'org_sport_link';
		}
		// cities_id 
		// Filter the players for a given position to players within a certain city
		if(isset($cities_id))
		{
			$players->where('user_base.cities_id', '=', $cities_id );
		}

		$players = ORM::_sql_exclude_deleted($classes_arr, $players);
		return $players;
	}
	
	public function updatePosition($args = array())
	{
		extract($args);

		if(isset($name))
		{
			$this->name = $name;
		}
		
		if(isset($sports_id))
		{
			$this->sports_id = $sports_id;
		}
		
		if(isset($stattab_id))
		{
			$this->stattab_id = $stattab_id;
		}

		try{
			$this->update();
			return $this;
		} catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
	}
	
	public function addPosition($args=array())
	{
		extract($args);

		if(isset($name))
		{
			$this->name = $name;
		}
		
		if(isset($sports_id))
		{
			$this->sports_id = $sports_id;
		}
		
		if(isset($stattab_id))
		{
			$this->stattab_id = $stattab_id;
		}
		try{
			$this->save();
		}catch(ORM_Validation_Exception $e)
		{
			return $e;
		}
		return $this;
	}
}