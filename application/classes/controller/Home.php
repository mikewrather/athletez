<?php defined('SYSPATH') or die('No direct script access.');

/**
 * User: mike
 * Date: 2/8/13
 * Time: 2:35 PM
 */

class Controller_Home extends Controller
{

	public function action_index()
	{
		$renderer = Kostache::factory();
		$this->response->body($renderer->render(new View_Index));
	}

}