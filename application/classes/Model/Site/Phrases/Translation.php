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

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}