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

class Model_Site_Phrases_Translation extends ORM
{
	
	protected $_table_name = 'phrases_translation';

	public $error_message_path = 'models/site/phrases';

	protected $_belongs_to = array(
		'original_phrase' => array(
			'model' => 'Site_Phrase',
			'foreign_key' => 'phrases_id'
		),
		'language' => array(
			'model' => 'Site_Language',
			'foreign_key' => 'languages_id'
		)
	);

	public function rules(){

		return array
		(
			'phrases_id'=>array(
				array('not_empty'),
			),
			'translation'=>array(
				array('not_empty'),
			),
			'languages_id'=>array(
				array('not_empty'),
				array('languages_id_exist'),
			),
		);
	}

	public function addTransaction($args = array()){
		extract($args);
		if (isset($phrases_id)){
			$this->phrases_id = $phrases_id;
		}
		if (isset($translation)){
			$this->translation = $translation;
		}
		if (isset($languages_id)){
			$this->languages_id = $languages_id;
		}

		try{
			$this->save();
			return $this;
		}catch (ORM_Validation_Exception $e){
			return $e;
		}
	}

	public function getAll($args = array()){
		extract($args);
		if (isset($languages_id)){
			$this->where('languages_id', '=', $languages_id);
		}
		return $this;
	}

	public function getBasics(){
		return array(
			'id' => $this->id,
			'phrases_id' => $this->phrases_id,
			'translation' => $this->translation,
			'languages_id' => $this->languages_id
		);
	}

}