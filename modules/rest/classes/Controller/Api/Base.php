<?php defined('SYSPATH') or die('No direct script access.');

/**
 * User: mike
 * Date: 2/16/13
 * Time: 11:13 PM
 */

class Controller_Api_Base extends AuthController
{

	protected $mainModel;

	protected $myID;
	protected $myID2;

	protected $resultArr;

	protected $payloadDesc;


	// These arrays are populated with data from the body in the case of put or delete requests
	protected $put = array();
	protected $delete = array();
	protected $post = array();
	protected $get = array();

	protected $fatalErrorThrown = false;

	/**
	 * @var $starttime is used to calculate the total execution time for the controller script
	 */
	protected $starttime;

	protected $execErrors = NULL;

	public function __construct(Request $request, Response $response)
	{

		// start the counter
		$this->starttime = microtime();

		// execute parent controller constructor
		parent::__construct($request,$response);

		// set IDs passed in the url string (or set to 0 if not available)
		$this->myID = (int)$this->request->param('id') > 0 ? (int)$this->request->param('id') : 0;
		$this->myID2 = (int)$this->request->param('id2') > 0 ? (int)$this->request->param('id2') : 0;

		// calls a method to set the user and logged_in properties
		$this->populateAuthVars();

		// Moves the body data to the correct array
		$this->setBodyParams();

		// Check to see if data is stored as json with the "model" key
		// This will return true if that key exists with valid json
		if($this->check_for_json())
		{
			// Here we set the request query and post arrays
			// to hold the data we've stored in this controller's
			// respective arrays.
			// We don't do this for the put and delete because
			// there are already custom methods used for those
			$this->request->query($this->get);
			$this->request->post($this->post);
		}

		//Check to see if we want to save the request
		$this->checkForSave();

	}


	/**
	 * This method checks for a "model" value in the array that holds data for the http verb
	 * If it exists it checks to make sure it contains valid json.  If so, it decodes it
	 * and replaces the array with the data contained in that json
	 */
	protected function check_for_json()
	{
		//Get HTTP Verb
		$verb = strtolower($this->request->method());

		//Check For Model
		if(!$this->$verb('model')) return false;
		if($this->$verb('model') == "") return false;

		$json = json_decode($this->$verb('model'));
		if (json_last_error() == JSON_ERROR_NONE)
		{
			empty($this->$verb);
			$this->$verb = get_object_vars($json);
			return true;
		}
		else
		{
			return false;
		}
	}
	/**
	 * @param string $verb is NULL by default and will use the current request's method.  But it can also be set manually.
	 */
	protected function setBodyParams($verb=NULL)
	{

		if($verb === NULL) $verb = strtolower($this->request->method());

		$parseBody = false;
		switch ($verb){
			case 'get':
				$this->get = $this->request->query();
				break;
			case 'post':
				$this->post = $this->request->post();
				break;
			default:
				$bodyStr = (string)$this->request->body();
				$parseBody = true;
				break;
		}

		if($parseBody)
		{
			$arr = explode('&',$bodyStr);
			foreach($arr as $argPair)
			{
				$argArr = explode('=',$argPair);
				$this->$verb($argArr[0],$argArr[1]);
			}
		}

	}

	/**
	 * put() gets / sets a value of the put array
	 * @param $arg is the argument you are getting / setting
	 * @param null $val is the optional value you are setting the argument to.
	 * @return array|bool
	 */
	protected function put($arg,$val=NULL)
	{
		if($val !== NULL)
		{
			return $this->put[$arg] = $val;
		}
		else
		{
			if(isset($this->put[$arg])) return $this->put[$arg];
			else return false;
		}
	}

	/**
	 * delete gets / sets a value of the delete array
	 * @param $arg is the argument you are getting / setting
	 * @param null $val is the optional value you are setting the argument to.
	 * @return array|bool
	 */
	protected function delete($arg,$val=NULL)
	{
		if($val !== NULL)
		{
			return $this->delete[$arg] = $val;
		}
		else
		{
			if(isset($this->delete[$arg])) return $this->delete[$arg];
			else return false;
		}
	}

	/**
	 * post() gets / sets a value of the post array
	 * @param $arg is the argument you are getting / setting
	 * @param null $val is the optional value you are setting the argument to.
	 * @return array|bool
	 */
	protected function post($arg,$val=NULL)
	{
		if($val !== NULL)
		{
			return $this->post[$arg] = $val;
		}
		else
		{
			if(isset($this->post[$arg])) return $this->post[$arg];
			else return false;
		}
	}

