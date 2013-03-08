<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Pog API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Pog extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Site_Pog'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Player of the Game basics
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Player of the Game basics";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}