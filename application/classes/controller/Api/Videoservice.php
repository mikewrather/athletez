<?php
/**
 * $description
 *
 * Date: 2/26/13
 * Time: 1:34 AM
 *
 * @author: Mike Wrather
 *
 */
class Controller_Api_Videoservice extends Controller_Api_Base
{

	public function __construct($request,$response)
	{
		parent::__construct($request,$response);

		$this->mainModel = ORM::factory('Media_Videoservice');
		$this->popMainModel();
	}

	public function action_get_basics()
	{
		$this->payloadDesc = "Basic info on video service provider.";
		return $this->getDataFromView();
	}

}