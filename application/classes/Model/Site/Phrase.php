<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/29/13
 * Time: 3:11 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Phrase extends ORM
{
	
	protected $_table_name = 'phrases';

	public $error_message_path = 'models/sportorg/complevel';

	protected $_has_many = array(
		'translations' => array(
			'model' => 'Site_Phrases_Translation',
			'foreign_key' => 'phrases_id'
		),
	);

	public function rules(){

		return array
		(
			'phrase'=>array(
				array('not_empty'),
			),
		);
	}

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function savePhrase($args = array()){
		extract($args);
		if(isset($phrase)){
			$this->save();
		}

		try{
			$this->save();
		}catch (Kohana_ORM_Validation_Exception $e){
			return $e;
		}
	}

}