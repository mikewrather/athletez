<?php defined('SYSPATH') or die('No direct script access.');
/**
 * User: mike
 * Date: 2/5/13
 * Time: 10:51 PM
 */

class Model_Sportorg_Orggbslink extends ORM
{

	protected $_table_name = 'org_gbs_link';

	protected $_belongs_to = array(
		'org' => array(
			'model' => 'Sportorg_Org',
			'foreign_key' => 'orgs_id'
		),
		'gbslink' => array(
			'model' => 'Sportorg_Gbslink',
			'foreign_key' => 'gbs_link_id'
		),
	);

	protected $_has_many = array(
		'teams' => array(
			'model' => 'Sportorg_Team',
			'foreign_key' => 'org_gbs_link_id'
		)
	);

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

}