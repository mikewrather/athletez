<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Welcome extends Controller {

	public function action_index()
	{
		print_r(Auth::instance());
		$this->response->body('hello, world!');
	}

} // End Welcome
