<?php defined('SYSPATH') or die('No direct script access.');
/**
 * $description
 *
 * Date: 12/27/13
 * Time: 2:25 PM
 *
 * @author: Mike Wrather
 *
 */

class Model_Site_Invite_Email extends Model_Site_Invite
{

	protected $_table_name = 'invites';

	public $invite_to_obj;

	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}


	public function find_matching_user($auto_login = false){
		if(!$this->loaded()) return false;
		$user = ORM::factory('User_Base')->where('email','=',$this->invite_email)->find();
		if($user->loaded()) return $user;
		return false;
	}

	public function invite($fb_id,$invite_to,$invite_type,$sechash=false)
	{

		$this->setBasics($sechash);
		$this->beenSent();
		return $this;
	}

}