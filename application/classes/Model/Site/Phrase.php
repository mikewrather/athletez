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

	public $error_message_path = 'models/site';

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

	public function getAll($args = array()){
		extract($args);
		$phrases = ORM::factory('Site_Phrase')->where('deleted','=',0);
		return $phrases;
	}

	public function savePhrase($args = array()){
		extract($args);
		if(isset($phrase)){
			$this->phrase = $phrase;
		}

		try{
			$this->save();
			return $this;
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function updatePhrase($args = array()){
		extract($args);
		if(isset($id)){
			$this->id = $id;
		}

		if(isset($deleted)){
			$this->deleted = $deleted;
		}

		if(isset($phrase)){
			$this->phrase = $phrase;
		}

		try{
			$this->update();
			return $this;
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getBasics($settings)
	{
		return array(
			"phrase" => $this->phrase,
			"deleted" => $this->deleted,
		);
	}

	public function name(){
		return "";
	}

}