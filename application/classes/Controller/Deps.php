<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 7/8/13
 * Time: 4:09 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Deps extends Controller
{

	public function action_index()
	{
	//	$media_item = ORM::factory('User_Base',424490);
	//	$media_item->delete_with_deps();

		$user = ORM::factory('User_Base',424322);
		$user->delete_with_deps(true);
	}

	public function action_orgs()
	{
		$items = ORM::factory('Sportorg_Org')->find_all();
		foreach($items as $item)
		{
			$item->delete_with_deps();
		}

	}

	public function action_schools()
	{
	/*	$qry = DB::select('*')->from('users_teams')->execute();
		foreach($qry as $team)
		{
			$osl = ORM::factory('Sportorg_Orgsportlink');
			$osl->orgs_id = $team['school_id'];
			$osl->sports_id = $team['sport_id'];
		//	print_r($osl);
			try{
				$osl->create();
			} catch (Exception $e){
				print_r($e);
			}


			if($osl->loaded())
			{
				$newteam = ORM::factory('Sportorg_Team');
				$newteam->org_sport_link_id = $osl->id;
				$newteam->complevels_id = $team['level_id'];
				$newteam->seasons_id = $team['seasons_id'];
				$newteam->year = $team['season_year'];
				$newteam->save();

				if($newteam->loaded())
				{
					$utl = ORM::factory('User_Teamslink');
					$utl->teams_id = $newteam->id;
					$utl->users_id = $team['user_id'];
					$utl->save();

					if($utl->loaded())
					{
						$utl_position = ORM::factory('User_Teamslink_Positionlink');
						$utl_position->users_teams_link_id = $utl->id;
						$utl_position->positions_id = $team['position_id'];
						$utl_position->is_primary = 1;
						$utl_position->save();

						if($utl_position->loaded()) print_r("Success \n");
					}
				}
			}
		}
	*/
	}
	
}