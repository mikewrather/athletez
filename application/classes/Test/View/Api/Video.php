<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Video API View class
 *
 * Date: Mar 8th, 2013 2:57 am
 *
 * @author: Mike Wrather
 *
 */

	class View_Api_Video extends Api_Viewclass
	{

		public function __construct()
		{
			parent::__construct();
		}

	
		/**
		 * basics() Basic information about a video
		 *
		 * @retun array
		 */
		public function basics()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * meta() Retrives all metadata for a certain video.
		 *
		 * @retun array
		 */
		public function meta()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
		/**
		 * types() Return all formats this video is available in
		 *
		 * @retun array
		 */
		public function types()
		{
			$retArr = array(

			);

			return $retArr;
		}
		
	}