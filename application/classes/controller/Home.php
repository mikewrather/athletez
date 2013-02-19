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

	public function action_get_index()
	{

	}

	public function action_post_index()
	{

		print_r($this->request);

	}

	public function action_put_index()
	{

		print_r($this->request);

	}

	public function action_delete_index()
	{

		print_r($this->request);

	}

	public function action_search_index()
	{

		print_r($this->request);

	}

	public function action_get_ent($etID=NULL)
	{
		$entID = (int)$this->request->param('id2') > 0 ? $this->request->param('id2') : NULL;
		$ent = Ent::eFact($this->request->param('id'),$entID);
		return array(
			"enttype"=>get_class($ent),
			"values"=>$ent->as_array()
		);
	}
}