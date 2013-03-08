<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Section API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Section extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Section'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about a Section
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about a Section";
		
		}
		
		/**
		 * action_get_leagues() Returns all leagues within a given section
		 *
		 */
		public function action_get_leagues()
		{
			$this->payloadDesc = "Returns all leagues within a given section";
		
		}
		
		/**
		 * action_get_divisions() Returns all divisions within a given section
		 *
		 */
		public function action_get_divisions()
		{
			$this->payloadDesc = "Returns all divisions within a given section";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}