	/**
	 * get() gets / sets a value of the get array
	 * @param $arg is the argument you are getting / setting
	 * @param null $val is the optional value you are setting the argument to.
	 * @return array|bool
	 */
	protected function get($arg,$val=NULL)
	{
		if($val !== NULL)
		{
			return $this->get[$arg] = $val;
		}
		else
		{
			if(isset($this->get[$arg])) return $this->get[$arg];
			else return false;
		}
	}
	
	public function execute()
	{
		//print_r(debug_backtrace());
		$this->response->body = array();

		// Execute the "before action" method
		$this->before();

		// Determine the action to use
		$action = 'action_' . strtolower($this->request->method()) . '_' . $this->request->action();

		// If the action doesn't exist, it's a 404
		if (!method_exists($this, $action))
		{
			$action_no_verb = 'action_' . $this->request->action();
			if (!method_exists($this, $action_no_verb))
			{
				$uriArr = array(':uri' => $this->request->uri());
				throw HTTP_Exception::factory(404,'The requested URL :uri was not found on this server.',$uriArr)->request($this->request);
			}
			else
			{
				$action = $action_no_verb;
			}
		}

		// Execute the action itself
		if(!$this->fatalErrorThrown) //if at any point this property is set to true it will skip this action
			$retObj = $this->{$action}();

		if(!$this->fatalErrorThrown) //if at any point this property is set to true it will skip this action
			$result = is_object($retObj) ? $this->getDataFromView($retObj) : $this->getDataFromView();

		$this->response->headers('Content-Type','application/json');

		// Initial Request set-up
		if($this->request->is_initial())
		{
			$this->response->body['payload'] = $result;
			$this->response->body['desc'] = $this->payloadDesc;
		}
		// All Internal Sub Requests Set up
		else
		{
			$this->response->body = $result;
		}

		// Execute the "after action" method
		$this->after();

		if($this->request->is_initial())
		{
			$this->response->body = json_encode($this->response->body);
			echo $this->response->body;
		}

		// Return the response
		return $this->response;

	}



	public function after()
	{
		parent::after();
		//right now I'm keeping this here so that I can see the execution time on all subrequests
		if($this->request->is_initial() or 1)
		{
			$req_error = sizeof($this->execErrors) > 0 ? true : false;
			$this->response->body['exec_data'] = array(
				"exec_time" => microtime() - $this->starttime,
				"exec_error" => $req_error,
				"error_array" => $this->execErrors
			);
		}
	}

	protected function setMainModel($model)
	{
		if(!is_object($model))
		{
			$this->execError = "The model provided is not a valid object.";
			return false;
		}
		$this->mainModel = $model;
	}

	/**
	 * popMainModel sets the ID of the main model and then checks to see if it loaded correctly
	 */
	protected function popMainModel()
	{
		if($this->myID)
		{
			$this->mainModel->where('id','=',$this->myID)->find();
			if(!$this->mainModel->loaded())	unset($this->mainModel);
		}
	}


	 /**
	 * function getDataFromView uses the controller and action called to generate the name of the class and method to call
	 * and then returns the data that that function returns
	 *
	 * @param null $obj
	 * @return array
	 */
	protected function getDataFromView($obj=NULL)
	{
		if($obj==NULL && !isset($this->mainModel)){ return false; }
		elseif($obj==NULL)
		{
			$obj = $this->mainModel;
		}
		$ext = $this->request->controller();

		$vc = Api_Viewclass::factory($ext,$obj);
		$method = strtolower($this->request->method())."_".$this->request->action();

		// Passes an parameters accessible to this request to the view class
		if(sizeof($this->request->query()) > 0) $vc->setQueryParams($this->request->query());
		if(sizeof($this->request->post()) > 0) $vc->setPostParams($this->request->post());
		if(sizeof($this->request->body()) > 0) $vc->setPutParams($this->request->body());

		return $vc->$method();
	}

	protected function addError($error_array,$is_fatal=FALSE)
	{

		//format error array to match what Ma is expecting for client side error parsing
		if(!isset($error_array['field']))
		{
			$error_array['field'] = $error_array['param_name'];
			$error_array['error'] = $error_array['param_desc'];
			unset($error_array['param_name']);
			unset($error_array['param_desc']);
		}

		$this->execErrors[] = $error_array;
		if($is_fatal)
		{
			$this->fatalErrorThrown = true;
		}
	}

