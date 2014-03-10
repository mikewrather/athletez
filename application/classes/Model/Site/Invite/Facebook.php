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

class Model_Site_Invite_Facebook extends Model_Site_Invite
{

	protected $_table_name = 'invites';



	public function __construct($id=NULL)
	{
		parent::__construct($id);
	}

	public $get_basics_class_standards = array(
		'alternate_fk_names' => array(

		),
		'added_function_calls' => array(
			'fb_user_data' => 'deserializeUserData',
			'invite_to_obj' => 'getInviteToObj'
		),
		'exclude_columns' => array(
			'invite_email'
		),
	);



	public function find_matching_user($auto_login=false){
		if(!$this->loaded()) return false;

		$idents = ORM::factory('User_Identity');
		//print_r($this);
		return $idents->find_by_identity($this->invite_fb,$auto_login);
	}



	public function invite($fb_id,$invite_to,$invite_type,$sechash=false)
	{
		$invite = ORM::factory('Site_Invite_Facebook');
		$invite->where('invite_fb','=',$fb_id);
		$invite->find();

		if($invite->loaded()){
			return $invite;
		}

		$facebook = FacebookAuth::factory();
		$user_data = $facebook->getInfoById($fb_id);

		$this->fb_user_data = serialize($user_data);
		$this->invite_to = empty($invite_to) ? null : serialize($invite_to);
		$this->invite_type = empty($invite_type) ? null : $invite_type;
		$this->invite_fb = $fb_id;
		$this->setBasics($sechash);
		$this->beenSent();
		return $this;
	}

}