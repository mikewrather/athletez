<?php defined('SYSPATH') or die('No direct script access.');

/**
 * $description
 *
 * Date: 3/7/13
 * Time: 12:53 AM
 *
 * @author: Mike Wrather
 *
 */

class Controller_Codegen extends Controller
{

	public function action_index()
	{

	}

	public function action_genfiles()
	{


		$baseDir = "C:/xampp/htdocs/k3/application/classes/";
		//generate the api controllers

		$el = ORM::factory('Codegen_Entlist')->find_all();
		foreach($el as $ent)
		{
			echo $ctr_fn = $baseDir."Controller/Api/".ucwords($ent->entity_type).".php";

			if(file_exists($ctr_fn)) echo " FILE EXISTS!!!\n\n";
			else
			{
				echo "\n";
				echo $ctr_content = $this->generateController($ent);
				echo "\n\n";
			}



			echo $view_fn = $baseDir."View/Api/".ucwords($ent->entity_type).".php";
			if(file_exists($view_fn)) echo " FILE EXISTS!!!\n\n";
			else
			{
				echo $ctr_content = $this->generateView($ent);
				echo "\n";
				echo "\n\n";
			}

		}
	}

	/**
	 * generateController generates an API controller
	 *
	 * @param $ent
	 * @return string
	 */
	private function generateController($ent)
	{
		$filecontents = '
	class Controller_Api_'.ucfirst($ent->entity_type).' extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory(\''.$ent->primary_class.'\'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	';

		$filecontents.= '
		//GET methods

		';

		$methods = $ent->apimethods->where('api_method','=','GET')->find_all();
		foreach($methods as $method)
		{

			$filecontents.= '
		/**
		 * action_'.strtolower($method->api_method).'_'.$method->shortname.'() '.$method->description.'
		 *
		 */
		public function action_'.strtolower($method->api_method).'_'.$method->shortname.'()
		{
			$this->payloadDesc = "'.$method->description.'";
		}
		';

		}

		$methods = $ent->apimethods->where('api_method','=','GET')->find_all();
		$filecontents.= '
		//POST methods

		';

		foreach($methods as $method)
		{
			$filecontents.= '
		/**
		 * action_'.strtolower($method->api_method).'_'.$method->shortname.'() '.$method->description.'
		 *
		 */
		public function action_'.strtolower($method->api_method).'_'.$method->shortname.'()
		{
			$this->payloadDesc = "'.$method->description.'";
		}
		';

		}

		$filecontents .= '
	}';

		return $filecontents;


	}

	/**
	 * generateView generates an API view
	 *
	 * @param $ent
	 * @return string
	 */
	private function generateView($ent)
	{
		$filecontents = '
	class View_Api_'.ucfirst($ent->entity_type).' extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	';

		$methods = $ent->apimethods->group_by('shortname')->find_all();
		foreach($methods as $method)
		{

			$filecontents.= '
		/**
		 * '.$method->shortname.'() '.$method->description.'
		 *
		 * @retun array
		 */
		public function '.$method->shortname.'()
		{
			$retArr = array(

			);

			return $retArr;
		}
		';

		}


		$filecontents .= '
	}';

		return $filecontents;


	}
}