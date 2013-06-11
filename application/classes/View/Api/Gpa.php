<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Gpa API View class
 *
 * Date: Auto-generated on Jun 10th, 2013 4:49 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Gpa extends Api_Viewclass
	{

		/**
		 * post_addgpa() Add a GPA for a given year
		 *
		 * @retun array
		 */
		public function post_addgpa()
		{
			$retArr = $this->obj->getBasics();
			return $retArr;
		}

		/**
		 * put_gpa() Update the Grade Point Average for a user for a given year.
		 *
		 * @retun array
		 */
		public function put_gpa()
		{
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		/**
		 * delete_gpa() Delete a GPA for a given user / year
		 *
		 * @retun array
		 */
		public function delete_gpa()
		{
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
	
	}