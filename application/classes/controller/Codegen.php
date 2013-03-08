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


		$baseDir = "C:/xampp/htdocs/k3/application/classes/Test/";
		//generate the api controllers

		$el = ORM::factory('Codegen_Entlist')->find_all();
		foreach($el as $ent)
		{
			echo $ctr_fn = $baseDir."Controller/Api/".ucwords($ent->entity_type).".php";

			if(file_exists($ctr_fn)) echo " FILE EXISTS!!!\n\n";
			else
			{
				$handle = fopen($ctr_fn,"a+");
				fwrite($handle,$this->generateController($ent));
				fclose($handle);
			}

			echo "\n";

			echo $view_fn = $baseDir."View/Api/".ucwords($ent->entity_type).".php";
			if(file_exists($view_fn)) echo " FILE EXISTS!!!\n\n";
			else
			{
				$handle = fopen($view_fn,"a+");
				fwrite($handle,$this->generateView($ent));
				fclose($handle);
			}

			echo "\n\n";
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
		$filecontents = '<?php defined(\'SYSPATH\') or die(\'No direct script access.\');

/**
 * '.ucfirst($ent->entity_type).' API controller class
 *
 * Date: Auto-generated on '.date('M jS, Y g:i a').'
 *
 * @author: Mike Wrather
 *
 */

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
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

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
		';

			$params = $method->params->find_all();
			foreach($params as $param)
			{

				if($param->param_type=='int')
				{
					$existence_check = " > 0";
				}
				else
				{
					$existence_check = ' != ""';
				}
				if($param->param_req){ $filecontents.= '        //Required Param'; }

					$filecontents.= '
			if($this->request->query(\''.$param->param_name.'\')'.$existence_check.')
			{

			}
';

			}

			$filecontents.='
		}
		';

		}

		$methods = $ent->apimethods->where('api_method','=','POST')->find_all();
		$filecontents.= '
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

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
		$filecontents = '<?php defined(\'SYSPATH\') or die(\'No direct script access.\');

/**
 * '.ucfirst($ent->entity_type).' API View class
 *
 * Date: Auto-generated on '.date('M jS, Y g:i a').'
 *
 * @author: Mike Wrather
 *
 */

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


	public function action_gendocs()
	{




		$el = ORM::factory('Codegen_Entlist')->find_all();
		foreach($el as $ent)
		{
			echo $this->generatedocs($ent);
		}
	}

	/**
	 * generateController generates an API controller
	 *
	 * @param $ent
	 * @return string
	 */
	private function generateDocs($ent)
	{
		$docstr = '

***********************************************************************
Model Code:     '.$ent->entity_type.'
Primary Class:  '.$ent->primary_class;


		$methods = $ent->apimethods->find_all();

		foreach($methods as $method)
		{
			$docstr.= '

		HTTP:           '.$method->api_method.'
		Name:           '.$method->shortname.'
		Usage:          /api/'.$ent->entity_type.'/'.$method->shortname.'/{id}
		Description:    '.$method->description;

			$params = $method->params->find_all();
				if($params->count()) $docstr.= "
		Parameters:";
			foreach($params as $param)
			{

				$docstr.= '

			'.$param->param_name.' ('.$param->param_type.')
			'.$param->description;

			}

		}

		return $docstr;


	}


}