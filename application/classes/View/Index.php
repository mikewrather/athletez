<?php

class View_Index
{
	public $title = "Title";

	public function teams()
	{

		$teams = ORM::factory('Sportorg_Team')->find_all();
		foreach($teams as $team)
		{
			$teamgames = $team->teamgames->find_all();
			foreach ($teamgames as $teamgame)
			{
				print_r($teamgame);
				$game = $teamgame->game;
				print_r($game);
				$matches = $game->matches->find_all();
				foreach($matches as $match)
				{
					print_r($match);
				}
			}

		}
	}

	public function hsTeams()
	{
		$hss = ORM::factory('Sportorg_Orgs_Highschool')->find_all();
		foreach($hss as $hs)
		{
		//	print_r($hs);
			$teamsarr = $hs->getTeams();
			foreach($teamsarr as $team)
			{
				echo $team->mascot;
				echo $team->orggbslink->org->name;
				echo $team->orggbslink->gbslink->govbody->name;
			}

		}
	}
}