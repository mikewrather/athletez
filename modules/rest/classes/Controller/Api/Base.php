<?php defined('SYSPATH') or die('No direct script access.');

/**
 * User: mike
 * Date: 2/16/13
 * Time: 11:13 PM
 */

class Controller_Api_Base extends Controller
{

	protected $mainModel;
	protected $resultArr;

	/**
	 * @var $starttime is used to calculate the total execution time for the controller script
	 */
	protected $starttime;

	protected $execError = false;

	public function __construct(Request $request, Response $response)
	{
		$this->starttime = microtime();
		parent::__construct($request,$response);
	}


	public function execute()
	{
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
		$result = $this->{$action}();

		$this->resultArr['payload'] = $result;


		// Execute the "after action" method
		$this->after();

		$this->response->headers('Content-Type','application/json');

		echo json_encode($this->resultArr);
		// Return the response
		return $this->response;
	}



	public function after()
	{
		parent::after();
		$this->resultArr['exec_data'] = array(
			"exec_time" => microtime() - $this->starttime,
			"exec_error" => $this->execError
		);
	}

	protected function getDataFromView($obj=NULL)
	{
		if($obj==NULL && !isset($this->mainModel)){ return false; }
		elseif($obj==NULL)
		{
			$obj = $this->mainModel;
		}
		$ext = $this->request->controller();
		$method = $this->request->action();

		$vc = Viewclass::factory($ext,$obj);
		return $vc->$method();
	}

	protected function setMainModel($model)
	{
		$this->mainModel = $model;
	}
}