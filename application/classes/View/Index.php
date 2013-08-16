<?php

class View_Index
{
	public $title = "Athletez";

    public $testpath = NULL;

    public function base_url() {
        return URL::base(true);
    }
}