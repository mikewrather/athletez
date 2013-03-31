<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/8/13
 * Time: 4:15 PM
 */

class Model_Scrape_Sport extends ORM
{
	//protected $_db_group = 'scraping';
	protected $_table_name = 'sports';
	protected $_primary_key = 'id';
	
/*
	protected $_belongs_to = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		)
	);
*/
	protected $_has_many = array(
		'schoolteams' => array(
			'model' => 'Scrape_Schoolteam',
			'foreign_key' => 'mp_ssid'
		)
	);
	/*
	protected $_has_one = array(
		'[alias name]' => array(
			'model' => '[model name]', 
			'foreign_key' => '[column]'
		)
	);
	*/

	public function getBasics()
	{
		return array(
			"id" => $this->id,
			'name' => $this->name
		);
	}

	//custom validation.
	public static function check_sport_type_exist($sport_type_id){
		$sport_type_model = ORM::factory("Sportorg_Sporttype");
		$sport_type_model->select("id")
			->where('id', '=', $sport_type_id)
			->find();
		if ($sport_type_model->loaded()){
			return true;
		}
		return false;
	}

}