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
			echo $ctr_fn = $baseDir."Controller/Api/".ucwords($ent->api_name).".php";

			if(file_exists($ctr_fn)) echo " FILE EXISTS!!!\n\n";
			else
			{
				$handle = fopen($ctr_fn,"a+");
				fwrite($handle,$this->generateController($ent));
				fclose($handle);
			}

			echo "\n";

			echo $view_fn = $baseDir."View/Api/".ucwords($ent->api_name).".php";
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
 * '.ucfirst($ent->api_name).' API controller class
 *
 * Date: Auto-generated on '.date('M jS, Y g:i a').'
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_'.ucfirst($ent->api_name).' extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory(\''.$ent->class_name.'\'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	';

		$methods = $ent->apimethods->where('api_method','=','GET')->find_all();
		$filecontents.= '
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		';
		$filecontents .= $this->getHTTPVerbMethods($methods,'post');

		$methods = $ent->apimethods->where('api_method','=','POST')->find_all();
		$filecontents.= '
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		';
		$filecontents .= $this->getHTTPVerbMethods($methods,'post');

		$methods = $ent->apimethods->where('api_method','=','PUT')->find_all();
		$filecontents.= '
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		';
		$filecontents .= $this->getHTTPVerbMethods($methods,'put');

		$methods = $ent->apimethods->where('api_method','=','DELETE')->find_all();
		$filecontents.= '
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		';
		$filecontents .= $this->getHTTPVerbMethods($methods,'delete');

		//End the generated function
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
 * '.ucfirst($ent->api_name).' API View class
 *
 * Date: Auto-generated on '.date('M jS, Y g:i a').'
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_'.ucfirst($ent->api_name).' extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	';



		$methods = $ent->apimethods->find_all();
		foreach($methods as $method)
		{

			$filecontents.= '
		/**
		 * '.strtolower($method->api_method).'_'.$method->shortname.'() '.$method->description.'
		 *
		 * @retun array
		 */
		public function '.strtolower($method->api_method).'_'.$method->shortname.'()
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

	public function getHTTPVerbMethods($methods,$httpverb)
	{

		switch($httpverb){
			case 'get':
				$data_source = '$this->request->query';
				break;
			case 'post':
				$data_source = '$this->request->post';
				break;
			case 'put':
				$data_source = '$this->request->body';
				break;
			case 'delete':
				$data_source = '$this->request->body';
				break;
			default:
				return false;
			break;
		}

		$filecontents = "";
		foreach($methods as $method)
		{


			$filecontents.= '
		/**
		 * action_'.strtolower($method->api_method).'_'.$method->shortname.'() '.$method->description.'
		 * via /api/'.strtolower($method->entlist->api_name).'/'.strtolower($method->shortname).'/{'.strtolower($method->getID1()).'}';

			if($method->getID2() != NULL) { $filecontents .= '/'.$method->getID2(); }
			$filecontents .= '
		 *
		 */
		public function action_'.strtolower($method->api_method).'_'.$method->shortname.'()
		{
			$this->payloadDesc = "'.$method->description.'";

		';

			$params = $method->params->find_all();

			if($params->count() > 0) $filecontents .= '         // CHECK FOR PARAMETERS:';

			foreach($params as $param)
			{
				$required_string = $param->param_req ? '(REQUIRED)' : '';
				$filecontents.= '
			// '.$param->param_name.' '.$required_string.'
			// '.$param->description.'
				';
				if($param->param_type=='int')
				{
					$existence_check = " > 0";
					$filecontents.= '
			if((int)trim('.$data_source.'(\''.$param->param_name.'\'))'.$existence_check.')
			{
				$'.$param->param_name.' = (int)trim('.$data_source.'(\''.$param->param_name.'\'));
			}
';
				}
				elseif($param->param_type=='string')
				{
					$existence_check = ' != ""';
					$filecontents.= '
			if(trim('.$data_source.'(\''.$param->param_name.'\'))'.$existence_check.')
			{
				$'.$param->param_name.' = trim('.$data_source.'(\''.$param->param_name.'\'));
			}
';
				}
				elseif($param->param_type=='datetime')
				{
					$existence_check = ' != ""';
					$filecontents.= '
			if('.$data_source.'(\''.$param->param_name.'\')'.$existence_check.')
			{
				// Format as date
				$'.$param->param_name.' = date("Y-m-d H:i:s",strtotime('.$data_source.'(\''.$param->param_name.'\')));
			}
';
				}
				elseif($param->param_type=='bool')
				{
					$existence_check = ' != ""';
					$filecontents.= '
			if('.$data_source.'(\''.$param->param_name.'\')'.$existence_check.')
			{
				//convert '.$param->param_name.' to a boolean
				$'.$param->param_name.' = (bool)'.$data_source.'(\''.$param->param_name.'\');
			}
';
				}
				elseif($param->param_type=='array')
				{
					$filecontents.= '
			if(isset('.$data_source.'(\''.$param->param_name.'\')))
			{
				$'.$param->param_name.'_array = '.$data_source.'(\''.$param->param_name.'\');
				foreach($'.$param->param_name.'_array as $'.$param->param_name.'_key =>$'.$param->param_name.'_val)
				{
					// Access each item in the array through the $'.$param->param_name.'_val variable
				}
			}
';
				}
				else
				{
					$existence_check = ' != ""';
					$filecontents.= '
			if('.$data_source.'(\''.$param->param_name.'\')'.$existence_check.')
			{
				$'.$param->param_name.' = '.$data_source.'(\''.$param->param_name.'\');
			}
';
				}

				if($param->param_req){ $filecontents.= '
			else // THIS WAS A REQUIRED PARAMETER
			{
				// RETURN AN ERROR FOR THIS REQUEST
			}
			'; }



			}

			$filecontents.='
		}
		';

		}
		return $filecontents;
	}


	public function action_gendocs()
	{

		$index = array();
		$docconts = "";
		$el = ORM::factory('Codegen_Entlist')->find_all();
		foreach($el as $ent)
		{
			$index[] = array("id"=>$ent->id,"name"=>$ent->name,"api"=>$ent->api_name);
			$docconts .= $this->generatedocs($ent);
		}
		$renderer = Kostache::factory();
		echo $renderer->render(array("index"=>$index,"cont"=>$docconts),'/docs');

	}

	/**
	 * generateController generates an API controller
	 *
	 * @param $ent
	 * @return string
	 */
	private function generateDocs($ent)
	{

		$renderer = Kostache::factory();

		$templateArr = array(
			"ent_id" => $ent->id,
			"entity_type" => $ent->name,
			"primary_class" => $ent->class_name,
			"desc" => $ent->description
		);

		$methods = $ent->apimethods->find_all();

		foreach($methods as $method)
		{

			$paramArr = array();
			$params = $method->params->find_all();
			foreach($params as $param)
			{
				$paramArr[] = array(
					"name" => $param->param_name,
					"type" => $param->param_type,
					"desc" => $param->description
				);
			}

			$usage = '/api/'.$ent->api_name.'/'.$method->shortname.'/{'.$ent->id1.'}';
			$usage.= $ent->id2 != NULL ? '/{'.$ent->id2.'}' : '';

			$templateArr["method"][] = array(
				"api_method" => $method->api_method,
				"shortname" => $method->shortname,
				"description" => $method->description,
				"usage" => $usage,
				"hasparams" => sizeof($params),
				"params" => $paramArr
			);




		}

		$docstr = $renderer->render($templateArr,'/api');
		return $docstr;


	}


}