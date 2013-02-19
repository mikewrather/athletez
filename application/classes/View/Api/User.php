<?php defined('SYSPATH') or die('No direct script access.');

	/**
	 * $description
	 *
	 * Date: 2/18/13
	 * Time: 5:32 PM
	 *
	 * @author: Mike Wrather
	 *
	 */

class View_Api_User extends Viewclass
{

	public function basics()
	{
		return array(
			'username' => $this->obj->username,
			'email' => $this->obj->email,
			'logins' => $this->obj->logins,
			'last_login' => date('M jS, g:i a',$this->obj->last_login)
		);
	}


	public function teams()
	{
		$retArr = array();
		foreach($this->obj->teams->find_all() as $team)
		{
			$retArr[$team->id] = array(
				'org' => $team->orggbslink->org->name,
				'complevel' => $team->complevel->name,
				'season' => $team->season->name,
				'sport' => $team->orggbslink->gbslink->sport->name,
				'mascot' => $team->mascot
			);
		}
		return $retArr;
	}

	public function sports()
	{
		$retArr = array();
		$teams = $this->obj->teams->group_by('org_gbs_link_id')->find_all();
		foreach($teams as $team)
		{
			$sport = $team->getSport();
			$retArr[$sport->id] = array(
				'name' => $sport->name,
				'gender' => $sport->gender
			);
		}
		return $retArr;
	}

	public function orgs()
	{
		$retArr = array();
		$teams = $this->obj->teams->group_by('org_gbs_link_id')->find_all();
		foreach($teams as $team)
		{
			$retArr[$team->getOrg()->id] = $team->getOrg()->as_array();
		}
		return $retArr;
	}

	public function related()
	{

	}

	public function videos()
	{

	}

	public function images()
	{

}

public function comments()
{

}

}