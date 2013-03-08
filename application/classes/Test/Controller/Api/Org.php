<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Org API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Org extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Org'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic information about the organization
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic information about the organization";
		
		}
		
		/**
		 * action_get_teams() List of all teams within the organization
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "List of all teams within the organization";
		
			if($this->request->query('sports_id') > 0)
			{

			}

			if($this->request->query('complevels_id') > 0)
			{

			}

		}
		
		/**
		 * action_get_league() League that the organization belongs to
		 *
		 */
		public function action_get_league()
		{
			$this->payloadDesc = "League that the organization belongs to";
		
		}
		
		/**
		 * action_get_division() Division that the organization belongs to
		 *
		 */
		public function action_get_division()
		{
			$this->payloadDesc = "Division that the organization belongs to";
		
		}
		
		/**
		 * action_get_sports() All sports associated with a given organization
		 *
		 */
		public function action_get_sports()
		{
			$this->payloadDesc = "All sports associated with a given organization";
		
		}
		
		/**
		 * action_get_complevels() List of possible competition levels for this organization
		 *
		 */
		public function action_get_complevels()
		{
			$this->payloadDesc = "List of possible competition levels for this organization";
		
		}
		
		/**
		 * action_get_seasons() List of all seasons this organization plays
		 *
		 */
		public function action_get_seasons()
		{
			$this->payloadDesc = "List of all seasons this organization plays";
		
		}
		
		/**
		 * action_get_section() If applicable, returns the section that the organization exists in.
		 *
		 */
		public function action_get_section()
		{
			$this->payloadDesc = "If applicable, returns the section that the organization exists in.";
		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}