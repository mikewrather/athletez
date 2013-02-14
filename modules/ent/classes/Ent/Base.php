<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 12:24 AM
 */

class Ent_Base extends ORM
{
	
	protected $_table_name = 'enttypes';

	public function __construct()
	{
		parent::__construct();
	}

}