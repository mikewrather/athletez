<?php

class View_Index
{
	public $title = "NewSite";

    public function base_url() {
        return URL::base(true);
    }
}