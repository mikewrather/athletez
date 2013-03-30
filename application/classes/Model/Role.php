<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Extends module class and sets table to roles
 *
 * Date: 3/29/13
 * Time: 7:24 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Role extends Model_Auth_Role
{
	protected $_table_name = 'roles';

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}
}