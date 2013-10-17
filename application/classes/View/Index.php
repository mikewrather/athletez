<?php

class View_Index
{
	public $title = "Athletez - We Are Athletez";
    public $testpath = NULL;
	private $force_cdn = false;

    public function base_url() {
        return URL::base(true);

    }
	public function cdn(){
		return ($GLOBALS['env_globals']['use_cdn'] || $this->force_cdn) ? $GLOBALS['env_globals']['cdn_url'] : URL::base(true);
	}
	public function s3(){
		return ($GLOBALS['env_globals']['use_cdn'] || $this->force_cdn) ? $GLOBALS['env_globals']['s3_url'] : URL::base(true);
	}
}