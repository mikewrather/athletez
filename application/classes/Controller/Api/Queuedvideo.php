<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Queuedvideo API controller class
 *
 * Date: Auto-generated on Mar 18th, 2013 2:21 am
 *
 * @author: Mike Wrather
 *
 */

class Controller_Api_Queuedvideo extends Controller_Api_Base
{

	public function __construct($request,$response)
	{
		parent::__construct($request,$response);

		$this->setMainModel(ORM::factory('Media_Queuedvideo'));
		$this->popMainModel();
	}


	/**
	 * this method will be called to process the current queue
	 *
	 */
	public function action_get_process()
	{
		$queue = ORM::factory('Media_Queuedvideo')
			->where('complete','=',0)
			->where('is_processing','=',0)
			->find_all();

		$retArr = array();
		foreach($queue as $waiting)
		{
			$retArr[] = $waiting->process();
		}

		return $retArr;

	}

}