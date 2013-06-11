<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Testscore API View class
 *
 * Date: Auto-generated on Jun 10th, 2013 4:49 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Testscore extends Api_Viewclass
	{

		public function post_addtestscore(){

			$retArr = $this->obj->getBasics();
			return $retArr;
		}

		/**
		 * put_testscore() Update a given test score for a user.
		 *
		 * @retun array
		 */
		public function put_testscore()
		{
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

		/**
		 * delete_testscore() Delete a Test Score for a user.
		 *
		 * @retun array
		 */
		public function delete_testscore()
		{
			$retArr = $this->obj->getBasics();

			return $retArr;
		}

	
	}