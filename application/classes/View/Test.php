<?php

class View_Test
{
	public $name  = "mustache template test";

	public function taxed_value() {
		return $this->value - ($this->value * 0.4);
	}

	public function sports(){
		$sports = ORM::factory('Sportorg_Sport')->find_all();
		return $sports->as_array();
	}

	public function orgs(){
		$sports = ORM::factory('Sportorg_Org')->find_all();
		return $sports->as_array();
	}

}