<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Model_Site_Entdir stands for entity derivative which means that this can refer to one of many types
 *
 * Date: 2/18/13
 * Time: 4:22 AM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Entdir extends ORM
{
	/**
	 * @var $subject
	 * This is a variable to hold the actual object that is referred to
	 */
	public $subject;

	protected $_table_name = "enttypes";

	public function __construct($id=NULL)
	{
		parent::__construct($id);
		//if id is set then populate the subject
		if((int)$this->id > 0) $this->getSubject();
	}

	/**
	 * getViewed is executed by the constructor method and populates the viewed property
	 */
	public function getSubject()
	{
		$this->subject = Ent::eFact($this->subject_enttypes_id,$this->subject_id);
		return $this->subject;
	}

}