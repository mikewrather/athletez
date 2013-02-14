<?php

class View_Scrape_States
{
	public $title = "Scraping Data";
	protected $inputArr;

	public $sports = NULL;
	public $states = NULL;


	public function __construct($input)
	{

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
		$sports = ORM::factory('Scrape_Schoolteams')->group_by('mp_ssid')->find_all()->as_array('mp_ssid','mp_ssid');
		$retArr = array();
		foreach($sports as $sport)
		{
			$retArr[] = array('name'=>$sport);
		}
		return $retArr;
	}
}