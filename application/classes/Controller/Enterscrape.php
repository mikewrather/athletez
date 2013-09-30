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
	
	protected $schema_name = 'temp';

	public function action_index()
	{

	}

	public function action_maxpreps()
	{

		set_time_limit(0);

		//put schedule ID in with index and then match it up to teams
//		$this->add_schedule_id_column();


		$mpschools = DB::select()->from(array($this->schema_name.'.schools_maxpreps', 'mpschools'))
			->where('mpschools.univeral_highschool_id', 'IS NOT', NULL)
			->limit('100')
			->execute();

		print_r($mpschools);

		$varsity = ORM::factory('Sportorg_Complevel_Base')
			->where('name', '=', 'Varsity')
			->where('complevel_profiles_id', '=', 1)
			->find();

		$this->add_schedule_id_column();

		//We need to add the teams_id column if it doesn't exist
		if ($this->add_team_id_columns() && $this->add_games_id_column() && $this->add_gtl_column()) //if team id add was successful or already done
		{
			$matching_schedule = DB::select('schedules_id')
				->from($this->schema_name.'.schedule_maxpreps')
				->where('mpteams.schedule_id','=',DB::expr($this->schema_name.'.schedule_maxpreps.id'));

			// Loop through and update with schedule IDs until it's done.
			$count=0;
			do{
				$count++;
				$update = DB::update(array($this->schema_name.'.schedule_maxpreps_teams','mpteams'))
					->set(array('mpteams.schedules_id'=>$matching_schedule))
					->where('mpteams.schedules_id','IS',null)
					->limit(100)
					->execute();

				print_r($update);
			} while($update > 0 && $count < 5000);


			foreach ($mpschools as $mps)
			{
				$teams = DB::select()->from(array($this->schema_name.'.school_maxpreps_teams', 'teams'))
					->where('teams.mp_school_id', '=', $mps['mp_school_id'])
					->where('teams.teams_id', 'IS',null)
					->join(array('sportsdata.sports', 'sports'))->on('sports.ssid', '=', 'teams.mp_ssid')
					->execute();

				foreach ($teams as $team)
				{

					if((int)$team['teams_id'] > 0)
					{
						echo "\n\nTEAM ID EXISTS ALREADY\n\n";
						mysql_select_db('athletesup_main');
						$athletez_team = ORM::factory('Sportorg_Team',$team['teams_id']);
					}
					else
					{
						mysql_select_db('athletesup_main');
						$athletez_team = ORM::factory('Sportorg_Team')
							->join('org_sport_link')->on('org_sport_link.id', '=', 'sportorg_team.org_sport_link_id')
							->where('org_sport_link.orgs_id', '=', $mps['univeral_highschool_id'])
							->and_where('org_sport_link.sports_id', '=', $team['athletez_sports_id'])
							->and_where('sportorg_team.seasons_id', '=', 7)
							->find();

						if (!$athletez_team->loaded())
						{
							echo "\n\nTEAM NOT LOADED\n\n";

							//check for org sport link
							$osl = ORM::factory('Sportorg_Orgsportlink')
								->where('orgs_id', '=', $mps['univeral_highschool_id'])
								->and_where('sports_id', '=', $team['athletez_sports_id'])
								->find();

							//if there is no osl yet create one
							if (!$osl->loaded())
							{
								echo "\n\nORG SPORT LINK NOT LOADED\n\n";
								$osl = ORM::factory('Sportorg_Orgsportlink');
								$osl->orgs_id = $mps['univeral_highschool_id'];
								$osl->sports_id = $team['athletez_sports_id'];
								$osl->save();
							}

							unset($athletez_team);
							//create the team
							$athletez_team = ORM::factory('Sportorg_Team');
							$athletez_team->org_sport_link_id = $osl->id;
							$athletez_team->seasons_id = 7;
							$athletez_team->complevels_id = $varsity->id;
							$athletez_team->year = '2012';
							$athletez_team->mascot = $team['mascot'];
							try{
								$athletez_team->create();
							}
							catch(ORM_Validation_Exception $e)
							{
								print_r($athletez_team);
								print_r($e->errors());
								die();
							}


						}

						DB::update($this->schema_name.'.school_maxpreps_teams')
							->set(array('teams_id'=>$athletez_team->id))
							->where($this->schema_name.'.school_maxpreps_teams.mp_school_id', '=', $mps['mp_school_id'])
							->where($this->schema_name.'.school_maxpreps_teams.mp_ssid','=',$team['mp_ssid'])
							->where($this->schema_name.'.school_maxpreps_teams.team', '=', $team['team'])
							->where($this->schema_name.'.school_maxpreps_teams.name','=',$team['name'])
							->execute();
					}


					//match team ID to the team ID in schedule/team table
					$update_team_schedule = DB::update($this->schema_name.'.schedule_maxpreps_teams')
						->set(array('teams_id'=>$athletez_team->id))
						->where('mp_school_id','=',$team['mp_school_id'])
						->where('mp_ssid','=',$team['mp_ssid'])
						->execute();

					echo "\n\nRows Updated: " . $update_team_schedule."\n\n";

					$tgl = DB::select()->from($this->schema_name.'.schedule_maxpreps_teams')
						->join($this->schema_name.'.schedule_maxpreps')->on($this->schema_name.'.schedule_maxpreps_teams.schedules_id','=',$this->schema_name.'.schedule_maxpreps.schedules_id')
						->where($this->schema_name.'.schedule_maxpreps_teams.teams_id','=',$athletez_team->id)
					//	->where($this->schema_name.'.schedule_maxpreps.games_id','IS',NULL)
						->execute();

					print_r($tgl);

					foreach($tgl as $link)
					{
						if($link['games_id'])
						{
							$games_id = $link['games_id'];
						}
						else
						{
							$fields = array(
								'gameDay',
								'gameTime',
								'location_string'
							);
							$vals = array(
								date('Y-m-d',strtotime($link['gameTime'])),
								date('H:i:s',strtotime($link['gameTime'])),
								$link['loc']
							);

							$res = DB::insert('games',$fields)
								->values($vals)
								->execute();

							print_r($res);
							$games_id = $res[0];

							//update mp table with athletez games ID
							DB::update($this->schema_name.'.schedule_maxpreps')
								->set(array('games_id'=>$games_id))
								->where($this->schema_name.'.schedule_maxpreps.schedules_id','=',$link['schedules_id'])
								->execute();
						}

						//insert gtl
						$gtl = ORM::factory('Sportorg_Games_Teamslink')
							->where('games_id','=',$games_id)
							->where('teams_id','=',$athletez_team->id)
							->find();

						if(!$gtl->loaded())
						{
							unset($gtl);
							$gtl = ORM::factory('Sportorg_Games_Teamslink');
							$gtl->games_id = $games_id;
							$gtl->teams_id = $athletez_team->id;
							$gtl->points_scored = $link['points_scored'];
							$gtl->score = $link['points_scored'];

							try{
								$gtl->create();
							}
							catch(ORM_Validation_Exception $e)
							{
								print_r($gtl);
								print_r($e->errors());
								die();
							}

							//add athletez gtl reference to mp gtl
							DB::update($this->schema_name.'.schedule_maxpreps_teams')
								->set(array('gtl_id'=>$gtl->id))
								->where($this->schema_name.'.schedule_maxpreps_teams.schedules_id','=',$link['schedules_id'])
								->where($this->schema_name.'.schedule_maxpreps_teams.teams_id','=',$link['teams_id'])
								->execute();

						}
					}
				}
			}

		}

	}

	private function add_team_id_columns()
	{
		if( $this->add_new_col_with_check('temp','school_maxpreps_teams','teams_id') &&
			$this->add_new_col_with_check('temp','schedule_maxpreps_teams','teams_id')) return true;
		return false;
	}

	private function add_games_id_column()
	{
		return (
			$this->add_new_col_with_check('temp','schedule_maxpreps','games_id') &&
			$this->add_new_col_with_check('temp','schedule_maxpreps_teams','schedules_id')
		);
	}

	private function add_gtl_column()
	{
		return (
			$this->add_new_col_with_check('temp','schedule_maxpreps_teams','gtl_id')
		);
	}

	private function add_schedule_id_column()
	{
		if($this->add_new_col_with_check('temp','schedule_maxpreps','schedules_id','',true))
		{
			mysql_select_db($this->schema_name);
			DB::query(5,"ALTER TABLE schedule_maxpreps
ADD COLUMN schedules_id  int(11) NOT NULL AUTO_INCREMENT AFTER loc,
DROP PRIMARY KEY,
ADD PRIMARY KEY (schedules_id),
ADD UNIQUE INDEX schedule (schedules_id) USING BTREE ;
")->execute();


			return true;
		}
		return true;
	}

	private function add_new_col_with_check($schema,$table,$column,$type='INTEGER(11)',$check_only=false)
	{
		$fields = mysql_list_fields($schema,$table);
		$columns = mysql_num_fields($fields);
		for ($i = 0; $i < $columns; $i++)
		{
			$field_array[] = mysql_field_name($fields, $i);
		}

		if (!in_array($column, $field_array))
		{
			if($check_only) return true;
			if ($result = DB::query(5, 'ALTER TABLE ' . $schema . '.' . $table . ' ADD ' . $column . ' ' . $type)->execute())
			{
				return true;
			}
		} else
		{
			if($check_only) return false;
			return true;
		}
	}

}