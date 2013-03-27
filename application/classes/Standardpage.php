<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 3/27/13
 * Time: 1:35 AM
 *
 * @author: Mike Wrather
 *
 */

class Standardpage extends Controller
{

	public function action_index()
	{
		$renderer = Kostache::factory();
		$this->response->body($renderer->render(new View_Index));
	}

}