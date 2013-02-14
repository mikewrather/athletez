<?php

class View_Test
{
	public function states() {
		$states = ORM::factory('Scrape_School')->group_by('state')->find_all()->as_array('address','state');
		return $states;
	}


}