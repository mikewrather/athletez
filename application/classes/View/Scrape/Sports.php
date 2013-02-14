<?php

class View_Scrape_Sports
{
	public $title = "Scraping Data";
	protected $inputArr;

	public $sports = NULL;
	public $states = NULL;


	public function __construct($input)
	{
		$this->inputArr = $input;
		if(isset($input['state']))
		{

		}
	}

	public function states()
	{
		$states = ORM::factory('Scrape_School')->group_by('state')->find_all()->as_array('address','state');
		$retArr = array();
		foreach($states as $state)
		{
			$retArr[] = array('name'=>$state);
		}
		return $retArr;
	}
	public function sports()
	{
		$teams = ORM::factory('Scrape_Schoolteams');

		if(isset($this->inputArr['state'])) $teams->where('state','=',$this->inputArr['state']);

		$teams = $teams->group_by('mp_ssid')->find_all();
		$retArr = array();
		foreach($teams as $team)
		{
			$retArr[] = array('sport'=>$team->sport->sport,'gender'=>$team->sport->gender);
		}
		return $retArr;
	}

	public function teams()
	{

	}
}