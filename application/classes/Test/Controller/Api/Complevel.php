<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Complevel API controller class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_Complevel extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('Sportorg_Complevel_Base'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		/**
		 * action_get_basics() Basic info on competion level
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basic info on competion level";
		
		}
		
		/**
		 * action_get_teams() List of teams for a given complevel narrowed by additional criteria
		 *
		 */
		public function action_get_teams()
		{
			$this->payloadDesc = "List of teams for a given complevel narrowed by additional criteria";
		
			if($this->request->query('seasons_id') > 0)
			{

			}

			if($this->request->query('orgs_id') > 0)
			{

			}

			if($this->request->query('sports_id') > 0)
			{

			}

			if($this->request->query('divisions_id') > 0)
			{

			}

			if($this->request->query('leagues_id') > 0)
			{

			}

			if($this->request->query('sections_id') > 0)
			{

			}

			if($this->request->query('states_id') > 0)
			{

			}

		}
		
		/**
		 * action_get_listall() List of competition levels narrowed by criteria
		 *
		 */
		public function action_get_listall()
		{
			$this->payloadDesc = "List of competition levels narrowed by criteria";
		
			if($this->request->query('complevel_profiles_id') > 0)
			{

			}

		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
	}