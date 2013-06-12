<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Academictest API View class
 *
 * Date: Auto-generated on Jun 10th, 2013 4:49 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Academictest extends Api_Viewclass
	{

		/**
		 * get_topics() Get All topics for a given Academic Test
		 *
		 * @retun array
		 */
		public function get_topics()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}

			return $retArr;
		}
		
		/**
		 * get_listall() Get All Academic Tests
		 *
		 * @retun array
		 */
		public function get_listall()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}

			return $retArr;
		}

		public function get_tests()
		{
			$retArr = null;

			// Scaffolding Code For Array:
			$objs = $this->obj->find_all();
			foreach($objs as $obj)
			{
				$retArr[] = $obj->getBasics();
			}

			return $retArr;
		}
		
	}