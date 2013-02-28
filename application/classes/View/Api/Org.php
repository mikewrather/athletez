<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/26/13
 * Time: 2:05 AM
 *
 * @author: Mike Wrather
 *
 */

class View_Api_Org extends Api_Viewclass
{

	public function basics()
	{
		$retArr = array(
			'name' => $this->obj->main->name,
			'single_sport' => $this->obj->main->single_sport,
			'teams' => $this->teams()
		);
		return $retArr;
	}

	public function teams()
	{
		$retArr = array();
		foreach($this->obj->teams as $team)
		{
			$response = Request::factory('/api/team/basics/'.$team->id)->execute();
			$retArr[$team->id] = $response->body;
		}

		return $retArr;
	}

}