<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 3/20/13
 * Time: 3:35 AM
 *
 * @author: Mike Wrather
 *
 */

class Admin_View_Postparams
{

	public $ent;
	public function __construct($entID)
	{
		$this->ent = ORM::factory('Codegen_Entlist',$entID);

	}

	public function methods()
	{
		$methods = $this->ent->apimethods->where('api_method','=','POST')->find_all();

		$siblings_arr = array();
		$entity_list = Ent::eFactORMList($this->ent->id)->find_all();


		foreach($entity_list as $entity)
		{
			//print_r($entity);
			$siblings_arr[] = array(
				"id" => $entity->id,
				"name" => method_exists($entity,'name') ? $entity->name() : $entity->name,
			);
		}

		$entity_data_for_methods = array(
			"siblings" => $siblings_arr,
			"hassiblings" => sizeof($siblings_arr) > 0 ? true : false,
		);

		$templateArr = array(
			"ent_id" => $this->ent->id,
			"entity_type" => $this->ent->name,
			"primary_class" => $this->ent->class_name,
			"desc" => $this->ent->description,
		);

		foreach($methods as $method)
		{
			$paramArr = array();
			$params = $method->params->find_all();
			foreach($params as $param)
			{
				$param_list_arr = array();
				if($param->enttypes_id > 0)
				{

					$list = Ent::getObjectList($param->enttypes_id)->find_all();
					foreach($list as $obj)
					{
						$param_list_arr[] = array(
							"id" => $obj->id,
							"name" => method_exists($obj,'name') ? $obj->name() : $obj->name,
						);
					}
				}
				$paramArr[] = array(
					"id" => $param->id,
					"name" => $param->param_name,
					"type" => $param->param_type,
					"desc" => $param->description,
					"objs" => $param_list_arr,
					"hasobjs" => sizeof($param_list_arr) > 0 ? true : false,
				);
			}

			$usage = '/api/'.$this->ent->api_name.'/'.$method->shortname.'/';

			$templateArr["method"][] = array(
				"id" => $method->id,
				"api_method" => $method->api_method,
				"shortname" => $method->shortname,
				"description" => $method->description,
				"usage" => $usage,
				"hasparams" => sizeof($params),
				"params" => $paramArr,
				"entdata" => $entity_data_for_methods,
			);

		}

	//	print_r($templateArr);
		return $templateArr;
	}
}