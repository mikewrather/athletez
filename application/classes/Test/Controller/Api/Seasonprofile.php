<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Seasonprofile API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Seasonprofile extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Season_Profile'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info about the season profile
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info about the season profile";
		
		}
		
		/**
		 * action_get_seasons() List of seasons in the season profile
		 *
		 */
		public function action_get_seasons()
		{
			$this->payloadDesc = "List of seasons in the season profile";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}