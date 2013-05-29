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

	protected $_has_many = array(
		'translations' => array(
			'model' => 'Site_Phrases_Translation',
			'foreign_key' => 'phrases_id'
		),
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}