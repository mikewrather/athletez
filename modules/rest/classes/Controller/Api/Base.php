<?php defined('SYSPATH') or die('No direct script access.');

/**
 * User: mike
 * Date: 2/16/13
 * Time: 11:13 PM
 */

class Controller_Api_Base extends Controller
{

	protected $mainModel;

	protected $myID;
	protected $myID2;

	protected $resultArr;

	protected $payloadDesc;

	/**
	 * @var $starttime is used to calculate the total execution time for the controller script
	 */
	protected $starttime;

	protected $execError = false;

	public function __construct(Request $request, Response $response)
	{

		$this->starttime = microtime();
		parent::__construct($request,$response);

		$this->myID = (int)$this->request->param('id') > 0 ? (int)$this->request->param('id') : 0;
		$this->myID2 = (int)$this->request->param('id2') > 0 ? (int)$this->request->param('id2') : 0;
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
				throw HTTP_Exception::factory(404,'The requested URL :uri was not found on this server.',
					array(':uri' => $this->request->uri())
				)->request($this->request);
			}
			else
			{
				$action = $action_no_verb;
			}
		}

		// Execute the action itself
		$retObj = $this->{$action}();
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
			$this->response->body['exec_data'] = array(
				"exec_time" => microtime() - $this->starttime,
				"exec_error" => $this->execError
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
		$method = $this->request->action();

		$vc = Api_Viewclass::factory($ext,$obj);

		if(sizeof($this->request->query()) > 0) $vc->setQueryParams($this->request->query());
		return $vc->$method();
	}
}