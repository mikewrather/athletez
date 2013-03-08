<?php defined('SYSPATH') or die('No direct script access.');

/**
 * League API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_League extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_League'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basics on a League
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basics on a League";
		
		}
		
		/**
		 * action_get_orgs() All organizations within a League
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "All organizations within a League";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}