	protected  function processObjectSave(&$model)
	{
		// Error Checking on save()
		try
		{
			$model->save();
		}
		catch(ErrorException $e)
		{
			// Create Array for Error Data
			$error_array = array(
				"error" => "Unable to save ".get_class($model),
				"desc" => $e->getMessage()
			);

			// Set whether it is a fatal error
			$is_fatal = true;

			// Call method to throw an error
			$this->addError($error_array,$is_fatal);
		}
	}

	protected function modelNotSetError($error_array = array())
	{
		// Create Array for Error Data
		if (empty($error_array)){
			$error_array = array(
				"error" => get_class($this->mainModel)." object has no ID",
				"desc" => "In order to perform this action, you must set the ID of this object in the request URI"
			);
		}

		// Set whether it is a fatal error
		$is_fatal = true;

		// Call method to throw an error
		$this->addError($error_array,$is_fatal);
	}

	protected function requireID()
	{
		if(!$this->mainModel->loaded()) $this->modelNotSetError();
	}

	public function collect_error_messages($error_arrays){
		$external_errors = array();
		if (isset($error_arrays['_external'])){
			$external_errors = $error_arrays['_external'];
			$error_arrays = array();
		}
		$error_arrays = array_merge($error_arrays, $external_errors);
		$error_desc = implode("\n", $error_arrays);
		return $error_desc;
	}

	protected function processValidationError($errObj,$path = NULL)
	{
		// Use Default Error Message Path if Not Set
		if($path === NULL) $path = $this->mainModel->error_message_path;

		// Extract Errors from Validation Error Object
		$errors = $errObj->errors($path);

		//Check if have the external validation
		if (isset($errors['_external']))
		{
			$external_errors = $errors['_external'];
			$errors = array_merge($errors, $external_errors);
			unset($errors['_external']);
		}

		foreach($errors as $field => $msg)
		{
			// Create Array for Error Data
			$error_array = array(
				"error" => $msg,
				"field" => $field,
			);

			// Set whether it is a fatal error
			$is_fatal = true;

			// Call method to throw an error
			$this->addError($error_array,$is_fatal);
		}
	}

	protected function checkForSave()
	{

		if(!$this->is_admin) return false;

		switch ($this->request->method())
		{
			case 'POST':
				$container = $this->request;
				$verb = 'post';
				break;
			case 'GET':
				$container = $this->request;
				$verb = 'query';
				break;
			case 'PUT':
				$container = $this;
				$verb = 'put';
				break;
			default:
				break;
		}

		if(!isset($verb)) return false;

		$saveReq = $container->{$verb}('saveRequest')=='on' ? 1 : 0;
		if(!$saveReq) return false;

		$saveTitle = $container->{$verb}('saveTitle');
		$apiaccess_id = $container->{$verb}('apiaccess_id');
		$saveBody = str_replace(array('saveRequest','saveTitle','apiaccess_id'),'xxx',$this->request->body());

		$test = ORM::factory('Codegen_Apitest');
		$test->testval = $saveBody;
		$test->name = $saveTitle;
		$test->apiaccess_id = $apiaccess_id;
		$test->save();

	}

	function is_logged_user(){
		if(!$this->user){
			return false;
		}
		return true;
	}

	function throw_authentication_error(){
		$error_array = array(
			"error" => "This action requires authentication",
			"desc" => "Please login first"
		);
		$this->modelNotSetError($error_array);
		return false;
	}

	/*****************************************************************
	 *                UNIVERSAL ACTION METHODS
	 ****************************************************************/

	public function action_post_addcomment()
	{
		$this->payloadDesc = "Add comments for a team";
		$arguments = array();
		// CHECK FOR PARAMETERS:

		//only create team's comments if have games_id
		if ($this->mainModel->id){
			$arguments["subject_enttypes_id"] = $ent_types_id = Ent::getMyEntTypeID($this->mainModel);
			$arguments["subject_id"] = $subject_id = $this->mainModel->id;
		}

		print_r($arguments);

		// The text of the comment
		if(trim($this->request->post('comment')) != "")
		{
			$arguments["comment"] = trim($this->request->post('comment'));
		}

		$arguments['users_id'] = $this->user->id;

		$comment_model = ORM::factory("Site_Comment");
		$result = $comment_model->addComment($arguments);

		if(get_class($result) == get_class($comment_model))
		{
			return $result;
		}
		elseif(get_class($result) == 'ORM_Validation_Exception')
		{
			//parse error and add to error array
			$this->processValidationError($result,$this->mainModel->error_message_path);
			return false;
		}
	}
}