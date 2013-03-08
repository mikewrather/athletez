<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Stat API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Stat extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Stats_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information for a given stat
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information for a given stat";
		
		}
		
		/**
		 * action_get_listall() Lists all statistics (apply filters)
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "Lists all statistics (apply filters)";
		
			if($this->request->query('get_top') > 0)
			{

			}

			if($this->request->query('sports_id') > 0)
			{

			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}