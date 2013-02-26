<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/26/13
 * Time: 1:55 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Team extends Controller_Api_Base
{

	public function __construct($request, $response)
	{
		parent::__construct($request, $response);
		$this->mainModel = ORM::factory('Sportorg_Team');
		$this->popMainModel();
	}

	public function action_index()
	{

	}

}