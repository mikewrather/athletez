<?php defined('SYSPATH') or die('No direct script access.');



	class View_Api_Contact extends Api_Viewclass
	{

		public function get_basics()
		{
			$retArr = array();
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		public function post_add()
		{
			$retArr = array();
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
		public function delete_base()
		{
			// Scaffolding Code For Single:
			$retArr = $this->obj->id;

			return $retArr;
		}

		public function put_basics()
		{
			$retArr = array();

			// Scaffolding Code For Single:
			$retArr = $this->obj->getBasics();

			return $retArr;
		}
		
	}