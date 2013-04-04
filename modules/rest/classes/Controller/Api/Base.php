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

		// Because we can only get GET / POST values through request->query and request->post, we are extending functionality to put and delete
		if($this->request->method() == 'PUT')
		{
			$this->setBodyParams('put');
		}
		elseif($this->request->method() == 'DELETE')
		{
			$this->setBodyParams('delete');
		}
	}

	/**
	 * @param string $verb is put by default, but can be set to delete for delete requests
	 */
	protected function setBodyParams($verb='put')
	{
		$putParams = (string)$this->request->body();
		$putArr = explode('&',$putParams);
		foreach($putArr as $argPair)
		{
			$argArr = explode('=',$argPair);
			$this->$verb($argArr[0],$argArr[1]);
		}
		print_r($this->$verb);
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

	protected function modelNotSetError()
	{
		// Create Array for Error Data
		$error_array = array(
			"error" => get_class($this->mainModel)." object has no ID",
			"desc" => "In order to perform this action, you must set the ID of this object in the request URI"
		);

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
}