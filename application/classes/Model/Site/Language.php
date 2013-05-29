<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 5/29/13
 * Time: 3:14 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Language extends ORM
{
	
	protected $_table_name = 'languages';

	protected $_has_many = array(
		'phrases' => array(
			'model' => 'Site_Phrases_Translation',
			'foreign_key' => 'languages_id'
		),
	);
	

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public function name(){
		return "";
	}

}