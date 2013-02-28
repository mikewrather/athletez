<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 2/18/13
 * Time: 5:09 PM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Schools extends Controller_Api_Base
{

	public function __construct($request,$response)
	{
		parent::__construct($request,$response);

		//set main model to user
		if((int)$this->request->param('id') > 0)
		{
			$mm = ORM::factory('Highschool',$this->request->param('id'));
		}
		else
		{
			$mm = ORM::factory('Highschool');
		}

		$this->setMainModel($mm);
	}

	public function action_index()
	{

	}

//GET methods
	public function action_get_fulllist()
	{
		return $this->getDataFromView();
	}


}