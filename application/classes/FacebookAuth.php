<?php defined('SYSPATH') or die('No direct script access.');

class FacebookAuth extends Kohana_FacebookAuth {
	public function logout(){ $this->fb->destroySession(); }
}