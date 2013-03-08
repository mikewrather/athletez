<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Stattab API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Stattab extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Stats_Tab'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basics on the Statistics Tab
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basics on the Statistics Tab";
		
		}
		
		/**
		 * action_get_childtabs() Returns all child tabs within a given statistics tab
		 *
		 */
		public function action_get_childtabs()
		{
			$this->payloadDesc = "Returns all child tabs within a given statistics tab";
		
		}
		
		/**
		 * action_get_stats() Returns all stats within a given stattab
		 *
		 */
		public function action_get_stats()
		{
			$this->payloadDesc = "Returns all stats within a given stattab";
		
		}
		
		/**
		 * action_get_positions() Returns positions for which this is the default tab
		 *
		 */
		public function action_get_positions()
		{
			$this->payloadDesc = "Returns positions for which this is the default tab";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}