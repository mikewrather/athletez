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
				array('sports_id_exist')
			),

			// stattab_id (int)
			'stattab_id'=>array(
				array('stat_tab_id_exist')
			),
		);
	}

	public function getBasics()
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

		return $stattab_model;
	}
	
	public function getSport($args = array())
	{
		extract($args);
		$stattab_model = ORM::factory("Sportorg_Sport");
		$stattab_model->join('positions')
			->on('sports.id', '=', 'positions.sport_id');

		$stattab_model->where('positions.id', '=', $id);

		return $stattab_model;
	}
		
	public function getMedia($args = array())
	{
		extract($args);
		$medias = ORM::factory('Media_Base')
				->join('positions')->on('positions.sports_id', '=', 'media_base.sports_id')
				->where('positions.id', '=', $this->id );
				
		// orgs_id 
		// Filter images to those for players who play a certain position within a specific organization.
		if(isset($orgs_id))
		{
			$medias->join('org_sport_link')->on('org_sport_link.sports_id', '=', 'positions.sports_id')
					->where('org_sport_link.orgs_id', '=', $orgs_id );
		}
		// cities_id 
		// Filter images to players of a certain position within a certain city.
		if(isset($cities_id))
		{
			$medias->join('users')->on('users.id', '=', 'media_base.users_id')
					->where('users.cities_id', '=', $cities_id );
		}	
		 
		if ( $type == 'image')
			return $medias->image;
		else if($type == 'video') {
			return $medias->video;
		}
	}
	public function getListall($args = array())
	{
		extract($args);	
		$positions = ORM::factory('Sportorg_Position')->distinct(TRUE)		
						->join('user_sport_link')->on('user_sport_link.sports_id', '=', 'sportorg_position.sports_id');						
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
			$positions->where('user_sport_link.users_id', '=', $users_id);
		}
		
		return $positions;
	}
	
	public function getPlayers($args = array())
	{
		extract($args);
		$players = ORM::factory('User_Base')->distinct(TRUE)
						->join('user_sport_link')->on('user_sport_link.users_id', '=', 'user_base.id')
						->join('positions')->on('positions.sports_id', '=', 'user_sport_link.sports_id')
						->where('positions.id', '=', $this->id );	
		
		// orgs_id 
		// Filter the players for a given position to a specific organization
		if(isset($orgs_id))
		{
			$players->join('org_sport_link')->on('org_sport_link.sports_id', '=', 'positions.sports_id')
					->where('org_sport_link.orgs_id','=', $orgs_id);
		}
		// cities_id 
		// Filter the players for a given position to players within a certain city
		if(isset($cities_id))
		{
			$players->where('user_base.cities_id', '=', $cities_id );
		}
		
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
		
		$this->save();
		return $this;
	}
}