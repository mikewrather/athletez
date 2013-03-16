<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Stattab API controller class
 *
 * Date: Auto-generated on Mar 15th, 2013 4:00 am
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
		 * via /api/stattab/basics/{stattabs_id}
		 *
		 */
		public function action_get_basics()
		{
			$this->payloadDesc = "Basics on the Statistics Tab";

		
		}
		
		/**
		 * action_get_childtabs() Returns all child tabs within a given statistics tab
		 * via /api/stattab/childtabs/{stattabs_id}
		 *
		 */
		public function action_get_childtabs()
		{
			$this->payloadDesc = "Returns all child tabs within a given statistics tab";

		
		}
		
		/**
		 * action_get_stats() Returns all stats within a given stattab
		 * via /api/stattab/stats/{stattabs_id}
		 *
		 */
		public function action_get_stats()
		{
			$this->payloadDesc = "Returns all stats within a given stattab";

		
		}
		
		/**
		 * action_get_positions() Returns positions for which this is the default tab
		 * via /api/stattab/positions/{stattabs_id}
		 *
		 */
		public function action_get_positions()
		{
			$this->payloadDesc = "Returns positions for which this is the default tab";

		
		}
		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		/**
		 * action_put_basics() Update basics on the Statistics Tab
		 * via /api/stattab/basics/{stattabs_id}
		 *
		 */
		public function action_put_basics()
		{
			$this->payloadDesc = "Update basics on the Statistics Tab";

		
		}
		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
		/**
		 * action_delete_base() Delete  Statistics Tab
		 * via /api/stattab/base/{stattabs_id}
		 *
		 */
		public function action_delete_base()
		{
			$this->payloadDesc = "Delete  Statistics Tab";

		
		}
		
	}