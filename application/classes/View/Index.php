<?php

class View_Index
{
	public $title = "NewSite";

    public $testpath = "test"; //use test data
    //public $testpath = NULL;

    public function base_url() {
        return URL::base(true);
    }
}