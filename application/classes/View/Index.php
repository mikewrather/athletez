<?php

class View_Index
{
	public $title = "NewSite";

    //public $live = true; // use live data
    public $live = false; // use test date

    public function base_url() {
        return URL::base(true);
    }
}