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
	public $invite_to_obj;

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

	public function deserializeUserData(){
		return unserialize($this->fb_user_data);
	}

	public function invite($fb_id,$invite_to)
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
		$this->invite_fb = $fb_id;
		$this->setBasics();
		$this->beenSent();
		return $this;
	}

	public function getInviteToObj()
	{
		if($this->loaded()){
			$invite_to = unserialize($this->invite_to);
			if(is_array($invite_to)){
				$obj = Ent::eFact($invite_to['enttype_id'],$invite_to['subject_id']);
				if(is_object($obj) && is_subclass_of($obj,'ORM') && $obj->loaded()) return $obj->getBasics();
				else return false;
			}
		}
	}

	public function getInviteData($args){
		extract($args);
		if(isset($sechash)) $res = $this->where('sechash','=',$sechash);
		elseif(isset($fbid)) $res = $this->where('invite_fb','=',$fbid);
		else return false;

		$res->find();
		if($res->loaded()) return $res;
		else return false;
	}
}