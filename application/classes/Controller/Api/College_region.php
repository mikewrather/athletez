<?php defined('SYSPATH') or die('No direct script access.');

/**
 * College_region API controller class
 *
 * Date: Auto-generated on May 30th, 2013 3:28 am
 *
 * @author: Mike Wrather
 *
 */

	class Controller_Api_College_region extends Controller_Api_Base
	{

		public function __construct($request,$response)
		{
			parent::__construct($request,$response);

			$this->setMainModel(ORM::factory('College_Region'));
			$this->popMainModel();
		}

		public function action_index()
		{

		}
	
		############################################################################
		###########################    GET METHODS    ##############################
		############################################################################

		
		############################################################################
		###########################    POST METHODS    #############################
		############################################################################

		
		############################################################################
		############################    PUT METHODS    #############################
		############################################################################

		
		############################################################################
		###########################    DELETE METHODS    ###########################
		############################################################################

		
	}