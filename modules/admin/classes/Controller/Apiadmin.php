<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 4/24/13
 * Time: 1:45 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Apiadmin extends AuthController
{


	public function action_index()
	{
	
	}

	public function action_addapimethod()
	{
		$this->populateAuthVars();
		if($this->is_admin)
		{

			$apimethod = ORM::factory('Codegen_Apimethod');
			$apimethod->entlist_id = $this->request->post('entlist_id');
			$apimethod->api_method = $this->request->post('method');
			$apimethod->shortname = $this->request->post('shortname');
			$apimethod->description = $this->request->post('description');
			$apimethod->save();



		}
		else return false;
	}

	public function action_addapiparam()
	{
		$this->populateAuthVars();
		if($this->is_admin)
		{

			$apimethod = ORM::factory('Codegen_Apiparams');
			$apimethod->apiaccess_id = $this->request->post('apiaccess_id');
			$apimethod->param_name = $this->request->post('param_name');
			$apimethod->param_type = $this->request->post('param_type');
			$apimethod->description = $this->request->post('description');
			$apimethod->enttypes_id = (int)$this->request->post('enttypes_id');
			$apimethod->save();

		}
		else return false;
	}
	
}