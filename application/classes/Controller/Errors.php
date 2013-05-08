<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Errors extends Controller_Template {

	public function action_404()
	{
		//$this->response->body('<h1>Page not found</h1>');
		$this->template->content = View::factory('errors/404');
	}

}