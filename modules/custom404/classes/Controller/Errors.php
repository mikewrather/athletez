<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Errors extends Controller {

	public function action_404()
	{
		$this->response->body('<h1>Page not found</h1>');
		//$this->request->response = View::factory('errors/404');
	}

}