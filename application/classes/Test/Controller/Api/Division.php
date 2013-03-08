<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Division API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Division extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Division'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a division
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a division";
		
		}
		
		/**
		 * action_get_orgs() Returns all organizations within with a certain division
		 *
		 */
		public function action_get_orgs()
		{
			$this->payloadDesc = "Returns all organizations within with a certain division";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}