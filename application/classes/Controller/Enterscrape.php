<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 9/28/13
 * Time: 10:10 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Enterscrape extends Controller
{

	public function action_index()
	{

	}

	public function action_maxpreps()
	{
		$mpschools = DB::select()->from(array('temp.schools_maxpreps','mpschools'))
			->where('mpschools.univeral_highschool_id','IS NOT',NULL)
			->limit('5')
			->execute();

		print_r($mpschools);
		foreach($mpschools as $mps)
		{
			$teams = DB::select()->from(array('temp.school_maxpreps_teams','teams'))
				->where('teams.mp_school_id','=',$mps['mp_school_id'])
				->join(array('sportsdata.sports','sports'))->on('sports.ssid','=','teams.ssid')
				->execute();

			if($this->add_team_id()) //if team id add was successful or already done
			{
				foreach($teams as $team)
				{
					$athletez_team = ORM::factory('Sportorg_Team')
						->join('org_sport_link')->on('org_sport_link.teams_id','=','sportorg_team.id')
						->where('org_sport_link.orgs_id','=',$mps['univeral_highschool_id'])
						->and_where('org_sport_link.sports_id','=',$team['athletez_sports_id'])
						->and_where('sportorg_team.seasons_id','=',7)
						->find();

					if(!$athletez_team->loaded())
					{
						DB::insert()
					}
				}
			}
		}

	}

	private function add_team_id()
	{
		$fields = mysql_list_fields('temp','school_maxpreps_teams');
		$columns = mysql_num_fields($fields);
		for ($i = 0; $i < $columns; $i++) {$field_array[] = mysql_field_name($fields, $i);}

		if (!in_array('teams_id', $field_array))
		{
			if($result = DB::query(5,'ALTER TABLE temp.school_maxpreps_teams ADD teams_id INTEGER(11)')->execute())
			{
				return true;
			}
		}
		else
		{
			return true;
		}
	}
	
}